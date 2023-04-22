import { env } from "@/env.mjs";

export default async function sendEmail(
  to: string,
  subject: string,
  body: string,
  replyTo?: string,
) {
  if (env.NODE_ENV === "development") {
    console.log(
      "In development mode - so not sending email\n" +
      "To: " + to + "\n" +
      "Subject: " + subject + "\n" +
      "Body: \n---\n" + body +
      "---",
    );
    return;
  }
  try {
    const res = await fetch(env.SPAM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: env.SPAM_API_KEY,
        from: "no-reply@datasektionen.se",
        replyTo,
        to,
        subject,
        html: body,
      }),
    });
    if (!res.ok) {
      throw new Error(`Could not send email, ${res.status} ${res.statusText}`);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}
