import { getSession, verifySessionToken } from "./openid";
import { Cookies } from "@/shared/Classes";

export async function fetchHive(userId: string): Promise<string[]> {
  const hiveBaseUrl = process.env.HIVE_URL || "http://localhost:7004";
  const hiveSecret = process.env.HIVE_SECRET || "test";

  try {
    const res = await fetch(`${hiveBaseUrl}/api/v1/user/${userId}/permissions`, {
      headers: { Authorization: `Bearer ${hiveSecret}` }
    });

    if (res.status !== 200) {
      console.error("Hive request failed:", res.status);
      return [];
    }

    const hiveData = await res.json();
    return hiveData.map((p: any) => p.id).filter(Boolean);
  } catch (err) {
    console.error("Hive request failed:", err);
    return [];
  }
}

export async function isAdmin(cookies: Cookies) {
  const payload = await getSession(cookies);
  if (!payload) return false;

  return payload.permissions.includes("admin") ||
         payload.permissions.includes("ddagen");
}
/*
export async function checkHiveAdmin(oidc_code_verifier?: string, oidc_state?: string, redirect_uri: string){
    if (!oidc_state || !oidc_code_verifier || !redirect_uri) {
        console.error("Missing OIDC cookies in header");
        return false;
      }

      console.log("VERIFIER: ", oidc_code_verifier);
      console.log("STATE: ", oidc_state);
      console.log("INPUT", redirect_uri);
      let claims;
      try {
        claims = (await client.authorizationCodeGrant(
          config,
          new URL(redirect_uri),
          {
            pkceCodeVerifier: oidc_code_verifier,
            expectedState: oidc_state
          }
        )).claims();
      } catch (error) {
        console.error("Grant failed:", error);
        return false;
      }

      console.log("CLAIMS", claims);

      if (!claims?.email) {
        console.log("Unknown email");
        return { error: "userNotFound" as const };
      }

      const hiveBaseUrl = process.env.HIVE_URL || "http://localhost:7004";
      const url = hiveBaseUrl + `/api/v1/user/${claims.sub}/permissions`;
      const options = {
        headers: {
          Authorization: "Bearer test"
        }
      };
      
      try {
        const res = await fetch(url, options);
        if (res.status !== 200) {
            console.error("pls request failed with status code:", res.status);
            return false;
        }
        const hiveData = await res.json();

        console.log(hiveData);

        if(!hiveData?.find((perm: any) => perm.id == "admin" || perm.id == "ddagen")){
            console.log("User does not have permission for admin");
            return false;
        }
    } catch (err) {
        console.error("pls request failed:", err);
    }
    
    return true;
}
*/