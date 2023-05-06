import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";
import { env } from "@/env.mjs";
import { timingSafeEqual } from "crypto";

const exportToken = Buffer.from(env.EXPORT_TOKEN);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers["authorization"];
  if (!authHeader || authHeader.length != exportToken.length) {
    return res.status(402).end();
  }
  if (!timingSafeEqual(Buffer.from(authHeader), exportToken)) {
    return res.status(402).end();
  }

  const exhibitors = await prisma.exhibitorInterestRegistration.findMany({
    orderBy: { createdAt: "asc" },
  });

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(exhibitors.map(e => ({
    name: e.name,
    organizationNumber: e.organizationNumber,
    contactPerson: e.contactPerson,
    phoneNumber: e.phoneNumber,
    email: e.email,
    createdAt: e.createdAt,
  }))));
}
