import { z } from "zod";
import { getLocale } from "@/locales";
import sendEmail from "@/utils/send-email";
import type { LoginCode, PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import * as client from "openid-client";

const config: client.Configuration = await client.discovery(
  new URL(process.env.OIDC_PROVIDER),
  process.env.OIDC_ID,
  process.env.OIDC_SECRET,  // metadata
  undefined,                // clientAuthentication
  {
    execute: [client.allowInsecureRequests], // TODO: DON'T FORGET TO REMOVE THIS
  }
);

export const accountRouter = createTRPCRouter({
  startLogin: publicProcedure
    .input(z.object({ subpath: z.string().startsWith("/") }))
    .mutation(async ({ input, ctx }) => {
      const code_verifier: string = client.randomPKCECodeVerifier();
      const code_challenge: string = await client.calculatePKCECodeChallenge(code_verifier);
      const state = client.randomState();

      const max_age = 10 * 60; // max request age 10 minutes
      ctx.res.setHeader("Set-Cookie", [
        `oidc_code_verifier=${code_verifier}; Max-Age=${max_age}; Path=/; HttpOnly; SameSite=Lax`,
        `oidc_state=${state}; Max-Age=${max_age}; Path=/; HttpOnly; SameSite=Lax`
      ]);

      const oidc_auth_url = client.buildAuthorizationUrl(config, {
        redirect_uri: `http://localhost:3000${input.subpath}`,
        scope: "openid profile email",
        code_challenge,
        code_challenge_method: "S256",
        state
      });

      return { url: oidc_auth_url.href };
    }),
  finishLogin: publicProcedure
    .input(z.object({ current_url: z.string().url() }))
    .mutation(async ({ input, ctx }) => {
      const { oidc_code_verifier, oidc_state } = ctx?.cookies;

      if (!oidc_state || !oidc_code_verifier) {
        console.error("Missing OIDC cookies in header");
        return { error: "invalidConfirmationCode" as const };
      }

      let claims;
      try {
        claims = (await client.authorizationCodeGrant(
          config,
          new URL(input.current_url),
          {
            pkceCodeVerifier: oidc_code_verifier,
            expectedState: oidc_state
          }
        )).claims();
      } catch (error) {
        console.error("Grant failed:", error);
        return { error: "invalidConfirmationCode" as const };
      }

      console.log(claims);

      if (!claims?.email) {
        console.log("Unknown email");
        return { error: "userNotFound" as const };
      }

      const user = await ctx.prisma.user.findUnique({
        where: { email: claims.email },
        select: { id: true, exhibitorId: true },
      });

      console.log(user);

      if (!user) {
        console.log("User not found");
        return { error: "userNotFound" as const };
      }

      const [_, session] = await ctx.prisma.$transaction([
        ctx.prisma.session.deleteMany({
          where: { userId: user.id },
        }),
        ctx.prisma.session.create({
          data: { userId: user.id, exhibitorId: user.exhibitorId },
        }),
      ]);

      ctx.res.setHeader("Set-Cookie", [
        `session=${session.id}; Path=/; HttpOnly; SameSite=Lax; Secure`,
        `oidc_state=; Path=/; Max-Age=0; HttpOnly`,
        `oidc_code_verifier=; Path=/; Max-Age=0; HttpOnly`
      ]);

      return { ok: true };
    }),
  isLoggedIn: publicProcedure.query(async ({ ctx }) => {
    return ctx.session !== null;
  }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.session.delete({ where: { id: ctx.session.id } });
    ctx.res.setHeader(
      "Set-Cookie",
      `session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`
    );
  }),
});
