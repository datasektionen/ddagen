import { getLocale } from "@/locales";
import sendEmail from "@/utils/send-email";
import { randomBytes } from "crypto";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  startLogin: publicProcedure
    .input(z.object({
      email: z.string(),
      locale: z.enum(["en", "sv"]),
    }))
    .mutation(async ({ input, ctx }) => {
      const t = getLocale(input.locale);

      const account = await ctx.prisma.account.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!account) {
        return { error: "accountNotFound" as const };
      }

      const loginCode = randomBytes(24).toString("base64url");
      const magicLink = "https://ddagen.se/logga-in?code=" + loginCode;
      await ctx.prisma.loginCode.create({
        data: { id: loginCode, accountId: account.id },
      });

      try {
        sendEmail(
          input.email,
          t.login.emailSubject,
          t.login.emailBody(loginCode, magicLink),
        );
      } catch (e) {
        return { error: "emailNotSent" as const };
      }
      return { ok: true };
    }),
  finishLogin: publicProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const loginCode = await ctx.prisma.loginCode.findUnique({
      where: { id: input },
      include: { account: true },
    });
    if (!loginCode) {
      return { error: "invalidConfirmationCode" as const };
    }
    await ctx.prisma.loginCode.delete({ where: { id: input } });
    if (loginCode.createdAt < new Date(Date.now() - 1000 * 60 * 10)) {
      return { error: "invalidConfirmationCode" as const };
    }

    await ctx.prisma.session.deleteMany({
      where: { accountId: loginCode.accountId },
    });
    const session = await ctx.prisma.session.create({
      data: { accountId: loginCode.accountId },
    });

    ctx.res.setHeader("Set-Cookie", `session=${session.id}; Path=/; HttpOnly; SameSite=Lax; Secure`);

    return { ok: true };
  }),
});
