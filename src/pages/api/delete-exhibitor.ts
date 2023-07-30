import { z } from "zod";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { timingSafeEqual } from "crypto";
import sendEmail from "@/utils/send-email";
import type { NextApiRequest, NextApiResponse } from "next";
import { validateOrganizationNumber } from "@/shared/validateOrganizationNumber";

const deleteToken = Buffer.from(env.DELETE_TOKEN);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers["authorization"];
  if (req.method !== "DELETE") return res.status(405).end();
  else if (
    authHeader == undefined ||
    authHeader.length != deleteToken.length ||
    !timingSafeEqual(Buffer.from(authHeader), deleteToken)
  ) {
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
    }
  });

  await prisma.exhibitor.deleteMany({
    where: {
      organizationNumber: organizationNumber,
    }
  });

  res.status(200).end();
}
