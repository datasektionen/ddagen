import { z } from "zod";
import { getLocale } from "@/locales";
import sendEmail from "@/utils/send-email";
import type { LoginCode, PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

async function createCode(
  prisma: PrismaClient,
  userId: string,
  email: string,
  locale: "en" | "sv"
) {
  const t = getLocale(locale);

  const loginCode = randomBytes(24).toString("base64url");
  // TODO: make url configurable
  const magicLink = "https://ddagen.se/logga-in?code=" + loginCode;
  const validUntil = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes
  await prisma.$transaction([
    prisma.loginCode.deleteMany({
      where: { userId: userId },
    }),
    prisma.loginCode.create({
      data: { id: loginCode, userId, validUntil },
    }),
  ]);

  
  try {
    /*
    sendEmail(
      email,
      "D-Dagen Account Login",
      `
      <p>Hi!</p>
      <p>To login in to your account. Please visit:</p>
      <p><a href="${magicLink}" style="color:#ffffff;text-decoration:underline">${magicLink}</a></p>
      <p>Or type in the code ${loginCode} to log into your account.</p>
      <p>Best regards,</p>
      <p>The D-Dagen Team</p>
      `
    );
    */
    sendEmail(
      email,
      t.login.emailSubject,
      t.login.emailBody(loginCode, magicLink)
    );
  } catch (e) {}
}

export const accountRouter = createTRPCRouter({
  startLogin: publicProcedure
    .input(
      z.object({
        email: z.string(),
        locale: z.enum(["en", "sv"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findMany({
        where: { email: { equals: input.email, mode: "insensitive" } },
      });
      console.log(user);
      if (user && user.length == 1) {
        // NOTE: we're not awaiting this, so that we don't leak whether or not the user
        // exists through timing. Also note that there will be some difference in timing whether
        // we take this branch or not, but I can't be bothered to make it that good.
        createCode(ctx.prisma, user[0].id, input.email, input.locale);
      }
    }),
  finishLogin: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const loginCodes = await ctx.prisma.$queryRaw<LoginCode[]>`
        DELETE FROM login_codes
        WHERE id = ${input}
        RETURNING *
      `;
      let loginCode;
      if (loginCodes.length > 0) {
        loginCode = loginCodes[0];
      } else {
        return { error: "invalidConfirmationCode" as const };
      }
      if (loginCode.validUntil < new Date()) {
        return { error: "invalidConfirmationCode" as const };
      }

      const user = await ctx.prisma.user.findUnique({
        where: { id: loginCode.userId },
        select: { exhibitorId: true },
      });
      if (!user) {
        return { error: "invalidConfirmationCode" as const };
      }

      const [_, session] = await ctx.prisma.$transaction([
        ctx.prisma.session.deleteMany({
          where: { userId: loginCode.userId },
        }),
        ctx.prisma.session.create({
          data: { userId: loginCode.userId, exhibitorId: user.exhibitorId },
        }),
      ]);

      ctx.res.setHeader(
        "Set-Cookie",
        `session=${session.id}; Path=/; HttpOnly; SameSite=Lax; Secure`
      );

      return { ok: true };
    }),
  isLoggedIn: publicProcedure.query(async ({ ctx }) => {
    return ctx.session !== null;
  }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.session.delete({ where: { id: ctx.session.id } });
    ctx.res.setHeader(
      "Set-Cookie",
      `session=; Path=/; HttpOnly; SameSite=Lax; Secure`
    );
  }),
});

// TODO: Unused login codes that expire are never cleaned up. This shouldn't be a huge problem,
// but it would be nice to periodically clean them up.
