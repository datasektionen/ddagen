import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { validateOrganizationNumber } from "@/shared/validateOrganizationNumber";
import { getLocale } from "@/locales";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import sendEmail from "@/utils/send-email";

const allergyType = z.enum(["representative", "banquet"]);

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
        const t = getLocale(locale).email;
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
            t.subject,
            t.body(
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
        package: true,
        extraTables: true,
        extraChairs: true,
        extraDrinkCoupons: true,
        extraRepresentativeSpots: true,
        totalBanquetTicketsWanted: true,
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
      })
    )
    .mutation(async ({ ctx, input }) => {
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
        } else {
          await ctx.prisma.user.create({
            data: {
              exhibitorId: ctx.session.user.exhibitorId,
              name: input.name,
              email: input.email,
              phone: input.phone,
              role: input.role,
            },
          });
        }
      } catch (e) {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === "P2002"
        ) {
          return { ok: false, error: "duplicateEmail" as const };
        }
        throw e;
      }
    }),
  deleteUser: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      if (input === ctx.session.user.id) {
        return { ok: false, error: "cannotDeleteSelf" as const };
      }
      await ctx.prisma.user.delete({
        where: { id: input },
      });
      return { ok: true };
    }),
  getFoodSpecifications: protectedProcedure
    .input(allergyType)
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.foodSpecification.findMany({
        where: {
          exhibitorId: ctx.session.user.exhibitorId,
          type: input,
        },
      });
    }),
  upsertFoodSpecification: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        type: allergyType,
        value: z.string().trim(),
        comment: z.string().trim(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.id) {
        await ctx.prisma.foodSpecification.updateMany({
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
      } else {
        await ctx.prisma.foodSpecification.create({
          data: {
            exhibitorId: ctx.session.user.exhibitorId,
            type: input.type,
            value: input.value,
            comment: input.comment,
          },
        });
      }
    }),
  deleteFoodSpecification: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.foodSpecification.deleteMany({
        where: { id: input, exhibitorId: ctx.session.user.exhibitorId },
      });
    }),
  getJobOffers: protectedProcedure.query(async ({ input, ctx }) => {
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
});
