import { z } from "zod";
import { getLocale } from "@/locales";
import sendEmail from "@/utils/send-email";
import type { LoginCode, PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import * as hive from "@/utils/hive";
import * as client from "openid-client";
import { authorizeClaims, createSessionToken, getSession, initiateAuthorization } from "@/utils/openid";
import { randomInt, createHash, timingSafeEqual } from "crypto";


const hashOtp = (code: string) => createHash("sha256").update(code).digest("hex");

// Protect against timing attacks during comparison
const secureCompare = (storedHash: string, inputCode: string) => {
  const inputHash = hashOtp(inputCode);
  if (storedHash.length !== inputHash.length) return false;
  
  // Wrap in standard Uint8Array to satisfy strict TS configurations
  const storedArr = new Uint8Array(Buffer.from(storedHash, "hex"));
  const inputArr = new Uint8Array(Buffer.from(inputHash, "hex"));
  
  return timingSafeEqual(storedArr, inputArr);
};


export const accountRouter = createTRPCRouter({
  startLogin: publicProcedure
    .input(z.object({ subpath: z.string().startsWith("/") }))
    .mutation(async ({ input, ctx }) => {
      const { code_verifier, code_challenge, state, oidc_auth_url } = await initiateAuthorization(input.subpath);

      const max_age = 10 * 60; // max request age 10 minutes
      ctx.res.setHeader("Set-Cookie", [
        `oidc_code_verifier=${code_verifier}; Max-Age=${max_age}; Path=/; HttpOnly; SameSite=Lax`,
        `oidc_state=${state}; Max-Age=${max_age}; Path=/; HttpOnly; SameSite=Lax`
      ]);

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
      //const permissions = await hive.fetchHive(claims.sub);
      const permissions = Array.isArray(claims?.permissions)
          ? (claims.permissions as any[])
                .map((p: any) => p.id)
                .filter(Boolean)
          : [];

      // Require them to have admin permissions from hive
      if (permissions.includes("admin") || permissions.includes("ddagen")) {
          console.log("ACCOUNT IS ADMIN!")
          const token = await createSessionToken({
              sub: claims.sub,
              email: claims.email,
              name: claims.name,
              permissions
          });

          // Set cookie, forget the used up OIDC cookies, keep the internal JWT. Check it with isAdmin(token)
          const secure = process.env.NODE_ENV === 'production' ? 'Secure;' : '';
          ctx.res.setHeader("Set-Cookie", [
              `oidc_state=; Path=/; Max-Age=0; HttpOnly`,
              `oidc_code_verifier=; Path=/; Max-Age=0; HttpOnly`,
              `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400; ${secure}`
          ]);

          return { ok: true, isAdmin: true };
      }

      // If they are not admin, then check if they have a company account
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
          permissions
      });
      */

      // Set cookie, forget the used up OIDC cookies, keep the internal JWT. Check it with isAdmin(token)
      const secure = process.env.NODE_ENV === 'production' ? 'Secure;' : '';
      ctx.res.setHeader("Set-Cookie", [
        `session=${session.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400; ${secure}`, // TODO , remove old session prisma state, only do jwt
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

      console.log("4");
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
        "Set-Cookie", [
          `session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`,
          `token=; Path=/; HttpOnly; SameSite=Lax; ${secure}`
        ]
    );

    return { status: true };
  }),
  */
  isLoggedIn: publicProcedure.query(async ({ ctx }) => {
    const user = await getSession(ctx.cookies);

    if (user != null) {
        return { ok: true, isAdmin: user?.permissions?.includes("admin") || user?.permissions?.includes("ddagen") };
    }

    return { ok: ctx.session !== null };
  }),
  getUser: publicProcedure.query(async ({ ctx }) => {
    return await getSession(ctx.cookies);
  }),
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.session.delete({ where: { id: ctx.session.id } });
    const secure = process.env.NODE_ENV === 'production' ? 'Secure;' : '';
    ctx.res.setHeader(
      "Set-Cookie", [
        `session=; Path=/; HttpOnly; SameSite=Lax; ${secure}`,
        `token=; Path=/; HttpOnly; SameSite=Lax; ${secure}`
      ]
    );

    return { status: true }
  }),


  // OTP Flow:
  requestOtp: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input, ctx }) => {
      const email = input.email.toLowerCase();
      const isAdmin = email.endsWith("@ddagen.se");

      // 1. Verify existence if not an admin
      if (!isAdmin) {
        const user = await ctx.prisma.user.findUnique({ where: { email } });
        if (!user) {
          // Security: Return true anyway to prevent user enumeration attacks
          return { ok: true }; 
        }
      }

      // 2. Generate cryptographically secure 6-digit code
      const otp = randomInt(100000, 999999).toString();
      const validUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      // 3. Upsert the hashed code to the database
      await ctx.prisma.otpCode.upsert({
        where: { email },
        update: { codeHash: hashOtp(otp), attempts: 0, validUntil, createdAt: new Date() },
        create: { email, codeHash: hashOtp(otp), validUntil },
      });

      // 4. Send email
      await sendEmail(
        email,
        getLocale("en").admin.login.otpEmailSubject,
        getLocale("en").admin.login.otpEmailBody(otp)
      );

      return { ok: true };
    }),

  verifyOtp: publicProcedure
    .input(z.object({ email: z.string().email(), code: z.string().length(6) }))
    .mutation(async ({ input, ctx }) => {
      const email = input.email.toLowerCase();
      
      // 1. Fetch OTP record
      const otpRecord = await ctx.prisma.otpCode.findUnique({ where: { email } });
      if (!otpRecord) return { error: "invalidCode" as const };

      // 2. Verify Expiration
      if (otpRecord.validUntil < new Date()) {
        await ctx.prisma.otpCode.delete({ where: { email } });
        return { error: "expiredCode" as const };
      }

      // 3. Brute-Force Protection
      if (otpRecord.attempts >= 5) {
        await ctx.prisma.otpCode.delete({ where: { email } });
        return { error: "tooManyAttempts" as const };
      }

      // 4. Secure constant-time comparison
      if (!secureCompare(otpRecord.codeHash, input.code)) {
        await ctx.prisma.otpCode.update({
          where: { email },
          data: { attempts: { increment: 1 } },
        });
        return { error: "invalidCode" as const };
      }

      // 5. Code valid -> delete it to ensure single-use
      await ctx.prisma.otpCode.delete({ where: { email } });

      const isAdmin = email.endsWith("@ddagen.se");
      const secure = process.env.NODE_ENV === "production" ? "Secure;" : "";

      if (isAdmin) {
        // --- ADMIN LOGIN LOGIC ---
        const token = await createSessionToken({
          sub: `admin-${email}`,
          email: email,
          name: "Admin User",
          permissions: ["admin", "ddagen"],
        });

        ctx.res.setHeader("Set-Cookie", [
          `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400; ${secure}`,
        ]);

        return { ok: true, isAdmin: true };
      } else {
        // --- EXHIBITOR LOGIN LOGIC ---
        const user = await ctx.prisma.user.findUnique({ where: { email } });
        if (!user) return { error: "userNotFound" as const };

        const [_, session] = await ctx.prisma.$transaction([
          ctx.prisma.session.deleteMany({ where: { userId: user.id } }),
          ctx.prisma.session.create({ data: { userId: user.id, exhibitorId: user.exhibitorId } }),
        ]);

        ctx.res.setHeader("Set-Cookie", [
          `session=${session.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400; ${secure}`,
        ]);

        return { ok: true, isAdmin: false };
      }
    }),
});
