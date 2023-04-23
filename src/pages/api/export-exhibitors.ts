import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";
import { env } from "@/env.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.headers["authorization"] !== env.EXPORT_TOKEN) {
    return res.status(402).end();
  }

  const exhibitors = await prisma.exhibitor.findMany({
    include: { accounts: true },
  });

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(exhibitors.map(e => ({
    name: e.name,
    organizationNumber: e.organizationNumber,
    contactPerson: e.contactPerson,
    phoneNumber: e.phoneNumber,
    email: e.accounts.map(a => a.email).join(","),
  }))));
}
