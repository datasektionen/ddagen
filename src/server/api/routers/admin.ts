import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Exhibitor, Preferences } from "@/shared/Classes";
import * as pls from "@/utils/pls";
import sendEmail from "@/utils/send-email";

export const adminRouter = createTRPCRouter({
    getExhibitors: publicProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            if (!(await pls.checkApiKey("read-exhibitors", input)))
                return "invalid-password";

            const exhibitors = await ctx.prisma.exhibitor.findMany();
            return exhibitors.map(
                (exhibitor) =>
                    new Exhibitor(
                        exhibitor.id,
                        exhibitor.name,
                        exhibitor.organizationNumber,
                        exhibitor.invoiceEmail,
                        exhibitor.logoWhite?.toString("base64"),
                        exhibitor.logoColor?.toString("base64"),
                        exhibitor.description,
                        exhibitor.packageTier,
                        exhibitor.studentMeetings,
                        exhibitor.extraTables,
                        exhibitor.extraChairs,
                        exhibitor.extraDrinkCoupons,
                        exhibitor.extraRepresentativeSpots,
                        exhibitor.totalBanquetTicketsWanted,
                        exhibitor.jobOfferId,
                        exhibitor.customTables,
                        exhibitor.customChairs,
                        exhibitor.customDrinkCoupons,
                        exhibitor.customRepresentativeSpots,
                        exhibitor.customBanquetTicketsWanted,
                        exhibitor.meetingTimeSlots
                    )
            );
        }),
    getAllFoodPreferences: publicProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            if (!(await pls.checkApiKey("read-exhibitors", input)))
                return "invalid-password";

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
    login: publicProcedure
        .input(
            z.object({
                password: z.string(),
                exhibitorId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (!(await pls.checkApiKey("write-exhibitors", input.password)))
                return "invalid-password";

            const session = await ctx.prisma.session.create({
                data: { exhibitorId: input.exhibitorId },
            });

            ctx.res.setHeader(
                "Set-Cookie",
                `session=${session.id}; Path=/; HttpOnly; SameSite=Lax; Secure`
            );
        }),
    logout: publicProcedure.mutation(async ({ ctx }) => {
        if (ctx.session) {
            await ctx.prisma.session.delete({ where: { id: ctx.session.id } });
            ctx.res.setHeader(
                "Set-Cookie",
                `session=; Path=/; HttpOnly; SameSite=Lax; Secure`
            );
        }
        return { status: ctx.session ? true : false };
    }),
    addExhibitor: publicProcedure
    .input(
      z.object({
        password: z.string(),
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
        if (!(await pls.checkApiKey("read-exhibitors", input.password)))
            return {ok: false, error: "invalid-password" as const };
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
        if (sendEmailToExhibitor) {
          sendEmail(
            email,
            "D-Dagen Account Created",
            `
            <p>Hi!</p>
            <p>We are pleased to confirm your exhibitor account has been created.</p>
            <p>Visit ${"ddagen.se/utställare"} and use ${email} to log into your account.</p>
            <p>Best regards,</p>
            <p>The D-Dagen Team</p>
            `
          );
        }
    } catch (e) {
        return { ok: false, error: "send-email" as const };
    }
    return { ok: true };
    }),
});
