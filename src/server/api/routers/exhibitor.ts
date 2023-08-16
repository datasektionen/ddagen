import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { env } from "@/env.mjs";
import { validateOrganizationNumber } from "@/shared/validateOrganizationNumber";
import { getLocale } from "@/locales";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import sendEmail from "@/utils/send-email";
import { Exhibitor } from "@/shared/Classes";
import { timingSafeEqual, randomUUID } from "crypto";

const foodPreferencesType = z.enum(["Representative", "Banquet"]);
const foodPreferencesValue = z.enum([
  "Meat",
  "Vegan",
  "LactoseFree",
  "GlutenFree",
]);

export const exhibitorRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        companyName: z.string().trim(),
        organizationNumber: z.string().trim(),
        email: z.string().email().trim(),
        contactPerson: z.string().trim(),
        phoneNumber: z.string().trim(),
        locale: z.enum(["en", "sv"]),
      })
    )
    .mutation(
      async ({
        input: {
          companyName,
          organizationNumber,
          email,
          contactPerson,
          phoneNumber,
          locale,
        },
        ctx,
      }) => {
        const t = getLocale(locale);
        const v = validateOrganizationNumber(organizationNumber);
        if ("error" in v) {
          throw new TRPCError({
            message: "Invalid organization number",
            code: "BAD_REQUEST",
          });
        } else {
          organizationNumber = v.value;
        }

        await ctx.prisma.exhibitorInterestRegistration.create({
          data: {
            name: companyName,
            organizationNumber,
            contactPerson,
            phoneNumber,
            email,
          },
        });

        try {
          sendEmail(
            email,
            t.email.subject,
            t.email.body(
              companyName,
              organizationNumber,
              email,
              contactPerson,
              phoneNumber
            ),
            "sales@ddagen.se"
          );
        } catch (e) {
          return { ok: false, error: "send-email" as const };
        }
        return { ok: true };
      }
    ),
  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.user.exhibitorId },
      select: {
        id: true,
        name: true,
        organizationNumber: true,
        invoiceEmail: true,
        description: true,
      },
    });
  }),
  update: protectedProcedure
    .input(
      z.object({
        invoiceEmail: z.string().email().trim(),
        description: z.string().trim(),
        extraChairs: z.number(),
        extraTables: z.number(),
        extraDrinkCoupons: z.number(),
        extraRepresentativeSpots: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.user.exhibitorId },
        data: {
          invoiceEmail: input.invoiceEmail,
          description: input.description,
          extraChairs: input.extraChairs,
          extraTables: input.extraTables,
          extraDrinkCoupons: input.extraDrinkCoupons,
          extraRepresentativeSpots: input.extraRepresentativeSpots,
        },
      });
    }),
  getPackage: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.user.exhibitorId },
      select: {
        package: true,
      },
    });
  }),
  getExtras: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.user.exhibitorId },
      select: {
        extraTables: true,
        extraChairs: true,
        extraDrinkCoupons: true,
        extraRepresentativeSpots: true,
        totalBanquetTicketsWanted: true,
      },
    });
  }),
  setExtras: protectedProcedure
    .input(
      z.object({
        extraChairs: z.number(),
        extraTables: z.number(),
        extraDrinkCoupons: z.number(),
        extraRepresentativeSpots: z.number(),
        totalBanquetTicketsWanted: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.user.exhibitorId },
        data: {
          extraChairs: input.extraChairs,
          extraTables: input.extraTables,
          extraDrinkCoupons: input.extraDrinkCoupons,
          extraRepresentativeSpots: input.extraRepresentativeSpots,
          totalBanquetTicketsWanted: input.totalBanquetTicketsWanted,
        },
      });
    }),
  getDescription: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.user.exhibitorId },
      select: { description: true },
    });
  }),
  setDescription: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.user.exhibitorId },
        data: { description: input },
      });
    }),
  getLogo: protectedProcedure.query(async ({ ctx }) => {
    const exhibitor = await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.user.exhibitorId },
      select: { logoWhite: true, logoColor: true },
    });
    return {
      white: exhibitor.logoWhite?.toString("base64"),
      color: exhibitor.logoColor?.toString("base64"),
    };
  }),
  setLogo: protectedProcedure
    .input(
      z.object({
        b64data: z.string(),
        kind: z.enum(["white", "color"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const logo = Buffer.from(input.b64data, "base64");
      await ctx.prisma.exhibitor.update({
        where: { id: ctx.session.user.exhibitorId },
        data:
          input.kind === "white" ? { logoWhite: logo } : { logoColor: logo },
      });
    }),
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      where: { exhibitorId: ctx.session.user.exhibitorId },
    });
  }),
  setUsers: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().trim(),
        email: z.string().email().trim(),
        phone: z.string().trim(),
        role: z.string().trim(),
        locale: z.enum(["en", "sv"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t = getLocale(input.locale);
      try {
        if (input.id) {
          await ctx.prisma.user.updateMany({
            where: { id: input.id, exhibitorId: ctx.session.user.exhibitorId },
            data: {
              name: input.name,
              email: input.email,
              phone: input.phone,
              role: input.role,
            },
          });
          return { ok: true, update: true, id: undefined };
        } else {
          const id = randomUUID();
          await ctx.prisma.user.create({
            data: {
              id: id,
              exhibitorId: ctx.session.user.exhibitorId,
              name: input.name,
              email: input.email,
              phone: input.phone,
              role: input.role,
            },
          });
          return { ok: true, update: false, id: id };
        }
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          return {
            ok: false,
            error:
              t.exhibitorSettings.table.row1.section3.alerts
                .errorDuplicateEmail,
          };
        }
        return {
          ok: false,
          error: t.error.unknown,
        };
      }
    }),
  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        locale: z.enum(["en", "sv"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t = getLocale(input.locale);
      try {
        if (input.id == undefined) {
          return {
            ok: false,
            error:
              t.exhibitorSettings.table.row1.section3.alerts
                .errorDeleteUserWithoutID,
          };
        } else if (input.id === ctx.session.user.id) {
          return {
            ok: false,
            error:
              t.exhibitorSettings.table.row1.section3.alerts.errorDeleteSelf,
          };
        }
        await ctx.prisma.user.delete({
          where: { id: input.id },
        });
        return { ok: true };
      } catch (e) {
        return {
          ok: false,
          error: t.error.unknown,
        };
      }
    }),
  getPreferenceCount: protectedProcedure.query(async ({ ctx }) => {
    const counts: [{ banqcount: bigint; reprcount: bigint }] =
      await ctx.prisma.$queryRaw(
        Prisma.sql`
        SELECT
          sum(case when type = 'Banquet' then 1 else 0 end) AS BanqCount,
          sum(case when type = 'Representative' then 1 else 0 end) AS ReprCount
        FROM food_specifications
        WHERE "exhibitorId" = ${ctx.session.user.exhibitorId}
      `
      );

    return {
      banqcount: Number(counts[0].banqcount),
      reprcount: Number(counts[0].reprcount),
    };
  }),
  getFoodPreferences: protectedProcedure
    .input(foodPreferencesType)
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.foodPreferences.findMany({
        where: {
          exhibitorId: ctx.session.user.exhibitorId,
          type: input,
        },
      });
    }),
  setFoodPreferences: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().trim(),
        value: z.array(foodPreferencesValue),
        comment: z.string().trim(),
        type: foodPreferencesType,
        locale: z.enum(["en", "sv"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t = getLocale(input.locale);
      try {
        if (input.value.length == 0) {
          return {
            ok: false,
            error: t.exhibitorSettings.table.row3.alerts.errorEmptyValueArray,
          };
        }
        if (input.id) {
          await ctx.prisma.foodPreferences.updateMany({
            where: {
              id: input.id,
              exhibitorId: ctx.session.user.exhibitorId,
              type: input.type,
            },
            data: {
              value: input.value,
              comment: input.comment,
            },
          });
          return { ok: true, update: true, id: undefined };
        } else {
          const id = randomUUID();
          await ctx.prisma.foodPreferences.create({
            data: {
              id: id,
              exhibitorId: ctx.session.user.exhibitorId,
              name: input.name,
              value: input.value,
              comment: input.comment,
              type: input.type,
            },
          });
          return { ok: true, update: false, id: id };
        }
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: t.error.unknown,
        };
      }
    }),
  deleteFoodPreferences: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        locale: z.enum(["en", "sv"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t = getLocale(input.locale);
      try {
        if (input.id == undefined) {
          return {
            ok: false,
            error:
              t.exhibitorSettings.table.row3.alerts
                .errorDeletePreferenceWithoutID,
          };
        }
        await ctx.prisma.foodPreferences.deleteMany({
          where: { id: input.id, exhibitorId: ctx.session.user.exhibitorId },
        });
        return { ok: true };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: t.error.unknown,
        };
      }
    }),
  getJobOffers: protectedProcedure.query(async ({ ctx }) => {
    const exhibitor = await ctx.prisma.exhibitor.findUnique({
      where: {
        id: ctx.session.user.exhibitorId,
      },
    });

    return await ctx.prisma.jobOffers.findUnique({
      where: {
        id: exhibitor?.jobOfferId,
      },
    });
  }),
  setJobOffers: protectedProcedure
    .input(
      z.object({
        summerJob: z.number().array(),
        internship: z.number().array(),
        partTimeJob: z.number().array(),
        masterThesis: z.boolean(),
        fullTimeJob: z.boolean(),
        traineeProgram: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exhibitor = await ctx.prisma.exhibitor.findUnique({
        where: {
          id: ctx.session.user.exhibitorId,
        },
      });

      await ctx.prisma.jobOffers.update({
        where: {
          id: exhibitor?.jobOfferId,
        },
        data: {
          summerJob: input.summerJob,
          internship: input.internship,
          partTimeJob: input.partTimeJob,
          masterThesis: input.masterThesis,
          fullTimeJob: input.fullTimeJob,
          traineeProgram: input.traineeProgram,
        },
      });
    }),
  getExhibitors: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const password = Buffer.from(env.SALES_PASSWORD);
      if (
        input.length == password.length &&
        timingSafeEqual(Buffer.from(input), password)
      ) {
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
              exhibitor.package,
              exhibitor.extraTables,
              exhibitor.extraChairs,
              exhibitor.extraDrinkCoupons,
              exhibitor.extraRepresentativeSpots,
              exhibitor.totalBanquetTicketsWanted,
              exhibitor.jobOfferId
            )
        );
      }
      return [];
    }),
});
