import Locale from "@/locales";
import { z } from "zod";

export const validateOrganizationNumber = (t: Locale) => z.string()
  .transform((value) => value
    .split("")
    .filter(c => !"- ".includes(c))
    .join("")
  )
  .refine((digits) => digits.length === 10, t.companyForm.organizationNumberLength)
  .refine((digits) => {
    // https://sv.wikipedia.org/wiki/Luhn-algoritmen
    let checksum = digits
      .split("")
      .map(c => parseInt(c))
      .map((x, i) => (i % 2 > 0 ? x : x < 5 ? x * 2 : x * 2 - 9))
      .reduce((a, b) => a + b, 0) % 10;
    return checksum === 0;
  }, t.companyForm.organizationNumberChecksum);
