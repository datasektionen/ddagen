import { getLocale } from "@/locales";
import sendEmail from "@/utils/send-email";
import { Prisma } from "@prisma/client";
import { randomBytes } from "crypto";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const accountRouter = createTRPCRouter({
  startLogin: publicProcedure
    .input(z.object({
      email: z.string(),
      locale: z.enum(["en", "sv"]),
    }))
    .mutation(async ({ input, ctx }) => {
      const t = getLocale(input.locale);

      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!user) {
        return { error: "userNotFound" as const };
      }

      const loginCode = randomBytes(24).toString("base64url");
      // TODO: make url configurable
      const magicLink = "https://ddagen.se/logga-in?code=" + loginCode;
      await ctx.prisma.loginCode.create({
        data: { id: loginCode, userId: user.id },
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
    let loginCode;
    try {
      loginCode = await ctx.prisma.loginCode.delete({
        where: { id: input },
        include: { user: true },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2025"
      ) {
        return { error: "invalidConfirmationCode" as const };
      }
      throw e;
    }
    if (loginCode.createdAt < new Date(Date.now() - 1000 * 60 * 10)) {
      return { error: "invalidConfirmationCode" as const };
    }

    const [_, session] = await ctx.prisma.$transaction([
      ctx.prisma.session.deleteMany({
        where: { userId: loginCode.userId },
      }),
      ctx.prisma.session.create({
        data: { userId: loginCode.userId },
      }),
    ]);

    ctx.res.setHeader("Set-Cookie", `session=${session.id}; Path=/; HttpOnly; SameSite=Lax; Secure`);

    return { ok: true };
  }),
  isLoggedIn: publicProcedure.query(async ({ ctx }) => {
    return ctx.session !== null;
  }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.session.delete({ where: { id: ctx.session.id } });
    ctx.res.setHeader("Set-Cookie", `session=; Path=/; HttpOnly; SameSite=Lax; Secure`);
  }),
});

// TODO: Unused login codes that expire are never cleaned up. This shouldn't be a huge problem,
// but it would be nice to periodically clean them up.
