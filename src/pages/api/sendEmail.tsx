import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  function sendEmail() {
    const body = JSON.parse(req.body);
    return fetch(`${process.env.NEXT_PUBLIC_SPAM_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: process.env.NEXT_PUBLIC_SPAM_API_KEY,
        from: body.from,
        to: body.to,
        subject: body.subject,
        html: body.html,
      }),
    });
  }

  switch (req.method) {
    case "POST":
      await sendEmail()
        .then((response) => {
          res.status(response.status).json({ messgae: response.statusText });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ message: error });
        });

      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
