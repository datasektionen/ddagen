import { z } from "zod";
import { env } from "@/env.mjs";
import { getLocale } from "@/locales";
import sendEmail from "@/utils/send-email";
import { Prisma, type PrismaClient } from "@prisma/client";
import { timingSafeEqual, randomBytes } from "crypto";
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
  await prisma.$transaction([
    prisma.loginCode.deleteMany({
      where: { userId: userId },
    }),
    prisma.loginCode.create({
      data: { id: loginCode, userId: userId },
    }),
  ]);

  try {
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
      if (user && user.length == 1) {
        // Note that we're not awaiting this, so that we don't leak whether or not the user
        // exists through timing.
        createCode(ctx.prisma, user[0].id, input.email, input.locale);
      }
    }),
  finishLogin: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
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
  confirmSalesAdmin: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(({ input }) => {
      const username = Buffer.from(env.SALES_USERNAME);
      const password = Buffer.from(env.SALES_PASSWORD);
      return (
        input.username.length == username.length &&
        timingSafeEqual(Buffer.from(input.username), username) &&
        input.password.length == password.length &&
        timingSafeEqual(Buffer.from(input.password), password)
      );
    }),
});

// TODO: Unused login codes that expire are never cleaned up. This shouldn't be a huge problem,
// but it would be nice to periodically clean them up.
