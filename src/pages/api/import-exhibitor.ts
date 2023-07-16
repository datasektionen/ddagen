import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";
import { env } from "@/env.mjs";
import { timingSafeEqual, randomUUID } from "crypto";
import { validateOrganizationNumber } from "@/shared/validateOrganizationNumber";

const importToken = Buffer.from(env.IMPORT_TOKEN);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authHeader = req.headers["authorization"];
  if (req.method !== "PUT") return res.status(405).end();
  else if (
    authHeader == undefined ||
    authHeader.length != importToken.length ||
    !timingSafeEqual(Buffer.from(authHeader), importToken)
  ) {
    return res.status(402).end();
  }

  const {
    contactPerson,
    telephoneNumber,
    companyName,
    organizationNumber,
    email,
    exhibitorPackage,
  } = req.body;

  const v = validateOrganizationNumber(
    typeof organizationNumber === "string" ? organizationNumber : ""
  );

  if (
    "error" in v ||
    typeof contactPerson !== "string" ||
    typeof telephoneNumber !== "string" ||
    typeof companyName !== "string" ||
    typeof email !== "string" ||
    typeof exhibitorPackage !== "string" ||
    ["base", "sponsor", "headhunter", "premium"].includes(exhibitorPackage) ==
      false
  ) {
    return res.status(422).end();
  }

  await prisma.exhibitor
    .upsert({
      where: {
        organizationNumber: v.value,
      },
      create: {
        id: randomUUID(),
        name: companyName,
        organizationNumber: v.value,
        invoiceEmail: email,
        logoWhite: null,
        logoColor: null,
        description: "",
        package: exhibitorPackage as
          | "base"
          | "sponsor"
          | "headhunter"
          | "premium",
        extraTables: 0,
        extraChairs: 0,
        extraDrinkCoupons: 0,
        extraRepresentativeSpots: 0,
        totalBanquetTicketsWanted: 0,
        foodPreferencess: undefined,
        jobOffers: {
          create: {
            id: randomUUID(),
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
        organizationNumber: v.value,
        invoiceEmail: email,
        package: exhibitorPackage as
          | "base"
          | "sponsor"
          | "headhunter"
          | "premium",
      },
    })
    .then((response) => {
      console.log(response);
      prisma.user
        .upsert({
          where: { email: email },
          create: {
            id: randomUUID(),
            email: email,
            name: contactPerson,
            phone: telephoneNumber.replace(/[^\d+]/g, ""),
            role: "",
            exhibitor: { connect: { organizationNumber: v.value } },
          },
          update: {
            email: email,
            name: contactPerson,
            phone: telephoneNumber.replace(/[^\d+]/g, ""),
          },
        })
        .then((response) => {
          console.log(response);
          res.status(200).end();
        })
        .catch((error) => {
          console.log(error);
          res.status(422).end();
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(422).end();
    });
}
