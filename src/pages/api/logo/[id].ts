import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";

// An exhibitor's logo as an image, so pages can link to it instead of putting
// every logo in the page as base64. Cached for an hour, so a new upload shows
// up within that time.
//
// ?w=256 or ?w=640 gives a smaller copy. Uploaded logos can be 8000px wide,
// and decoding dozens of those makes the map's logo mode lag on phones.
const WIDTHS = [256, 640];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  if (typeof id !== "string") return res.status(400).end();
  const width = Number(req.query.w);

  const exhibitor = await prisma.exhibitor
    .findUnique({ where: { id }, select: { logoColor: true, logoWhite: true } })
    .catch(() => null);
  const logo = exhibitor?.logoColor ?? exhibitor?.logoWhite;
  if (!logo) return res.status(404).end();

  let body: Buffer = logo;
  let type = imageType(logo);
  // Svgs already scale without cost, so only pixel images are made smaller.
  if (WIDTHS.includes(width) && type !== "image/svg+xml") {
    const small = await resized(id, width, logo);
    if (small) {
      body = small;
      type = "image/webp";
    }
  }

  res.setHeader("Content-Type", type);
  // Uploaded svgs must not be able to run scripts on our domain.
  res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  res.send(body);
}

// Small copies are kept in memory. The key includes the original's size, so a
// newly uploaded logo gets a new copy.
const copies = new Map<string, Buffer>();
// One image at a time: the server is small and big logos take a lot of memory
// while being decoded.
let queue: Promise<unknown> = Promise.resolve();

function resized(id: string, width: number, logo: Buffer): Promise<Buffer | null> {
  const key = `${id}:${width}:${logo.length}`;
  const cached = copies.get(key);
  if (cached) return Promise.resolve(cached);
  const job = queue.then(async () => {
    try {
      const sharp = (await import("sharp")).default;
      const small = await sharp(logo)
        .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();
      if (copies.size > 500) copies.clear();
      copies.set(key, small);
      return small;
    } catch (err) {
      // Without sharp (or for an odd file) the original is sent as before.
      console.error("logo: could not resize", id, err);
      return null;
    }
  });
  queue = job;
  return job;
}

function imageType(bytes: Buffer) {
  const start = bytes.subarray(0, 12).toString("latin1");
  if (start.startsWith("\x89PNG")) return "image/png";
  if (start.startsWith("\xff\xd8")) return "image/jpeg";
  if (start.startsWith("GIF8")) return "image/gif";
  if (start.startsWith("RIFF") && start.slice(8) === "WEBP") return "image/webp";
  return "image/svg+xml";
}
