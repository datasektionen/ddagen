import Locale from "@/locales";

export function validateOrganizationNumber(value: string): { value: string } | { error: keyof Locale["error"] } {
  const digits = value
    .split("")
    .filter(c => !"- ".includes(c));
  if (digits.length !== 10) {
    return { error: "invalidOrganizationNumberLength" };
  }
  let checksum = digits
    .map(c => parseInt(c))
    .map((x, i) => (i % 2 > 0 ? x : x < 5 ? x * 2 : x * 2 - 9))
    .reduce((a, b) => a + b, 0) % 10;
  if (checksum !== 0) {
    return { error: "invalidOrganizationNumberChecksum" };
  }
  return { value: digits.join("") };
}
