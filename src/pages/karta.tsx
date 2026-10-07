import { useRef, useState } from "react";
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
  // Which of SHEET_STOPS the list is at on a phone.
  const [sheet, setSheet] = useState(0);

  // Same order and layout as /logos: main sponsor on top, then by package.
  const sorted = [...state.filtered].sort(
    (a, b) =>
      tierRank(a.packageTier) - tierRank(b.packageTier) ||
      a.name.localeCompare(b.name, "sv")
  );
  const sponsors = sorted.filter((e) => e.packageTier === 3);
  const rest = sorted.filter((e) => e.packageTier !== 3);

  // Opening a company from the list also puts the list down on a phone, so
  // the map shows where it is once the card is closed.
  const openCompany = (position: number) => {
    state.focus(position, true);
    setSheet(0);
  };

  const list = (
    <div className="scrollbar-hide h-full overflow-y-auto pb-[calc(1.5rem+var(--bar,0px))] md:pr-2">
      <div className="flex flex-row items-stretch gap-3">
        <SearchInput
          t={t}
          value={state.search}
          onChange={state.setSearch}
          // On a phone, pull the list up to make room for the results.
          onFocus={() => setSheet(SHEET_STOPS.length - 1)}
          className="flex-1"
        />
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
                <SponsorHero key={e.position} t={t} exhibitor={e} onOpen={() => openCompany(e.position)} />
              ))}
            </div>
          )}
          {rest.length > 0 && (
            <div className="mt-6 grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3">
              {rest.map((e) => (
                <ExhibitorCard key={e.position} t={t} exhibitor={e} onOpen={() => openCompany(e.position)} />
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
        onSelect={(p) => {
          if (p === state.selected) return state.setModalOpen(true);
          state.focus(p);
          setSheet(0);
        }}
        // Clicking next to the dots deselects and zooms back out. On a phone
        // any tap on the map also puts the list down to give the map room.
        onMapClick={() => {
          setSheet(0);
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
          <MobileSheet map={map} list={list} stop={sheet} setStop={setSheet} />
        )}
      </AppFrame>
      <CompanyModal t={t} state={state} />
    </>
  );
}

// Phone layout: map on top, list below. The list can be dragged up and down by
// its handle and stops at one of these heights (share of the screen). The top
// stop leaves the map tall enough to still show the plan on small phones.
const SHEET_STOPS = [20, 54, 75];

function MobileSheet({
  map,
  list,
  stop,
  setStop,
}: {
  map: React.ReactNode;
  list: React.ReactNode;
  stop: number;
  setStop: (i: number) => void;
}) {
  // Height while dragging; null when resting on a stop.
  const [dragHeight, setDragHeight] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  // Only the finger that started the drag counts.
  const drag = useRef({ id: -1, y: 0, moved: 0, furthest: 0 });
  const height = dragHeight ?? SHEET_STOPS[stop];

  const onDown = (e: React.PointerEvent) => {
    if (drag.current.id !== -1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, y: e.clientY, moved: 0, furthest: 0 };
    setDragHeight(SHEET_STOPS[stop]);
  };
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerId !== drag.current.id || !box.current) return;
    const dy = e.clientY - drag.current.y;
    drag.current.moved = dy;
    drag.current.furthest = Math.max(drag.current.furthest, Math.abs(dy));
    // Stops are shares of the visible part, not of what's under the bottom bar.
    const visible = window.innerHeight - box.current.getBoundingClientRect().top;
    const h = SHEET_STOPS[stop] - (dy / visible) * 100;
    setDragHeight(Math.min(SHEET_STOPS[2], Math.max(SHEET_STOPS[0], h)));
  };
  const onUp = (e: React.PointerEvent) => {
    if (e.pointerId !== drag.current.id) return;
    const { moved, furthest } = drag.current;
    drag.current.id = -1;
    setDragHeight(null);
    if (e.type === "pointercancel") return;
    // A tap goes one stop up (or back to the middle from the top).
    if (furthest < 8) return setStop(stop === SHEET_STOPS.length - 1 ? 1 : stop + 1);
    // The browser sends a click where the finger was lifted, often on the
    // map, which would put the list down again.
    const swallow = (ev: Event) => ev.stopPropagation();
    window.addEventListener("click", swallow, { capture: true, once: true });
    setTimeout(() => window.removeEventListener("click", swallow, true), 300);
    // Otherwise the closest stop, but always at least one step for a swipe.
    const closest = SHEET_STOPS.reduce(
      (best, h, i) => (Math.abs(h - height) < Math.abs(SHEET_STOPS[best] - height) ? i : best),
      0
    );
    if (closest !== stop || Math.abs(moved) < 24) setStop(closest);
    else setStop(Math.min(SHEET_STOPS.length - 1, Math.max(0, stop + (moved < 0 ? 1 : -1))));
  };

  return (
    <div ref={box} className="flex h-full flex-col">
      <div className="min-h-0 flex-1 border-b-4 border-cerise">{map}</div>
      <div
        className={`flex shrink-0 flex-col ${dragHeight === null ? "transition-[height] duration-200" : ""}`}
        // A share of the visible height, plus the part under the browser's bar.
        style={{ height: `calc(${height / 100} * (100dvh - 5rem) + var(--bar, 0px))` }}
      >
        <div
          role="button"
          aria-label="Dra listan upp eller ner"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="flex h-10 shrink-0 cursor-grab touch-none items-center justify-center"
        >
          <div className="h-1.5 w-12 rounded-full bg-white/70" />
        </div>
        <div className="min-h-0 flex-1 px-3">{list}</div>
      </div>
    </div>
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
