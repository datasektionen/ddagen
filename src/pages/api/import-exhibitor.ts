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

  console.log(req.body);

  const apiKey = req.headers["authorization"];
  console.log(apiKey);
  if (apiKey == undefined) return res.status(400).end();
  if (!(await pls.checkApiKey("write-exhibitors", apiKey))) {
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
    email: z.string().trim(),
    exhibitorPackage: z.enum([
      "main",
      "base",
      "sponsor",
      "premium",
      "startup",
      "headhunter",
    ]),
    packageTier: z.number(),
    sendEmailToExhibitor: z.boolean(),
    mapPosition: z.number(),
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
    packageTier,
    sendEmailToExhibitor,
    mapPosition,
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
      packageTier: 0,
      extraTables: 0,
      extraChairs: 0,
      extraDrinkCoupons: 0,
      extraRepresentativeSpots: 0,
      totalBanquetTicketsWanted: 0,
      customTables: 0,
      customChairs: 0,
      customDrinkCoupons: 0,
      customRepresentativeSpots: 0,
      customBanquetTicketsWanted: 0,
      mapPosition: mapPosition,
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
      packageTier: packageTier,
      mapPosition: mapPosition,
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
    if (sendEmailToExhibitor) {
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
    }
  } catch (e) {}

  res.status(200).end();
}

/**
Google apps script code for sales team to input the company information in order to create the company user accounts.

function updateSheet() {
  const activeSheet = SpreadsheetApp.getActiveSpreadsheet();
  const exhibitorSheet = activeSheet.getSheetByName("ExhibitorsAndUsers");
  const signingsSheet = SpreadsheetApp.openByUrl("< The sheet url, eg: https://docs.google.com/spreadsheets/d/1SyFxnm1e1R0lUmXE-TJ8nZ9_hbm-f7ugeAAhHkinhtE/edit >").getSheetByName("FÃ¶retagsinformation");

  const packageMap = {"Bas": "base", "Spons": "sponsor", "Headhunter": "headhunter", "Premium": "premium", "Startup": "startup"}
  
  //exhibitorSheet.getRange(2, 1, exhibitorSheet.getLastRow(), exhibitorSheet.getLastColumn()).clearContent();
  const signingsSheetRows = signingsSheet.getSheetValues(2, 1, signingsSheet.getLastRow() - 1, signingsSheet.getLastColumn() - 1);
  signingsSheetRows.map(row => {
    const companyName = row[0];
    const package = packageMap[row[8]];
    if ((row[7] == "Undertecknad" || row[7] == "Skickad") && row[11] == "Nej" && package) exhibitorSheet.appendRow(["", "", companyName, "", "", package])
  })
}

function importExhibitors() {
  // Fejk organisationsnummer: 8106309225
  // importExhibitor("Jon Doe", "0777777777", "Test AB", "8106309225", "ernstumeh00@gmail.com", "base");

  var activeSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = activeSheet.getSheetByName("ExhibitorsAndUsers");
  var rows = sheet.getSheetValues(2, 1, sheet.getLastRow() - 1, 7);

  rows.map(row => {
    importExhibitor(row[0], row[1].toString(), row[2], row[3].toString(), row[4], row[5], Number(row[6]));
    Logger.log("Exhibitor and user added to database.")
  })
}

function importExhibitor(contactPerson, telephoneNumber, companyName, organizationNumber, email, exhibitorPackage, mapPosition) {
  UrlFetchApp.fetch("https://ddagen.se/api/import-exhibitor", {
    method: "PUT",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '<pls bearer token>',
    },
    payload: JSON.stringify({
      contactPerson: contactPerson,
      telephoneNumber: telephoneNumber,
      companyName: companyName, 
      organizationNumber: organizationNumber, 
      email: email, 
      exhibitorPackage: exhibitorPackage,
      sendEmailToExhibitor: false,
      mapPosition: mapPosition,
    })
  });
}

function deleteExhibitor(organizationNumber) {
  UrlFetchApp.fetch("https://ddagen.se/api/delete-exhibitor", {
    method: "DELETE",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '<pls bearer token>',
    },
    payload: JSON.stringify({
      organizationNumber: organizationNumber, 
    })
  });
}
*/


