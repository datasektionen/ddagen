import { prisma } from "@/server/db";
import crypto from "crypto";

export async function verifyApiKey(raw: string) {
  const hash = crypto.createHash("sha256").update(raw).digest("hex");

  const key = await prisma.apiKey.findUnique({
    where: { hash },
  });

  return !!key;
}