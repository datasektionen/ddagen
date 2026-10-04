import { useState } from "react";
import { useLocale } from "@/locales";
import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { loadMapData } from "@/components/MapMockups/data";
import FloorMap from "@/components/MapMockups/FloorMap";
import { useMapState, type MapState } from "@/components/MapMockups/useMapState";
import {
  AppFrame,
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
  useIsDesktop,
} from "@/components/MapMockups/ui";

export const getServerSideProps = loadMapData;

// Mockup 6 — Lite. Built for speed on a phone at a busy fair: a plain text
// list (no logos, no blur, no shadows) and the map code only loads when you
// open it. Logos only appear for the company you pick.

function Row({ t, e, state, onPick }: { t: Locale; e: MapProp; state: MapState; onPick: (p: number) => void }) {
  const text = mockText(t);
  const on = state.selected === e.position;
  return (
    <li>
      <button
        type="button"
        onClick={() => onPick(e.position)}
        className={`flex w-full items-center gap-3 border-b border-white/10 px-1 py-3 text-left ${on ? "bg-white/10" : ""}`}
      >
        <NumberBadge position={e.position} selected={on} />
        <span className="min-w-0 flex-1 truncate text-white">{e.name}</span>
        <span className="shrink-0 text-xs uppercase tracking-wide text-white/50">{text.floor(e.floor)}</span>
      </button>
    </li>
  );
}

function ListHeader({ t, state }: { t: Locale; state: MapState }) {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <SearchInput t={t} value={state.search} onChange={state.setSearch} className="flex-1 !bg-darkblue !backdrop-blur-none" />
        <FilterButton t={t} count={state.filterCount} open={showFilters} onClick={() => setShowFilters((v) => !v)} className="!backdrop-blur-none" />
      </div>
      {showFilters && (
        <div className="rounded-2xl border-2 border-cerise/60 bg-black/40 p-4">
          <FilterFields t={t} state={state} />
        </div>
      )}
      <p className="text-sm text-white/70" aria-live="polite">
        {state.filtered.length} {mockText(t).results}
      </p>
    </div>
  );
}

export default function Mockup6({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const text = mockText(t);
  const state = useMapState(exhibitorData);
  const desktop = useIsDesktop();
  const [mapOpen, setMapOpen] = useState(false);

  const dimmed = exhibitorData.filter((e) => !state.filtered.includes(e)).map((e) => e.position);
  const map = (inset: { top?: number; bottom?: number }) => (
    <FloorMap
      floor={state.floor}
      markers={exhibitorData}
      dimmed={dimmed}
      selected={state.selected}
      onSelect={(p) => state.focus(p)}
      onApi={state.setApi}
      inset={inset}
    />
  );

  const list = (onPick: (p: number) => void) =>
    state.filtered.length === 0 ? (
      <p className="py-10 text-center text-white/70">{text.noResults}</p>
    ) : (
      <ul>
        {state.filtered.map((e) => (
          <Row key={e.position} t={t} e={e} state={state} onPick={onPick} />
        ))}
      </ul>
    );

  return (
    <>
      <MockupSeo title="Map mockup 6 — Lite" />
      <AppFrame>
        {desktop ? (
          <div className="flex h-full">
            <aside className="flex w-[380px] shrink-0 flex-col border-r-2 border-cerise">
              <div className="p-5 pb-3">
                <h1 className="mb-4 text-3xl font-medium uppercase text-cerise">{t.map.header}</h1>
                <ListHeader t={t} state={state} />
              </div>
              {state.selectedExhibitor && (
                <div className="px-5 pb-3">
                  <NumberedCard t={t} exhibitor={state.selectedExhibitor} selected onOpen={() => state.setModalOpen(true)} className="[&>button]:min-h-[130px]" />
                </div>
              )}
              <div className="flex-1 overflow-y-auto px-5 pb-5">{list((p) => state.focus(p))}</div>
            </aside>
            <div className="relative flex-1">
              {map({ top: 64 })}
              <FloorSwitch t={t} floor={state.floor} setFloor={state.setFloor} className="absolute left-4 top-4 z-[600] !backdrop-blur-none" />
              <MapControls t={t} api={state.api} vertical={false} className="absolute right-4 top-4 !backdrop-blur-none" />
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="shrink-0 px-4 pb-2 pt-4">
              <ListHeader t={t} state={state} />
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-24">
              {list((p) => {
                state.focus(p);
                setMapOpen(true);
              })}
            </div>
            {!mapOpen && (
              <button
                type="button"
                onClick={() => setMapOpen(true)}
                className="absolute bottom-4 left-1/2 z-[600] -translate-x-1/2 rounded-full bg-cerise px-6 py-3 text-sm font-medium uppercase tracking-wide text-white"
              >
                {text.map}
              </button>
            )}

            {/* The map only mounts (and loads its code) when opened */}
            {mapOpen && (
              <div className="absolute inset-0 z-[650] flex flex-col bg-darkblue">
                <div className="flex shrink-0 items-center justify-between gap-2 p-3">
                  <FloorSwitch t={t} floor={state.floor} setFloor={state.setFloor} className="!backdrop-blur-none" />
                  <button
                    type="button"
                    onClick={() => setMapOpen(false)}
                    className="h-12 rounded-full border-2 border-cerise px-4 text-sm font-medium uppercase tracking-wide text-white"
                  >
                    {text.list}
                  </button>
                </div>
                <div className="relative flex-1">
                  {map({ bottom: state.selectedExhibitor ? 196 : 64 })}
                  <MapControls
                    t={t}
                    api={state.api}
                    vertical={false}
                    className={`absolute left-3 !backdrop-blur-none ${state.selectedExhibitor ? "bottom-[200px]" : "bottom-3"}`}
                  />
                  {state.selectedExhibitor && (
                    <div className="absolute inset-x-3 bottom-3 z-[600]">
                      <NumberedCard t={t} exhibitor={state.selectedExhibitor} selected onOpen={() => state.setModalOpen(true)} className="[&>button]:min-h-[170px]" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </AppFrame>
      <CompanyModal t={t} state={state} />
    </>
  );
}
