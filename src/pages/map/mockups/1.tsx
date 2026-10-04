import { useState } from "react";
import { useLocale } from "@/locales";
import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { loadMapData } from "@/components/MapMockups/data";
import FloorMap from "@/components/MapMockups/FloorMap";
import { useMapState, type MapState } from "@/components/MapMockups/useMapState";
import {
  CompanyModal,
  FilterButton,
  FilterFields,
  FloorSwitch,
  MapControls,
  MockupSeo,
  NumberBadge,
  NumberedCard,
  SearchInput,
  mockText,
  AppFrame,
  useIsDesktop,
} from "@/components/MapMockups/ui";

export const getServerSideProps = loadMapData;

// Mockup 1 — Search first. For the first-time visitor who wants one company:
// the map fills the screen, search floats on top, matches light up on the map.

function ResultRow({ t, e, state }: { t: Locale; e: MapProp; state: MapState }) {
  const text = mockText(t);
  return (
    <button
      type="button"
      onClick={() => state.focus(e.position)}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-white/10 ${
        state.selected === e.position ? "bg-white/10" : ""
      }`}
    >
      <NumberBadge position={e.position} selected={state.selected === e.position} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-white">{e.name}</span>
        {e.industry && <span className="block truncate text-xs text-white/60">{e.industry}</span>}
      </span>
      <span className="shrink-0 text-xs uppercase tracking-wide text-white/50">
        {text.floor(e.floor)}
      </span>
    </button>
  );
}

function Results({ t, state }: { t: Locale; state: MapState }) {
  const text = mockText(t);
  return (
    <div>
      <p className="px-3 pb-2 text-sm text-white/70" aria-live="polite">
        {state.filtered.length} {text.results}
      </p>
      {state.filtered.length === 0 ? (
        <p className="px-3 py-6 text-center text-white/70">{text.noResults}</p>
      ) : (
        state.filtered.map((e) => <ResultRow key={e.position} t={t} e={e} state={state} />)
      )}
    </div>
  );
}

export default function Mockup1({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const state = useMapState(exhibitorData);
  const [showFilters, setShowFilters] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const desktop = useIsDesktop();

  const searching = state.search.trim() !== "" || state.filterCount > 0;
  const dimmed = searching
    ? exhibitorData.filter((e) => !state.filtered.includes(e)).map((e) => e.position)
    : [];

  function pick(position: number) {
    state.focus(position);
    setShowResults(false);
    setShowFilters(false);
  }
  const pickState = { ...state, focus: pick };

  return (
    <>
      <MockupSeo title="Map mockup 1 — Search first" />
      <AppFrame>
        <FloorMap
          floor={state.floor}
          markers={exhibitorData}
          dimmed={dimmed}
          selected={state.selected}
          onSelect={(p) => {
            state.focus(p);
            setShowResults(false);
          }}
          onApi={state.setApi}
          padding={16}
          inset={
            desktop
              ? { left: 396, right: 72, top: 64, bottom: state.selectedExhibitor ? 0 : 0 }
              : { top: 128, bottom: state.selectedExhibitor ? 200 : 64 }
          }
        />

        {/* Mobile: search on top, results drop down over the map */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[600] flex flex-col gap-2 p-3 md:hidden">
          <div className="pointer-events-auto flex gap-2">
            <SearchInput
              t={t}
              value={state.search}
              onChange={(v) => {
                state.setSearch(v);
                setShowResults(true);
              }}
              className="flex-1"
            />
            <FilterButton
              t={t}
              count={state.filterCount}
              open={showFilters}
              onClick={() => setShowFilters((v) => !v)}
            />
          </div>
          {(showResults && searching) || showFilters ? (
            <div className="pointer-events-auto max-h-[55vh] overflow-y-auto rounded-2xl border-2 border-cerise/60 bg-darkblue/95 p-2 backdrop-blur-sm">
              {showFilters ? (
                <div className="p-3">
                  <FilterFields t={t} state={state} />
                </div>
              ) : (
                <Results t={t} state={pickState} />
              )}
            </div>
          ) : (
            <FloorSwitch
              t={t}
              floor={state.floor}
              setFloor={state.setFloor}
              counts={searching ? state.countOnFloor : undefined}
              className="pointer-events-auto self-start"
            />
          )}
        </div>

        {/* Desktop: floating panel on the left */}
        <aside className="absolute bottom-4 left-4 top-4 z-[600] hidden w-[380px] flex-col overflow-hidden rounded-2xl border-2 border-cerise bg-darkblue/95 backdrop-blur-sm md:flex">
          <div className="flex flex-col gap-3 border-b border-white/10 p-4">
            <h1 className="text-3xl font-medium uppercase text-cerise">{t.map.header}</h1>
            <div className="flex gap-2">
              <SearchInput t={t} value={state.search} onChange={state.setSearch} className="flex-1" />
              <FilterButton
                t={t}
                count={state.filterCount}
                open={showFilters}
                onClick={() => setShowFilters((v) => !v)}
              />
            </div>
            {showFilters && (
              <div className="max-h-[40vh] overflow-y-auto rounded-xl bg-black/30 p-4">
                <FilterFields t={t} state={state} />
              </div>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <Results t={t} state={state} />
          </div>
        </aside>

        <FloorSwitch
          t={t}
          floor={state.floor}
          setFloor={state.setFloor}
          counts={searching ? state.countOnFloor : undefined}
          className="absolute right-4 top-4 z-[600] hidden md:inline-flex"
        />
        <MapControls t={t} api={state.api} vertical={desktop}
          className={`absolute ${
            desktop ? "right-4 top-24" : state.selectedExhibitor ? "bottom-[212px] left-3" : "bottom-3 left-3"
          }`} />

        {/* Selected company: the /logos card, bottom of the screen */}
        {state.selectedExhibitor && (
          <div className="absolute inset-x-3 bottom-3 z-[600] md:inset-x-auto md:bottom-4 md:right-20 md:w-80">
            <button
              type="button"
              aria-label={mockText(t).close}
              onClick={() => state.setSelected(0)}
              className="absolute -top-3 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-darkblue text-white"
            >
              &times;
            </button>
            <NumberedCard
              t={t}
              exhibitor={state.selectedExhibitor}
              selected
              onOpen={() => state.setModalOpen(true)}
              className="[&>button]:min-h-[140px] [&>button]:shadow-xl"
            />
          </div>
        )}
      </AppFrame>
      <CompanyModal t={t} state={state} />
    </>
  );
}
