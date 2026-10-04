import { useState } from "react";
import { useLocale } from "@/locales";
import { MapProp } from "@/shared/Classes";
import { loadMapData } from "@/components/MapMockups/data";
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

export const getServerSideProps = loadMapData;

// Mockup 10 — Today's page, fixed. The skeptic's pick: keep the current
// layout people already know (list left, map right; map over list on a
// phone) and only fix what's broken: a bounded map with a reset button,
// readable dots on a phone, and the /logos cards in the list.

export default function Mockup10({ exhibitorData }: { exhibitorData: MapProp[] }) {
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
      {/* Same controls as today: Numbers/Logos and floors */}
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
