import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/locales";
import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { loadMapData } from "@/components/MapMockups/data";
import FloorMap from "@/components/MapMockups/FloorMap";
import type { Floor } from "@/components/MapMockups/floors";
import { useMapState, type MapState } from "@/components/MapMockups/useMapState";
import {
  AppFrame,
  CompanyModal,
  FilterButton,
  FilterFields,
  MapControls,
  MockupSeo,
  NumberedCard,
  SearchInput,
  mockText,
  useIsDesktop,
} from "@/components/MapMockups/ui";

export const getServerSideProps = loadMapData;

// Mockup 8 — Wayfinding zones. People navigate by rooms, not numbers: the
// list is grouped by the areas printed on the plan, and picking an area flies
// the map there and dims everything else.

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// Read off the floor plan by hand for the mockup.
const ZONES: { name: string; floor: Floor; positions: number[] }[] = [
  { name: "Hyllan", floor: 2, positions: range(1, 20) },
  { name: "Nya matsalen", floor: 2, positions: range(21, 32) },
  { name: "Kårbokhandeln", floor: 2, positions: range(33, 48) },
  { name: "Bistron", floor: 2, positions: range(49, 53) },
  { name: "Gamla matsalen", floor: 2, positions: [...range(54, 64), 80] },
  { name: "Puben", floor: 2, positions: [...range(65, 68), 79] },
  { name: "Plan 3", floor: 3, positions: range(69, 77) },
];

function zoneLabel(t: Locale, name: string) {
  return name === "Plan 3" && t.locale !== "sv" ? "Floor 3" : name;
}

function ZoneChips({ t, active, counts, onPick, wrap }: {
  t: Locale;
  active: string | null;
  counts: (z: (typeof ZONES)[number]) => number;
  onPick: (name: string | null) => void;
  wrap: boolean;
}) {
  const chip = (on: boolean) =>
    `shrink-0 rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors ${
      on ? "border-cerise bg-cerise text-white" : "border-white/30 text-white hover:border-yellow"
    }`;
  return (
    <div className={`flex gap-2 ${wrap ? "flex-wrap" : "scrollbar-hide overflow-x-auto"}`}>
      <button type="button" aria-pressed={active === null} onClick={() => onPick(null)} className={chip(active === null)}>
        {mockText(t).all}
      </button>
      {ZONES.map((z) => (
        <button key={z.name} type="button" aria-pressed={active === z.name} onClick={() => onPick(z.name)} className={chip(active === z.name)}>
          {zoneLabel(t, z.name)} <span className="opacity-60">{counts(z)}</span>
        </button>
      ))}
    </div>
  );
}

function GroupedList({ t, state, active, listRef }: {
  t: Locale;
  state: MapState;
  active: string | null;
  listRef: React.RefObject<HTMLDivElement>;
}) {
  const text = mockText(t);
  const zones = ZONES.filter((z) => !active || z.name === active);
  const any = zones.some((z) => state.filtered.some((e) => z.positions.includes(e.position)));
  return (
    <div ref={listRef} className="flex-1 overflow-y-auto px-4 pb-8 md:px-6">
      {!any && <p className="py-10 text-center text-white/70">{text.noResults}</p>}
      {zones.map((z) => {
        const list = state.filtered.filter((e) => z.positions.includes(e.position));
        if (!list.length) return null;
        return (
          <section key={z.name} id={`zone-${z.name}`} className="pt-2">
            <h2 className="sticky top-0 z-10 -mx-4 mb-3 flex items-baseline justify-between bg-darkblue/95 px-4 py-2 text-lg font-medium uppercase text-cerise backdrop-blur-sm md:-mx-6 md:px-6">
              {zoneLabel(t, z.name)}
              <span className="text-xs normal-case text-white/60">
                {text.floor(z.floor)} · {list.length} {text.results}
              </span>
            </h2>
            <div className="mb-6 grid grid-cols-2 gap-3">
              {list.map((e) => (
                <NumberedCard key={e.position} t={t} exhibitor={e} selected={state.selected === e.position} onOpen={() => state.focus(e.position, true)} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default function Mockup8({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const state = useMapState(exhibitorData);
  const desktop = useIsDesktop();
  const [active, setActive] = useState<string | null>(null);
  const [pending, setPending] = useState<{ floor: Floor; positions: number[] } | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const zone = ZONES.find((z) => z.name === active);
  const dimmed = exhibitorData
    .filter((e) => !state.filtered.includes(e) || (zone && !zone.positions.includes(e.position)))
    .map((e) => e.position);

  function pickZone(name: string | null) {
    setActive(name);
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    const z = ZONES.find((x) => x.name === name);
    if (!z) {
      state.api?.reset();
      return;
    }
    state.setSelected(0);
    if (z.floor !== state.floor) state.setFloor(z.floor);
    setPending({ floor: z.floor, positions: z.positions });
  }

  // Fly once the map for the zone's floor is ready.
  useEffect(() => {
    if (!pending || !state.api || state.api.floor !== pending.floor) return;
    state.api.showPositions(pending.positions);
    setPending(null);
  }, [pending, state.api]);

  const counts = (z: (typeof ZONES)[number]) => state.filtered.filter((e) => z.positions.includes(e.position)).length;

  const search = (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <SearchInput t={t} value={state.search} onChange={state.setSearch} className="flex-1" />
        <FilterButton t={t} count={state.filterCount} open={showFilters} onClick={() => setShowFilters((v) => !v)} />
      </div>
      {showFilters && (
        <div className="max-h-[40vh] overflow-y-auto rounded-2xl border-2 border-cerise/60 bg-black/40 p-4">
          <FilterFields t={t} state={state} />
        </div>
      )}
    </div>
  );

  const map = (
    <div className="relative h-full">
      <FloorMap
        floor={state.floor}
        markers={exhibitorData}
        dimmed={dimmed}
        selected={state.selected}
        onSelect={(p) => state.focus(p, true)}
        onApi={state.setApi}
        padding={12}
        inset={{ bottom: 60 }}
      />
      <div className="absolute bottom-2 left-3 z-[600] flex items-center gap-2">
        <MapControls t={t} api={state.api} vertical={false} />
        <span className="rounded-full bg-darkblue/90 px-3 py-1.5 text-xs uppercase tracking-wide text-white">
          {mockText(t).floor(state.floor)}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <MockupSeo title="Map mockup 8 — Wayfinding zones" />
      <AppFrame>
        {desktop ? (
          <div className="flex h-full">
            <aside className="flex w-[480px] shrink-0 flex-col border-r-2 border-cerise">
              <div className="flex flex-col gap-4 p-6 pb-3">
                <h1 className="text-3xl font-medium uppercase text-cerise">{t.map.header}</h1>
                {search}
                <ZoneChips t={t} active={active} counts={counts} onPick={pickZone} wrap />
              </div>
              <GroupedList t={t} state={state} active={active} listRef={listRef} />
            </aside>
            <div className="flex-1">{map}</div>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="h-[44%] shrink-0 border-b-2 border-cerise">{map}</div>
            <div className="flex shrink-0 flex-col gap-3 px-4 pb-2 pt-3">
              {search}
              <ZoneChips t={t} active={active} counts={counts} onPick={pickZone} wrap={false} />
            </div>
            <GroupedList t={t} state={state} active={active} listRef={listRef} />
          </div>
        )}
      </AppFrame>
      <CompanyModal t={t} state={state} />
    </>
  );
}
