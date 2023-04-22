import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { validateOrganizationNumber } from "@/shared/validateOrganizationNumber";
import { getLocale } from "@/locales";
import { env } from "@/env.mjs";
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
});
