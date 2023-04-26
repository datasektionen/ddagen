import type { NextApiRequest, NextApiResponse } from "next";
import { getLocale } from "@/locales";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  let body;
  try {
    body = JSON.parse(req.body);
  } catch (e) {
    res.status(400).end("Invalid JSON");
    return;
  }
  const { companyName, organizationNumber, email, contactPerson, phoneNumber, locale } = body;

  // NOTE: Browsers already disallow commas in the email field, so a normal user wouldn't get
  // this error.
  if (typeof email !== "string" || email.includes(",")) {
    res.status(400).end("Invalid email");
    return;
  }

  const t = getLocale(locale).email;

  try {
    const r = await fetch(`${process.env.SPAM_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: process.env.SPAM_API_KEY,
        from: "no-reply@datasektionen.se",
        to: email,
        replyTo: "sales@ddagen.se",
        subject: t.subject,
        html: t.body(
          companyName,
          organizationNumber,
          email,
          contactPerson,
          phoneNumber,
        ),
      }),
    });
    res.status(r.status).end();
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}
