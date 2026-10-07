import { useState } from "react";
import fs from "fs";
import path from "path";
import { prisma } from "@/server/db";
import { useLocale } from "@/locales";
import { MapProp } from "@/shared/Classes";
import { NextSeo } from "next-seo";
import { ExhibitorCard, SponsorHero, tierRank } from "@/components/ExhibitorCard";
import FloorMap from "@/components/Map/FloorMap";
import { useMapState } from "@/components/Map/useMapState";
import { FLOORS, type Floor } from "@/components/Map/floors";
import {
  AppFrame,
  CompanyModal,
  FilterButton,
  FilterFields,
  FloorSwitch,
  MapControls,
  SearchInput,
  mapText,
  useIsDesktop,
} from "@/components/Map/MapUI";

// List on the left and map on the right (map over list on a phone). The map
// stops at the floor plan's edges and has a button to show the whole plan.

export default function Karta({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const text = mapText(t);
  const state = useMapState(exhibitorData);
  const desktop = useIsDesktop();
  const [showFilters, setShowFilters] = useState(false);
  const [logos, setLogos] = useState(false);

  // Same order and layout as /logos: main sponsor on top, then by package.
  const sorted = [...state.filtered].sort(
    (a, b) =>
      tierRank(a.packageTier) - tierRank(b.packageTier) ||
      a.name.localeCompare(b.name, "sv")
  );
  const sponsors = sorted.filter((e) => e.packageTier === 3);
  const rest = sorted.filter((e) => e.packageTier !== 3);

  const list = (
    <div className="scrollbar-hide h-full overflow-y-auto pb-6 md:pr-2">
      <div className="flex flex-row items-stretch gap-3">
        <SearchInput t={t} value={state.search} onChange={state.setSearch} className="flex-1" />
        <FilterButton t={t} count={state.filterCount} open={showFilters} onClick={() => setShowFilters((v) => !v)} />
      </div>
      {showFilters && (
        <div className="mt-3 rounded-2xl border-2 border-cerise/60 bg-black/40 p-5 backdrop-blur-sm">
          <FilterFields t={t} state={state} />
        </div>
      )}
      <p className="mt-4 text-sm text-white/70" aria-live="polite">
        {state.filtered.length} {text.results}
      </p>
      {state.filtered.length === 0 ? (
        <p className="py-20 text-center text-white/70">{text.noResults}</p>
      ) : (
        <>
          {sponsors.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-6">
              {sponsors.map((e) => (
                <SponsorHero key={e.position} t={t} exhibitor={e} onOpen={() => state.focus(e.position, true)} />
              ))}
            </div>
          )}
          {rest.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3">
              {rest.map((e) => (
                <ExhibitorCard key={e.position} t={t} exhibitor={e} onOpen={() => state.focus(e.position, true)} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );

  const seoContent = {
    sv: {
      title: "Karta - Hitta Utställare och Lokaler",
      description: "Få en överblick över D-Dagen med vår interaktiva karta. Se alla utställare, lokaler och viktiga platser på KTH Campus Valhallavägen den 8 oktober. Planera ditt besök och hitta enkelt till alla företag och evenemang!",
      url: "https://ddagen.se/karta",
    },
    en: {
      title: "Map - Find Exhibitors and Venues",
      description: "Get an overview of D-Dagen with our interactive map. View all exhibitors, venues, and key locations at KTH Campus Valhallavägen on October 8. Plan your visit and easily find all companies and events!",
      url: "https://ddagen.se/en/karta",
    },
  };

  const { title, description, url } = seoContent[t.locale as "sv" | "en"];

  const map = (
    <div className="relative h-full overflow-hidden md:rounded-2xl md:border-4 md:border-cerise">
      <FloorMap
        floor={state.floor}
        markers={exhibitorData}
        dimmed={exhibitorData.filter((e) => !state.filtered.includes(e)).map((e) => e.position)}
        selected={state.selected}
        // First tap shows the logo on the map, tapping the logo opens the card.
        onSelect={(p) => (p === state.selected ? state.setModalOpen(true) : state.focus(p))}
        // Clicking next to the dots deselects and zooms back out.
        onMapClick={() => {
          if (!state.selected) return;
          state.setSelected(0);
          state.api?.reset();
        }}
        markerMode={logos ? "logo" : "number"}
        onApi={state.setApi}
        padding={12}
        // On a phone there are no zoom buttons at the bottom, pinch zooms instead.
        inset={{ top: 60, bottom: desktop ? 60 : 0 }}
      />
      {/* Numbers/Logos and floor switch */}
      <div className="absolute inset-x-3 top-3 z-[600] flex items-center justify-between gap-2">
        <div className="inline-flex rounded-full border-2 border-cerise bg-darkblue/90 p-1">
          {[false, true].map((on) => (
            <button
              key={String(on)}
              type="button"
              aria-pressed={logos === on}
              onClick={() => setLogos(on)}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-wide md:px-4 md:py-2 md:text-sm ${
                logos === on ? "bg-cerise text-white" : "text-white"
              }`}
            >
              {on ? t.map.iconButtons.logos : t.map.iconButtons.numbers}
            </button>
          ))}
        </div>
        <FloorSwitch t={t} floor={state.floor} setFloor={state.setFloor} className="[&>button]:px-3 [&>button]:py-1.5 [&>button]:text-xs md:[&>button]:px-4 md:[&>button]:py-2 md:[&>button]:text-sm" />
      </div>
      {desktop && (
        <MapControls t={t} api={state.api} vertical={false} className="absolute bottom-3 left-3" />
      )}
    </div>
  );

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url,
          title,
          description
        }}
        additionalMetaTags={[
          {
            name: 'robots',
            content: 'index, follow'
          }
        ]}
      />
      <AppFrame>
        {desktop ? (
          <div className="flex h-full gap-4 p-4">
            <div className="w-[45%] min-w-[420px]">{list}</div>
            <div className="flex-1">{map}</div>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="h-[46%] shrink-0 border-b-4 border-cerise">{map}</div>
            <div className="min-h-0 flex-1 p-3">{list}</div>
          </div>
        )}
      </AppFrame>
      <CompanyModal t={t} state={state} />
    </>
  );
}

// Map number -> company, maintained by hand from the printed map.
const EXHIBITOR_LIST = path.join(
  process.cwd(),
  "public/downloadables/exhibitor_map/exhibitors.md"
);

// Mistakes in the list are logged instead of silently hiding a company.
function readExhibitorList() {
  let text = "";
  try {
    text = fs.readFileSync(EXHIBITOR_LIST, "utf8");
  } catch (err) {
    console.error("karta: could not read exhibitors.md", err);
    return [];
  }
  const rows: { position: number; name: string; floor: Floor }[] = [];
  for (const line of text.split(/\r?\n/).map((l) => l.trim())) {
    if (!line.startsWith("|") || /^\|\s*(Nr|-)/.test(line)) continue;
    const m = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*([23])\s*\|$/);
    if (!m) {
      console.warn(`karta: can't read the row "${line}" in exhibitors.md`);
      continue;
    }
    const row = { position: +m[1], name: m[2], floor: +m[3] as Floor };
    if (rows.some((r) => r.position === row.position)) {
      console.warn(`karta: number ${row.position} is used twice in exhibitors.md, skipping "${row.name}"`);
      continue;
    }
    if (!FLOORS[row.floor].positions[row.position])
      console.warn(`karta: ${row.position} "${row.name}" has no dot on floor ${row.floor} in floors.ts`);
    rows.push(row);
  }
  return rows;
}

// "Nore Technology AB" and "Nore Technology", "AtlasCopco" and "Atlas Copco"
// should count as the same company.
function normalizeName(name: string) {
  return name
    .normalize("NFC")
    .toLowerCase()
    .trim()
    .replace(/\s+ab$/, "")
    .replace(/[^a-z0-9åäöéü]/g, "");
}

export async function getServerSideProps() {
  // Logos are not loaded here, the page links to /api/logo/<id> instead.
  const [exhibitors, withLogo] = await Promise.all([
    prisma.exhibitor.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        industry: true,
        industryType: true,
        packageTier: true,
        jobOffers: true,
      },
    }),
    // Only colour logos: a white logo can't be seen on the light cards.
    prisma.exhibitor.findMany({ where: { logoColor: { not: null } }, select: { id: true } }),
  ]).catch((err) => {
    console.error("karta: could not load exhibitors from the database", err);
    return [[], []] as const;
  });
  const hasLogo = new Set(withLogo.map((e) => e.id));

  const byName = Object.fromEntries(
    exhibitors.map((e) => [normalizeName(e.name), e])
  );

  // Exact name first, then a unique prefix match ("Tieto" -> "Tietoevry").
  function findExhibitor(name: string) {
    const key = normalizeName(name);
    if (byName[key]) return byName[key];
    if (key.length < 4) return undefined;
    const candidates = Object.entries(byName).filter(
      ([k]) => k.startsWith(key) || (k.length >= 4 && key.startsWith(k))
    );
    if (candidates.length !== 1) return undefined;
    console.info(`karta: "${name}" matched "${candidates[0][1].name}" by its start, check that it is the same company`);
    return candidates[0][1];
  }

  const used = new Set<string>();
  const exhibitorData: MapProp[] = readExhibitorList().map(
    ({ position, name, floor }) => {
      const exhibitor = findExhibitor(name);
      if (!exhibitor && exhibitors.length > 0)
        console.warn(`karta: no exhibitor in the database matches "${name}" (${position})`);
      if (exhibitor && used.has(exhibitor.id))
        console.warn(`karta: "${exhibitor.name}" matches more than one row in exhibitors.md (${position})`);
      if (exhibitor) used.add(exhibitor.id);

      return {
        name: exhibitor?.name ?? name,
        logo:
          exhibitor && hasLogo.has(exhibitor.id)
            ? `/api/logo/${exhibitor.id}`
            : null,
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

  return {
    props: {
      exhibitorData,
    },
  };
}
