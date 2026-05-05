import { z } from "zod";
import { getLocale } from "@/locales";
import sendEmail from "@/utils/send-email";
import type { LoginCode, PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import * as hive from "@/utils/hive";
import * as client from "openid-client";
import { authorizeClaims, createSessionToken, getSession } from "@/utils/openid";

/*
const config: client.Configuration = await client.discovery(
  new URL(process.env.OIDC_PROVIDER),
  process.env.OIDC_ID,
  process.env.OIDC_SECRET,  // metadata
  undefined,                // clientAuthentication
  {
    execute: [client.allowInsecureRequests], // TODO: DON'T FORGET TO REMOVE THIS
  }
);
*/
const config = await client.discovery(
  new URL(process.env.OIDC_PROVIDER!),

  // 1. client_id
  process.env.OIDC_ID!,

  // 2. metadata (THIS is where redirect_uris goes)
  {
    client_secret: process.env.OIDC_SECRET!,
    redirect_uris: ["http://localhost:3000/logga-in"],
    response_types: ["code"],
  },

  // 3. client authentication method
  client.ClientSecretBasic(process.env.OIDC_SECRET!),

  // 4. options
  {
    execute: [client.allowInsecureRequests], // dev only
  }
);

/*
const permissionPath = "/api/v1/user/:id/permissions";
*/

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

      // OIDC Authorization of the cookies, previous redirect_uri must match current_url, only works once
      const claims = await authorizeClaims(
          oidc_code_verifier,
          oidc_state,
          input.current_url
      );

      if (!claims || "error" in claims) {
          return { error: "invalidConfirmationCode" as const };
      }

      if (!claims.email) {
          return { error: "userNoEmail" as const };
      }
      if(typeof claims.email != "string")return { error: "userInvalidEmail" as const };


      // Get the authorized users permissions in hive
      const permissions = await hive.fetchHive(claims.sub);

      /*
      // Require them to have admin permissions from hive
      if (!permissions.includes("admin") && !permissions.includes("ddagen")) {
          return { error: "userNotAdmin" as const };
      }
      */


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


      // Sign an internal JWT to keep the permissions and user_id (sub) verified
      /*
      const token = await createSessionToken({
          sub: claims.sub,
          email: claims.email,
          name: claims.name,
          permissions,
          exhibitor: user.exhibitorId
      });
      */

      // Set cookie, forget the used up OIDC cookies, keep the internal JWT. Check it with isAdmin(token)
      ctx.res.setHeader("Set-Cookie", [
        `session=${session.id}; Path=/; HttpOnly; SameSite=Lax; Secure`, // TODO , remove old session prisma state, only do jwt
        `oidc_state=; Path=/; Max-Age=0; HttpOnly`,
        `oidc_code_verifier=; Path=/; Max-Age=0; HttpOnly`,
      ]);
      //`session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=300; Secure`
      /*
      ctx.res.setHeader("Set-Cookie", [
        `session=${session.id}; Path=/; HttpOnly; SameSite=Lax; Secure`,
        `oidc_state=; Path=/; Max-Age=0; HttpOnly`,
        `oidc_code_verifier=; Path=/; Max-Age=0; HttpOnly`
      ]);
      */

      return { ok: true };
    }),
  /*
  isLoggedIn: publicProcedure.query(async ({ ctx }) => {
    // As long as the internal JWT is still being parsed as valid
    const session = await getSession(ctx.cookies);
    return session !== null;
  }),
  logout: publicProcedure.mutation(async ({ ctx }) => {
    // Forget the interal JWT
    ctx.res.setHeader(
        "Set-Cookie",
        `session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`
    );
    
    return { status: true };
  }),
  */
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
  /*
  */
});
