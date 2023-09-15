import { env } from "@/env.mjs";

export type Permission = "read-exhibitors" | "write-exhibitors" | "read-registrations";

export async function checkApiKey(permission: Permission, apiKey: string): Promise<boolean> {
  if (env.PLS_URL === "true") {
    return true;
  }
  if (env.PLS_URL === "false") {
    return false;
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
