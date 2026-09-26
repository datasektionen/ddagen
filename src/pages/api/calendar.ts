import type { NextApiRequest, NextApiResponse } from "next";
import { buildCalendar, CALENDAR_FILENAME } from "@/shared/events";

// Calendar feed with all D-Dagen events. Also served at /ddagen.ics and
// /api/calendar.ics (see rewrites in next.config.mjs).
// ?lang=en for English, ?download=1 to download instead of subscribing.
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).end();
  }

  const locale = req.query.lang === "en" ? "en" : "sv";
  const download = req.query.download === "1";

  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    download ? `attachment; filename="${CALENDAR_FILENAME}"` : "inline"
  );
  res.setHeader("Cache-Control", "public, max-age=0, s-maxage=3600");
  res.status(200).send(buildCalendar(locale));
}
