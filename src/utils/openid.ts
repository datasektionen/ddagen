import * as client from "openid-client";
import { SignJWT, jwtVerify } from "jose";
import { z } from "zod";
import { Cookies } from "@/shared/Classes";
import { getBaseUrl } from "@/utils/api"

let oidcConfig: Awaited<ReturnType<typeof client.discovery>> | null = null;

async function getOidcConfig() {
  if (!oidcConfig) {
    oidcConfig = await client.discovery(
      new URL(process.env.OIDC_PROVIDER || "localhost:7003"),
      process.env.OIDC_ID || "client-id",
      process.env.OIDC_SECRET || "client-secret",  // metadata
      undefined,                // clientAuthentication
      {
        execute: [client.allowInsecureRequests], // TODO: DON'T FORGET TO REMOVE THIS
      }
    )
  }

  return oidcConfig;
}

export async function authorizeClaims(oidc_code_verifier: string, oidc_state: string, current_url: string){
  console.log("VERIFIER: ", oidc_code_verifier);
  console.log("STATE: ", oidc_state);
  let claims;
  const openIdConfig = await getOidcConfig();
  try {
      claims = (await client.authorizationCodeGrant(
      openIdConfig,
      new URL(current_url),
      {
          pkceCodeVerifier: oidc_code_verifier,
          expectedState: oidc_state
      }
      )).claims();
  } catch (error) {
      console.error("Grant failed:", error);
      return { error: "invalidConfirmationCode" as const };
  }

  console.log("CLAIMS", claims);
  return claims;
}

/* INTERNAL JWT SESSIONS */
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const SessionPayloadSchema = z.object({
  sub: z.string(),
  email: z.string(),
  name: z.string().optional(),
  permissions: z.array(z.string()),
  exhibitor: z.string().optional()
});


// Create token
export async function createSessionToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5min")
    .sign(secret);
}

// Verify token
export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload) return null;

    const parsed = SessionPayloadSchema.safeParse(payload);
    if (!parsed.success) return null;

    return parsed.data;
  } catch {
    return null;
  }
}

export async function getSession(cookies: Cookies) {
  const token = cookies.token;
  if (!token) return null;

  return await verifySessionToken(token);
}

export async function initiateAuthorization(subpath: string) {
      const code_verifier: string = client.randomPKCECodeVerifier();
      const code_challenge: string = await client.calculatePKCECodeChallenge(code_verifier);
      const state = client.randomState();

      const openIdConfig = await getOidcConfig();
      const oidc_auth_url = client.buildAuthorizationUrl(openIdConfig, {
        redirect_uri: `${getBaseUrl()}${subpath}`,
        scope: "openid profile email permissions",
        code_challenge,
        code_challenge_method: "S256",
        state
      });

      return {
        code_verifier: code_verifier,
        code_challenge: code_challenge,
        state: state,
        oidc_auth_url: oidc_auth_url
      };
}
