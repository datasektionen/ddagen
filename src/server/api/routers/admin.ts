import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Exhibitor, ExhibitorInfo, JobOffer, Preferences } from "@/shared/Classes";
import * as pls from "@/utils/pls";
import * as hive from "@/utils/hive";
import sendEmail from "@/utils/send-email";
import { getLocale } from "@/locales";

import * as client from "openid-client";
import { authorizeClaims, createSessionToken, getSession, openIdConfig, initiateAuthorization } from "@/utils/openid";

export const adminRouter = createTRPCRouter({
    getExhibitors: publicProcedure
        .mutation(async ({ ctx }) => {
            if (!(await hive.isAdmin(ctx.cookies))) {
                return "UNAUTHORIZED";
            }

            const exhibitors = await ctx.prisma.exhibitor.findMany();
            return exhibitors.map(
                (exhibitor) =>
                    new Exhibitor(
                        exhibitor.id,
                        exhibitor.name,
                        exhibitor.organizationNumber,
                        exhibitor.invoiceEmail == null ? "" : exhibitor.invoiceEmail,
                        exhibitor.logoWhite?.toString("base64"),
                        exhibitor.logoColor?.toString("base64"),
                        exhibitor.description,
                        exhibitor.packageTier,
                        exhibitor.studentMeetings,
                        exhibitor.extraTables,
                        exhibitor.extraChairs,
                        exhibitor.extraDrinkCoupons,
                        exhibitor.extraRepresentativeSpots,
                        exhibitor.extraMealCoupons,
                        exhibitor.socialMediaPost,
                        exhibitor.panelDiscussion,
                        exhibitor.goodiebagLogo,
                        exhibitor.totalBanquetTicketsWanted,
                        exhibitor.jobOfferId,
                        exhibitor.customTables,
                        exhibitor.customChairs,
                        exhibitor.customDrinkCoupons,
                        exhibitor.customRepresentativeSpots,
                        exhibitor.customBanquetTicketsWanted,
                        exhibitor.meetingTimeSlots,
                        exhibitor.companyAddress ?? "",
                        exhibitor.billingMethod ?? "",
                        exhibitor.companyHostName ?? "",
                        exhibitor.companyHostNumber ?? "",
                        exhibitor.companyHostEmail ?? "",
                        exhibitor.allowMarketing,
                        exhibitor.industry ?? "",
                        exhibitor.industryType ?? "",
                        exhibitor.alcFreeDrinkCoupons,
                        exhibitor.mapPosition
                    )
            );
        }),
    deleteExhibitor: publicProcedure
        .input(
            z.object({
                exhibitorId: z.string(),
            }))
            .mutation(async ({ input, ctx }) => {
                if (!(await hive.isAdmin(ctx.cookies))) {
                    return "UNAUTHORIZED";
                }

                await ctx.prisma.exhibitor.delete({
                where: { id: input.exhibitorId },
            });
        }),
    getExhibitorInterestRegistration: publicProcedure
        .mutation(async ({ ctx }) => {
            if (!(await hive.isAdmin(ctx.cookies))) {
                return "UNAUTHORIZED";
            }

        const exhibitors = await ctx.prisma.exhibitorInterestRegistration.findMany();
        return exhibitors.map(
            (exhibitor) =>
                new ExhibitorInfo(
                    exhibitor.name,
                    exhibitor.organizationNumber,
                    exhibitor.contactPerson,
                    exhibitor.phoneNumber,
                    exhibitor.email,
                    0,
                    0,
                    false,
                    0,
                    []
                )
        );
    }),
    getAllFoodPreferences: publicProcedure
        .mutation(async ({ ctx }) => {
            if (!(await hive.isAdmin(ctx.cookies))) {
                return "UNAUTHORIZED";
            }

            const foodPreferences = await ctx.prisma.foodPreferences.findMany();
            return foodPreferences.map(
                (preference) =>
                    new Preferences(
                        preference.id,
                        preference.name,
                        preference.value,
                        preference.comment,
                        preference.type,
                        preference.exhibitorId
                    )
            );
        }),
    getAllJobOffers: publicProcedure
        .mutation(async ({ ctx }) => {
            if (!(await hive.isAdmin(ctx.cookies))) {
                return "UNAUTHORIZED";
            }

            const jobOffers = await ctx.prisma.jobOffers.findMany();

            return jobOffers.map(
            (jobOffer) =>
                new JobOffer(
                jobOffer.id,
                jobOffer.summerJob,
                jobOffer.internship,
                jobOffer.partTimeJob,
                jobOffer.masterThesis,
                jobOffer.fullTimeJob,
                jobOffer.traineeProgram
                )
            );
        }),
    login: publicProcedure
        .input(z.object({
                exhibitorId: z.string(),
            }))
        .mutation(async ({ input, ctx }) => {
            if (!(await hive.isAdmin(ctx.cookies))) {
                return "UNAUTHORIZED";
            }

            const session = await ctx.prisma.session.create({
                data: { exhibitorId: input.exhibitorId },
            });

            ctx.res.setHeader(
                "Set-Cookie",
                `session=${session.id}; Path=/; HttpOnly; SameSite=Lax; Secure`
            );
        }),
    startLogin: publicProcedure
        .input(z.object({ subpath: z.string().startsWith("/") }))
        .mutation(async ({ input, ctx }) => {
          const { code_verifier, code_challenge, state, oidc_auth_url } = await initiateAuthorization(input.subpath);

          const max_age = 10 * 60; // max request age 10 minutes
          ctx.res.setHeader("Set-Cookie", [
            `oidc_code_verifier=${code_verifier}; Max-Age=${max_age}; Path=/; HttpOnly; SameSite=Lax`,
            `oidc_state=${state}; Max-Age=${max_age}; Path=/; HttpOnly; SameSite=Lax`
          ]);

          return { url: oidc_auth_url.href };
    }),
    finishLogin: publicProcedure
        .input(z.object({ current_url: z.string().url(), exhibitorId: z.string().optional() }))
        .mutation(async ({ input, ctx }) => {
        const { oidc_code_verifier, oidc_state } = ctx?.cookies;

        if (!oidc_state || !oidc_code_verifier) {
            console.error("Missing OIDC cookies in header");
            return { error: "invalidConfirmationCode" as const };
        }

        // OIDC Authorization of the cookies, previous redirect_uri must match current_url, only works once
        const claims = await authorizeClaims(
            oidc_code_verifier,
            oidc_state,
            input.current_url
        );

        if (!claims || "error" in claims) {
            return { error: "invalidConfirmationCode" as const };
        }

        if (!claims.email) {
            return { error: "userNoEmail" as const };
        }

        // Get the authorized users permissions in hive
        const permissions = await hive.fetchHive(claims.sub);

        // Require them to have admin permissions from hive
        if (!permissions.includes("admin") && !permissions.includes("ddagen")) {
            return { error: "userNotAdmin" as const };
        }

        // Sign an internal JWT to keep the permissions and user_id (sub) verified
        const token = await createSessionToken({
            sub: claims.sub,
            email: claims.email,
            name: claims.name,
            permissions
        });

        // Set cookie, forget the used up OIDC cookies, keep the internal JWT. Check it with isAdmin(token)
        ctx.res.setHeader("Set-Cookie", [
            `oidc_state=; Path=/; Max-Age=0; HttpOnly`,
            `oidc_code_verifier=; Path=/; Max-Age=0; HttpOnly`,
            `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=300; Secure`
        ]);

        return { ok: true };
    }),
    isLoggedIn: publicProcedure.query(async ({ ctx }) => {
        // As long as the internal JWT is still being parsed as valid
        const session = await getSession(ctx.cookies);
        return session !== null;
    }),
    logout: publicProcedure.mutation(async ({ ctx }) => {
        // Forget the interal JWT
        ctx.res.setHeader(
            "Set-Cookie",
            `session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`
        );

        return { status: true };
    }),
    addExhibitor: publicProcedure
    .input(
      z.object({
        companyName: z.string(),
        organizationNumber: z.string(),
        contactPerson: z.string(),
        telephoneNumber: z.string(),
        email: z.string(),
        packageTier: z.number(),
        studentMeetings: z.number(),
        sendEmailToExhibitor: z.boolean(),
        mapPosition: z.number(),
        meetingTimeSlots: z.array(z.number()),
      })
    )
    .mutation(async ({ ctx, input }) => {
        if (!(await hive.isAdmin(ctx.cookies))) {
            return "UNAUTHORIZED";
        }

      const {
        contactPerson,
        telephoneNumber,
        companyName,
        organizationNumber,
        email,
        packageTier,
        studentMeetings,
        sendEmailToExhibitor,
        mapPosition,
        meetingTimeSlots,
      } = input;
      const exhibitor = await ctx.prisma.exhibitor.upsert({
        where: {
          organizationNumber: organizationNumber,
        },
        create: {
          name: companyName,
          organizationNumber: organizationNumber,
          invoiceEmail: email,
          logoWhite: null,
          logoColor: null,
          description: "",
          packageTier: packageTier,
          studentMeetings: studentMeetings,
          extraTables: 0,
          extraChairs: 0,
          extraDrinkCoupons: 0,
          extraRepresentativeSpots: 0,
          extraMealCoupons: 0,
          totalBanquetTicketsWanted: 0,
          customTables: 0,
          customChairs: 0,
          customDrinkCoupons: 0,
          customRepresentativeSpots: 0,
          customBanquetTicketsWanted: 0,
          mapPosition: mapPosition,
          meetingTimeSlots: meetingTimeSlots ?? [],
          foodPreferencess: undefined,
          jobOffers: {
            create: {
              summerJob: undefined,
              internship: undefined,
              partTimeJob: undefined,
              masterThesis: false,
              fullTimeJob: false,
              traineeProgram: false,
            },
          },
        },
        update: {
          name: companyName,
          organizationNumber: organizationNumber,
          invoiceEmail: email,
          packageTier: packageTier,
          studentMeetings: studentMeetings,
          mapPosition: mapPosition,
          meetingTimeSlots: meetingTimeSlots ?? [],
        },
      });

      await ctx.prisma.user.upsert({
        where: { email: email },
        create: {
          email: email,
          name: contactPerson,
          phone: telephoneNumber.replace(/[^\d+]/g, ""),
          role: "",
          exhibitor: { connect: { id: exhibitor.id } },
        },
        update: {
          email: email,
          name: contactPerson,
          phone: telephoneNumber.replace(/[^\d+]/g, ""),
        },
      });

      try {
        const t = getLocale("en");

        if (sendEmailToExhibitor) {
          sendEmail(
            email,
            t.newExhibitorEmail.emailSubject,
            t.newExhibitorEmail.emailBody(
              email
            )
          );
        }
    } catch (e) {
        return { ok: false, error: "send-email" as const };
    }
    return { ok: true };
    }),
});
