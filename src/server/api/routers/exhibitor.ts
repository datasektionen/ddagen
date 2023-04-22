import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { validateOrganizationNumber } from "@/shared/validateOrganizationNumber";
import { getLocale } from "@/locales";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";
import sendEmail from "@/utils/send-email";

export const exhibitorRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({
      companyName: z.string(),
      organizationNumber: z.string(),
      email: z.string().email(),
      contactPerson: z.string(),
      phoneNumber: z.string(),
      locale: z.enum(["en", "sv"]),
    }))
    .mutation(async ({
      input: {
        companyName,
        organizationNumber,
        email,
        contactPerson,
        phoneNumber,
        locale
      },
      ctx,
    }) => {
      const t = getLocale(locale).email;
      const v = validateOrganizationNumber(organizationNumber);
      if ("error" in v) {
        throw new TRPCError({ message: "Invalid organization number", code: "BAD_REQUEST" });
      } else {
        organizationNumber = v.value;
      }

      try {
        await ctx.prisma.exhibitorInterestRegistration.create({
          data: {
            name: companyName,
            organizationNumber,
            contactPerson,
            phoneNumber,
            email,
          }
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
          return { ok: false, error: "duplicate-email" as const };
        }
        throw e;
      }

      try {
        sendEmail(
          email,
          t.subject,
          t.body(
            companyName,
            organizationNumber,
            email,
            contactPerson,
            phoneNumber,
          ),
          "sales@ddagen.se",
        )
      } catch (e) {
        return { ok: false, error: "send-email" as const };
      }
      return { ok: true };
    }),
  get: protectedProcedure.query(async ({ ctx }) => {
    const exhibitor = await ctx.prisma.exhibitor.findUniqueOrThrow({
      where: { id: ctx.session.account.exhibitorId },
    });
    return {
      ...exhibitor,
      logo: exhibitor.logo?.toString("base64"),
    };
  }),
  update: protectedProcedure.input(z.object({
    invoiceEmail: z.string().email(),
    description: z.string(),
    extraChairs: z.number(),
    extraTables: z.number(),
    extraDrinkCoupons: z.number(),
    extraRepresentativeSpots: z.number(),
  })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.exhibitor.update({
      where: { id: ctx.session.account.exhibitorId },
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
  setLogo: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const logo = Buffer.from(input, "base64");
    return await ctx.prisma.exhibitor.update({
      where: { id: ctx.session.account.exhibitorId },
      data: {
        logo: logo,
      },
    });
  }),
  upsertContact: protectedProcedure.input(z.object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    role: z.string(),
  })).mutation(async ({ ctx, input }) => {
    if (input.id) {
      await ctx.prisma.contactPerson.updateMany({
        where: { id: input.id, exhibitorId: ctx.session.account.exhibitorId },
        data: {
          name: input.name,
          email: input.email,
          phoneNumber: input.phoneNumber,
          role: input.role,
        },
      });
    } else {
      await ctx.prisma.contactPerson.create({
        data: {
          exhibitorId: ctx.session.account.exhibitorId,
          name: input.name,
          email: input.email,
          phoneNumber: input.phoneNumber,
          role: input.role,
        },
      });
    }
  }),
  getContacts: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.contactPerson.findMany({
      where: { exhibitorId: ctx.session.account.exhibitorId },
    });
  }),
  deleteContact: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    await ctx.prisma.contactPerson.delete({
      where: { id: input },
    });
  }),
  getAllergies: protectedProcedure.input(z.enum(["representative", "banquet"])).query(async ({ input, ctx }) => {
    return await ctx.prisma.allergenInformation.findMany({
      where: {
        exhibitorId: ctx.session.account.exhibitorId, type: ({
          "representative": "REPRESENTATIVE_SPOT",
          "banquet": "BANQUET",
        } as const)[input]
      },
    });
  }),
  deleteAllergy: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    await ctx.prisma.allergenInformation.deleteMany({
      where: { id: input, exhibitorId: ctx.session.account.exhibitorId },
    });
  }),
  createAllergy: protectedProcedure.input(z.object({
    type: z.enum(["representative", "banquet"]),
    value: z.string(),
    comment: z.string(),
  })).mutation(async ({ ctx, input }) => {
    await ctx.prisma.allergenInformation.create({
      data: {
        exhibitorId: ctx.session.account.exhibitorId,
        type: ({
          "representative": "REPRESENTATIVE_SPOT",
          "banquet": "BANQUET",
        } as const)[input.type],
        value: input.value,
        comment: input.comment,
      },
    });
  })
});
