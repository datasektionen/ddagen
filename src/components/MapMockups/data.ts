import fs from "fs";
import path from "path";
import { prisma } from "@/server/db";
import { MapProp } from "@/shared/Classes";

// Same data as the real map page (src/pages/karta.tsx): map number -> company
// from exhibitors.md, company info from the database. Copied so the mockups
// don't touch the real page.
const EXHIBITOR_LIST = path.join(
  process.cwd(),
  "public/downloadables/exhibitor_map/exhibitors.md"
);

function readExhibitorList() {
  return fs
    .readFileSync(EXHIBITOR_LIST, "utf8")
    .split("\n")
    .map((line) => line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*([23])\s*\|$/))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => ({ position: +m[1], name: m[2], floor: +m[3] as 2 | 3 }));
}

function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+ab$/, "")
    .replace(/[^a-z0-9åäöé]/g, "");
}

export async function loadMapData() {
  const exhibitors = await prisma.exhibitor
    .findMany({ include: { jobOffers: true } })
    .catch(() => [] as never[]);

  const byName = Object.fromEntries(
    exhibitors.map((e) => [normalizeName(e.name), e])
  );

  function findExhibitor(name: string) {
    const key = normalizeName(name);
    if (byName[key]) return byName[key];
    if (key.length < 4) return undefined;
    const candidates = Object.entries(byName).filter(
      ([k]) => k.startsWith(key) || (k.length >= 4 && key.startsWith(k))
    );
    return candidates.length === 1 ? candidates[0][1] : undefined;
  }

  const exhibitorData: MapProp[] = readExhibitorList().map(
    ({ position, name, floor }) => {
      const exhibitor = findExhibitor(name);
      return {
        name: exhibitor?.name ?? name,
        logo:
          exhibitor?.logoColor?.toString("base64") ||
          exhibitor?.logoWhite?.toString("base64") ||
          null,
        description: exhibitor?.description || "",
        industry: exhibitor?.industry || "",
        packageTier: exhibitor?.packageTier ?? -1,
        offers: {
          summerJob: exhibitor?.jobOffers?.summerJob ?? [],
          internship: exhibitor?.jobOffers?.internship ?? [],
          partTimeJob: exhibitor?.jobOffers?.partTimeJob ?? [],
          masterThesis: exhibitor?.jobOffers?.masterThesis ?? false,
          fullTimeJob: exhibitor?.jobOffers?.fullTimeJob ?? false,
          traineeProgram: exhibitor?.jobOffers?.traineeProgram ?? false,
        },
        industryType: exhibitor?.industryType || "",
        position,
        floor,
      };
    }
  );

  return { props: { exhibitorData } };
}
