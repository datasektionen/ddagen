import { z } from "zod";
import { prisma } from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import * as pls from "@/utils/pls";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") return res.status(405).end();

  const apiKey = req.headers["authorization"];
  if (apiKey == undefined) return res.status(400).end();
  if (!(await pls.checkApiKey("write-exhibitors", apiKey))) {
    return res.status(402).end();
  }

  const bodySchema = z.object({
    organizationNumber: z.string(),
  });

  const body = bodySchema.safeParse(req.body);
  if (!body.success) return res.status(422).json(body.error);

  const { organizationNumber } = body.data;

  await prisma.jobOffers.deleteMany({
    where: {
      exhibitor: { organizationNumber: organizationNumber },
    },
  });

  await prisma.exhibitor.deleteMany({
    where: {
      organizationNumber: organizationNumber,
    },
  });

  res.status(200).end();
}
