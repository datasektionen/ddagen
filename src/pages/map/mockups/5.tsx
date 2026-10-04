import { useRef, useState } from "react";
import { useLocale } from "@/locales";
import { MapProp } from "@/shared/Classes";
import { loadMapData } from "@/components/MapMockups/data";
import FloorMap from "@/components/MapMockups/FloorMap";
import type { Floor } from "@/components/MapMockups/floors";
import { useMapState } from "@/components/MapMockups/useMapState";
import {
  CompanyModal,
  FilterButton,
  FilterFields,
  MapControls,
  MockupSeo,
  NumberedCard,
  SearchInput,
  mockText,
} from "@/components/MapMockups/ui";

export const getServerSideProps = loadMapData;

// Mockup 5 — Editorial. A normal scrolling page in the style of /logos: big
// heading, the map as a framed hero, then every company in the /logos grid
// grouped by floor. One finger scrolls the page until you zoom the map.

export default function Mockup5({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const text = mockText(t);
  const state = useMapState(exhibitorData);
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  function openCompany(position: number) {
    state.focus(position, true);
    mapRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <>
      <MockupSeo title="Map mockup 5 — Editorial" />
      <div className="mx-auto max-w-[1200px] px-4 pb-32 pt-28 sm:px-8 sm:pt-36 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-medium uppercase text-cerise sm:text-5xl">{t.map.header}</h1>
            <p className="mt-3 max-w-xl text-white/80">
              {t.locale === "sv"
                ? "Hitta företagen på plan 2 och 3. Varje företag har ett nummer på kartan."
                : "Find the companies on floors 2 and 3. Every company has a number on the map."}
            </p>
          </div>

          {/* Floor tabs as large numerals */}
          <div role="tablist" aria-label={t.map.header} className="flex gap-6">
            {([2, 3] as Floor[]).map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={state.floor === f}
                onClick={() => state.setFloor(f)}
                className={`group flex items-end gap-2 border-b-4 pb-1 transition-colors ${
                  state.floor === f ? "border-cerise text-white" : "border-transparent text-white/40 hover:text-white/70"
                }`}
              >
                <span className="text-xs font-medium uppercase tracking-[0.18em]">
                  {t.locale === "sv" ? "Plan" : "Floor"}
                </span>
                <span className="text-6xl font-medium leading-none">{f}</span>
                <span className="mb-1 text-xs text-white/60">{state.countOnFloor(f)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* The map as a framed hero */}
        <div
          ref={mapRef}
          className="relative mt-8 h-[clamp(300px,100vw,58vh)] overflow-hidden rounded-3xl border-2 border-cerise md:h-[66vh]"
        >
          <FloorMap
            floor={state.floor}
            markers={exhibitorData}
            dimmed={exhibitorData.filter((e) => !state.filtered.includes(e)).map((e) => e.position)}
            selected={state.selected}
            onSelect={(p) => state.focus(p, true)}
            onApi={state.setApi}
            wheelZoom={false}
            padding={20}
            inset={{ bottom: 56 }}
          />
          <MapControls t={t} api={state.api} vertical={false} className="absolute bottom-3 left-3" />
          <p className="pointer-events-none absolute bottom-5 right-4 z-[600] hidden text-xs text-darkblue/60 md:block">
            {t.locale === "sv" ? "Nyp eller använd + för att zooma" : "Pinch or use + to zoom"}
          </p>
        </div>

        {/* Search + filter, same as /logos */}
        <div className="mt-12 flex flex-row items-stretch gap-3">
          <SearchInput t={t} value={state.search} onChange={state.setSearch} className="flex-1 !bg-white/5" />
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

        {state.filtered.length === 0 && (
          <p className="py-20 text-center text-white/70">{text.noResults}</p>
        )}

        {([2, 3] as Floor[]).map((f) => {
          const list = state.filtered.filter((e) => e.floor === f);
          if (!list.length) return null;
          return (
            <section key={f} className="mt-10">
              <h2 className="mb-4 flex items-baseline gap-3 text-2xl font-medium uppercase text-white">
                {text.floor(f)}
                <span className="text-sm normal-case text-white/60">
                  {list.length} {text.results}
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-3">
                {list.map((e) => (
                  <NumberedCard
                    key={e.position}
                    t={t}
                    exhibitor={e}
                    selected={state.selected === e.position}
                    onOpen={() => openCompany(e.position)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
      <CompanyModal t={t} state={state} />
    </>
  );
}
