import { useState } from "react";
import fs from "fs";
import path from "path";
import { prisma } from "@/server/db";
import { useLocale } from "@/locales";
import { MapProp } from "@/shared/Classes";
import { NextSeo } from "next-seo";
import FloorMap from "@/components/Map/FloorMap";
import { useMapState } from "@/components/Map/useMapState";
import {
  AppFrame,
  CompanyModal,
  FilterButton,
  FilterFields,
  FloorSwitch,
  MapControls,
  NumberedCard,
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

  const list = (
    <div className="flex h-full flex-col">
      <div className="shrink-0">
        <div className="flex gap-2">
          <SearchInput t={t} value={state.search} onChange={state.setSearch} className="flex-1" />
          <FilterButton t={t} count={state.filterCount} open={showFilters} onClick={() => setShowFilters((v) => !v)} />
        </div>
        {showFilters && (
          <div className="mt-3 max-h-[40vh] overflow-y-auto rounded-2xl border-2 border-cerise/60 bg-black/40 p-4">
            <FilterFields t={t} state={state} />
          </div>
        )}
        <p className="mb-3 mt-3 text-sm text-white/70" aria-live="polite">
          {state.filtered.length} {text.results}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto rounded-xl border-4 border-cerise bg-white/5 p-3 md:p-4">
        {state.filtered.length === 0 ? (
          <p className="py-10 text-center text-white/70">{text.noResults}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-3">
            {state.filtered.map((e) => (
              <NumberedCard key={e.position} t={t} exhibitor={e} selected={state.selected === e.position} onOpen={() => state.focus(e.position, true)} />
            ))}
          </div>
        )}
      </div>
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
        onSelect={(p) => state.focus(p, true)}
        markerMode={logos ? "logo" : "number"}
        onApi={state.setApi}
        padding={12}
        inset={{ top: 60, bottom: 60 }}
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
      <MapControls t={t} api={state.api} vertical={false} className="absolute bottom-3 left-3" />
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

function readExhibitorList() {
  return fs
    .readFileSync(EXHIBITOR_LIST, "utf8")
    .split("\n")
    .map((line) => line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*([23])\s*\|$/))
    .filter((m): m is RegExpMatchArray => m !== null)
    .map((m) => ({ position: +m[1], name: m[2], floor: +m[3] as 2 | 3 }));
}

// "Nore Technology AB" and "Nore Technology", "AtlasCopco" and "Atlas Copco"
// should count as the same company.
function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+ab$/, "")
    .replace(/[^a-z0-9åäöé]/g, "");
}

export async function getServerSideProps() {
  const exhibitors = await prisma.exhibitor.findMany({
    include: {
      jobOffers: true,
    },
  }).catch((err: any) => { return [] });

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
    return candidates.length === 1 ? candidates[0][1] : undefined;
  }

  const exhibitorData: MapProp[] = readExhibitorList().map(
    ({ position, name, floor }) => {
      const exhibitor = findExhibitor(name);
      if (!exhibitor && exhibitors.length > 0)
        console.warn(`karta: no exhibitor in the database matches "${name}" (${position})`);

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

  return {
    props: {
      exhibitorData,
    },
  };
}
