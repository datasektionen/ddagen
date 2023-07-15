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
  if (
    !authHeader ||
    authHeader.length != exportToken.length ||
    !timingSafeEqual(Buffer.from(authHeader), exportToken)
  ) {
    return res.status(402).end();
  }

  const exhibitors = await prisma.exhibitorInterestRegistration.findMany({
    orderBy: { createdAt: "asc" },
  });

  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify(
      exhibitors.map((e) => ({
        name: e.name,
        organizationNumber: e.organizationNumber,
        contactPerson: e.contactPerson,
        phoneNumber: e.phoneNumber,
        email: e.email,
        createdAt: e.createdAt,
      }))
    )
  );
}

/**
This function is meant to export the exhibitor registrations so that sales can see them.
In 2023, we made a google sheet for this, which had the following in a Google Apps Script:

```js
function importExhibitors() {
  var activeSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = activeSheet.getSheetByName("Utställare");

  const res = UrlFetchApp.fetch("https://ddagen.se/api/export-exhibitors", {
    method: "GET",
    headers: {
      'Authorization': <whatever env.EXPORT_TOKEN is>,
    },
  });

  const data = JSON.parse(res.getContentText());

  sheet.getRange(1, 1, 1, 7).setValues([[
    "Företagsnamn", "Organisationsnummer", "Kontaktperson", "Telefonnummer",
    "E-postadress", "Datum", "Anteckningar (kommer ej röras av skript). Senast uppdaterad " + new Date().toLocaleString("se"),
  ]]).setFontWeight("bold");

  sheet.getRange(2, 1, data.length, 6).setValues(data.map(row => [
    row.name, "'" + row.organizationNumber, row.contactPerson, "'" + row.phoneNumber, row.email, row.createdAt,
  ])).setBackground('#eee');
  sheet.getRange(2 + data.length, 1, 1, 6).setBackground('orange');

  sheet.autoResizeColumns(1, 7);
}
```

Which we put on a trigger to run every so often.
 */
