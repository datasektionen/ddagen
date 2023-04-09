import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { validateOrganizationNumber } from "@/shared/validateOrganizationNumber";
import { getLocale } from "@/locales";
import { env } from "@/env.mjs";
import { TRPCError } from "@trpc/server";
import { Prisma } from "@prisma/client";

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
        await ctx.prisma.exhibitor.create({
          data: {
            name: companyName,
            organizationNumber,
            contactPerson,
            phoneNumber,
            accounts: {
              create: {
                email,
              },
            },
          }
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
          return { ok: false, error: "duplicate-email" as const };
        }
        throw e;
      }

      const res = await fetch(env.SPAM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: env.SPAM_API_KEY,
          from: "no-reply@datasektionen.se",
          to: email,
          replyTo: "sales@ddagen.se",
          subject: t.subject,
          html: t.body(
            companyName,
            organizationNumber,
            email,
            contactPerson,
            phoneNumber,
          ),
        }),
      });
      if (!res.ok) {
        console.error("Error sending mail with spam", res.status, res.statusText);
        return { ok: false, error: "send-email" as const };
      }
      return { ok: true };
    }),
});
