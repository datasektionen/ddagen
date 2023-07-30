import { z } from "zod";
import { prisma } from "@/server/db";
import sendEmail from "@/utils/send-email";
import type { NextApiRequest, NextApiResponse } from "next";
import { validateOrganizationNumber } from "@/shared/validateOrganizationNumber";
import * as pls from "@/utils/pls";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(405).end();

  const apiKey = req.headers["authorization"]?.split(" ")[1];
  if (apiKey == undefined) return res.status(402).end();
  if (!await pls.checkApiKey("write-exhibitors", apiKey)) {
    return res.status(402).end();
  }

  const bodySchema = z.object({
    contactPerson: z.string(),
    telephoneNumber: z.string(),
    companyName: z.string(),
    organizationNumber: z.string().transform((s, ctx) => {
      const orgNum = validateOrganizationNumber(s);
      if ("error" in orgNum) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: orgNum.error,
        });
        return z.NEVER;
      }
      return orgNum.value;
    }),
    email: z.string(),
    exhibitorPackage: z.enum(["base", "sponsor", "headhunter", "premium"]),
  });

  const body = bodySchema.safeParse(req.body);
  if (!body.success) return res.status(422).json(body.error);

  const {
    contactPerson,
    telephoneNumber,
    companyName,
    organizationNumber,
    email,
    exhibitorPackage,
  } = body.data;

  const exhibitor = await prisma.exhibitor.upsert({
    where: {
      organizationNumber: organizationNumber,
    },
    create: {
      name: companyName,
      organizationNumber: organizationNumber,
      invoiceEmail: email,
      logoWhite: null,
      logoColor: null,
      description: "",
      package: exhibitorPackage,
      extraTables: 0,
      extraChairs: 0,
      extraDrinkCoupons: 0,
      extraRepresentativeSpots: 0,
      totalBanquetTicketsWanted: 0,
      foodPreferencess: undefined,
      jobOffers: {
        create: {
          summerJob: undefined,
          internship: undefined,
          partTimeJob: undefined,
          masterThesis: false,
          fullTimeJob: false,
          traineeProgram: false,
        },
      },
    },
    update: {
      name: companyName,
      organizationNumber: organizationNumber,
      invoiceEmail: email,
      package: exhibitorPackage,
    },
  });

  await prisma.user.upsert({
    where: { email: email },
    create: {
      email: email,
      name: contactPerson,
      phone: telephoneNumber.replace(/[^\d+]/g, ""),
      role: "",
      exhibitor: { connect: { id: exhibitor.id } },
    },
    update: {
      email: email,
      name: contactPerson,
      phone: telephoneNumber.replace(/[^\d+]/g, ""),
    },
  });

  try {
    sendEmail(
      email,
      "D-Dagen Account Created",
      `
      <p>Hi!</p>
      <p>We are pleased to confirm your exhibitor account has been created.</p>
      <p>Visit ${"ddagen.se/utställare"} and use ${email} to log into your account.</p>
      <p>Best regards,</p>
      <p>The D-Dagen Team</p>
      `
    );
  } catch (e) { }

  res.status(200).end();
}
