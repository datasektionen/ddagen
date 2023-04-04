import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { validateOrganizationNumber } from "@/shared/validateOrganizationNumber";
import { getLocale } from "@/locales";

export const exhibitorRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({
      companyName: z.string(),
      organizationNumber: validateOrganizationNumber(getLocale("en")),
      email: z.string().email(),
      contactPerson: z.string(),
      phoneNumber: z.string(),
      locale: z.enum(["en", "sv"]),
    }))
    .mutation(async ({ input: { companyName, organizationNumber, email, contactPerson, phoneNumber, locale }, ctx }) => {
      const t = getLocale(locale).email;

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
      })

      const res = await fetch(`${process.env.SPAM_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: process.env.SPAM_API_KEY,
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
        // NOTE: don't change this message, it is matched on in CompanyForm
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Could not send verification email" });
      }
    })
});
