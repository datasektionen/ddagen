import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";

// An exhibitor's logo as an image, so pages can link to it instead of putting
// every logo in the page as base64. Cached for an hour, so a new upload shows
// up within that time.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  if (typeof id !== "string") return res.status(400).end();

  const exhibitor = await prisma.exhibitor
    .findUnique({ where: { id }, select: { logoColor: true, logoWhite: true } })
    .catch(() => null);
  const logo = exhibitor?.logoColor ?? exhibitor?.logoWhite;
  if (!logo) return res.status(404).end();

  res.setHeader("Content-Type", imageType(logo));
  // Uploaded svgs must not be able to run scripts on our domain.
  res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.send(logo);
}

function imageType(bytes: Buffer) {
  const start = bytes.subarray(0, 12).toString("latin1");
  if (start.startsWith("\x89PNG")) return "image/png";
  if (start.startsWith("\xff\xd8")) return "image/jpeg";
  if (start.startsWith("GIF8")) return "image/gif";
  if (start.startsWith("RIFF") && start.slice(8) === "WEBP") return "image/webp";
  return "image/svg+xml";
}
