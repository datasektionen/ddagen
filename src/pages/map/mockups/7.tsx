import { useState } from "react";
import { useLocale } from "@/locales";
import { MapProp } from "@/shared/Classes";
import { loadMapData } from "@/components/MapMockups/data";
import FloorMap from "@/components/MapMockups/FloorMap";
import type { Floor } from "@/components/MapMockups/floors";
import { useMapState } from "@/components/MapMockups/useMapState";
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

// Mockup 7 — Full-bleed minimal. The map is the page. Only three things sit
// on it: a 2/3 floor switch, zoom, and one "All companies" button that opens
// search, filters and the /logos grid when you need them.

export default function Mockup7({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const text = mockText(t);
  const state = useMapState(exhibitorData);
  const desktop = useIsDesktop();
  const [listOpen, setListOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  function pick(position: number) {
    state.focus(position);
    if (!desktop) setListOpen(false);
  }

  const drawerOpen = desktop && listOpen;
  const searching = state.search.trim() !== "" || state.filterCount > 0;

  return (
    <>
      <MockupSeo title="Map mockup 7 — Full-bleed minimal" />
      <AppFrame>
        <FloorMap
          floor={state.floor}
          markers={exhibitorData}
          dimmed={searching ? exhibitorData.filter((e) => !state.filtered.includes(e)).map((e) => e.position) : []}
          selected={state.selected}
          onSelect={(p) => state.focus(p)}
          onApi={state.setApi}
          padding={20}
          inset={{
            right: drawerOpen ? 480 : 0,
            bottom: state.selectedExhibitor ? (desktop ? 0 : 200) : 72,
            left: desktop ? 64 : 0,
          }}
        />

        {/* Floor: just the number */}
        <div role="tablist" aria-label={t.map.header} className="absolute left-3 top-3 z-[600] flex flex-col gap-2 md:left-4 md:top-4">
          {([2, 3] as Floor[]).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={state.floor === f}
              aria-label={text.floor(f)}
              onClick={() => state.setFloor(f)}
              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-cerise text-lg font-medium ${
                state.floor === f ? "bg-cerise text-white" : "bg-darkblue/90 text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <MapControls
          t={t}
          api={state.api}
          className={desktop ? "absolute left-4 top-1/2 -translate-y-1/2" : "absolute right-3 top-3"}
        />

        {/* Selected company */}
        {state.selectedExhibitor && (
          <div className="absolute inset-x-3 bottom-20 z-[600] md:bottom-24 md:left-24 md:right-auto md:w-80">
            <button
              type="button"
              aria-label={text.close}
              onClick={() => state.setSelected(0)}
              className="absolute -top-3 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-darkblue text-white"
            >
              &times;
            </button>
            <NumberedCard t={t} exhibitor={state.selectedExhibitor} selected onOpen={() => state.setModalOpen(true)} className="[&>button]:min-h-[120px] [&>button]:shadow-xl" />
          </div>
        )}

        <button
          type="button"
          onClick={() => setListOpen((v) => !v)}
          aria-expanded={listOpen}
          className={`absolute bottom-4 z-[600] -translate-x-1/2 rounded-full border-2 border-cerise bg-cerise px-6 py-3 text-sm font-medium uppercase tracking-wide text-white shadow-lg ${
            drawerOpen ? "left-[calc((100%-480px)/2)]" : "left-1/2"
          }`}
        >
          {text.all} <span className="opacity-75">{state.filtered.length}</span>
        </button>

        {/* All companies: full screen on mobile, drawer on desktop */}
        {listOpen && (
          <section
            aria-label={text.all}
            className="absolute inset-0 z-[650] flex flex-col bg-darkblue md:left-auto md:w-[480px] md:border-l-2 md:border-cerise"
          >
            <div className="flex shrink-0 flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-medium uppercase text-cerise">{text.all}</h1>
                <button
                  type="button"
                  aria-label={text.close}
                  onClick={() => setListOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-lg text-white hover:border-yellow"
                >
                  &times;
                </button>
              </div>
              <div className="flex gap-2">
                <SearchInput t={t} value={state.search} onChange={state.setSearch} className="flex-1" />
                <FilterButton t={t} count={state.filterCount} open={showFilters} onClick={() => setShowFilters((v) => !v)} />
              </div>
              {showFilters && (
                <div className="max-h-[40vh] overflow-y-auto rounded-2xl border-2 border-cerise/60 bg-black/40 p-4">
                  <FilterFields t={t} state={state} />
                </div>
              )}
              <p className="text-sm text-white/70" aria-live="polite">
                {state.filtered.length} {text.results}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-6">
              {state.filtered.length === 0 ? (
                <p className="py-10 text-center text-white/70">{text.noResults}</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {state.filtered.map((e) => (
                    <NumberedCard key={e.position} t={t} exhibitor={e} selected={state.selected === e.position} onOpen={() => pick(e.position)} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </AppFrame>
      <CompanyModal t={t} state={state} />
    </>
  );
}
