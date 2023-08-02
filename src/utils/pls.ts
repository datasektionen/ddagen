import { env } from "@/env.mjs";

type Permission = "write-exhibitors" | "read-registrations";

export async function checkApiKey(permission: Permission, apiKey: string): Promise<boolean> {
  if (typeof env.PLS_OVERRIDE == "string") {
    return env.PLS_OVERRIDE == "true";
  }

  let allowed = false;
  try {
    const res = await fetch(`${env.PLS_URL}/api/token/${encodeURIComponent(apiKey)}/ddagen/${permission}`);
    if (res.status !== 200) {
      console.error("pls request failed with status code:", res.status);
      return false;
    }
    allowed = (await res.json()) === true;
  } catch (err) {
    console.error("pls request failed:", err);
  }
  return allowed;
}
