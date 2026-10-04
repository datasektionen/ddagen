import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/locales";
import { MapProp } from "@/shared/Classes";
import { loadMapData } from "@/components/MapMockups/data";
import FloorMap from "@/components/MapMockups/FloorMap";
import { useMapState } from "@/components/MapMockups/useMapState";
import {
  AppFrame,
  CompanyModal,
  FilterButton,
  FilterFields,
  FloorSwitch,
  MapControls,
  MockupSeo,
  NumberedCard,
  SearchInput,
  mockText,
  useIsDesktop,
} from "@/components/MapMockups/ui";

export const getServerSideProps = loadMapData;

// Mockup 4 — Logo carousel. Gives exhibitors visibility: their logos sit on
// the map, and a swipeable row of /logos cards runs along the bottom. Swiping
// the row moves the map to that company; tapping a dot scrolls the row.

export default function Mockup4({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const text = mockText(t);
  const state = useMapState(exhibitorData);
  const desktop = useIsDesktop();
  const [showFilters, setShowFilters] = useState(false);
  const [logos, setLogos] = useState(true);

  const rowRef = useRef<HTMLDivElement>(null);
  const fromSwipe = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const items = state.filtered;

  // Swipe: the card closest to the middle becomes the selected company.
  function onScroll() {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const row = rowRef.current;
      if (!row) return;
      const mid = row.scrollLeft + row.clientWidth / 2;
      let best: HTMLElement | null = null;
      row.querySelectorAll<HTMLElement>("[data-pos]").forEach((el) => {
        const c = el.offsetLeft + el.offsetWidth / 2;
        if (!best || Math.abs(c - mid) < Math.abs(best.offsetLeft + best.offsetWidth / 2 - mid)) best = el;
      });
      const pos = best ? Number((best as HTMLElement).dataset.pos) : 0;
      if (pos && pos !== state.selected) {
        fromSwipe.current = true;
        state.focus(pos);
      }
    }, 140);
  }

  // Tapping a dot (or searching) scrolls the row to the selected card.
  useEffect(() => {
    if (fromSwipe.current) {
      fromSwipe.current = false;
      return;
    }
    const el = rowRef.current?.querySelector<HTMLElement>(`[data-pos="${state.selected}"]`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [state.selected]);

  function step(dir: 1 | -1) {
    const i = items.findIndex((e) => e.position === state.selected);
    const next = items[Math.min(items.length - 1, Math.max(0, i + dir))];
    if (next) state.focus(next.position);
  }

  const rowHeight = desktop ? 236 : 214;

  return (
    <>
      <MockupSeo title="Map mockup 4 — Logo carousel" />
      <AppFrame>
        <FloorMap
          floor={state.floor}
          markers={exhibitorData}
          dimmed={exhibitorData.filter((e) => !state.filtered.includes(e)).map((e) => e.position)}
          selected={state.selected}
          onSelect={(p) => state.focus(p)}
          markerMode={logos ? "logo" : "number"}
          onApi={state.setApi}
          inset={desktop ? { top: 76, bottom: rowHeight, left: 64 } : { top: 124, bottom: rowHeight }}
        />

        {/* Top bar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[600] flex flex-col gap-2 p-3 md:flex-row md:items-start md:justify-between md:p-4">
          <div className="pointer-events-auto flex flex-col gap-2 md:w-[440px]">
            <div className="flex gap-2">
              <SearchInput t={t} value={state.search} onChange={state.setSearch} className="flex-1" />
              <FilterButton t={t} count={state.filterCount} open={showFilters} onClick={() => setShowFilters((v) => !v)} />
            </div>
            {showFilters && (
              <div className="max-h-[50vh] overflow-y-auto rounded-2xl border-2 border-cerise/60 bg-darkblue/95 p-4 backdrop-blur-sm">
                <FilterFields t={t} state={state} />
              </div>
            )}
          </div>
          <div className="pointer-events-auto flex items-center gap-2">
            <FloorSwitch t={t} floor={state.floor} setFloor={state.setFloor} counts={state.countOnFloor} />
            <button
              type="button"
              aria-pressed={logos}
              onClick={() => setLogos((v) => !v)}
              className={`h-12 rounded-full border-2 border-cerise px-4 text-sm font-medium uppercase tracking-wide ${
                logos ? "bg-cerise text-white" : "bg-darkblue/90 text-white"
              }`}
            >
              {logos ? t.map.iconButtons.logos : t.map.iconButtons.numbers}
            </button>
          </div>
        </div>

        {desktop ? (
          <MapControls t={t} api={state.api} className="absolute left-3 top-1/2 -translate-y-1/2" />
        ) : (
          <div className="absolute left-3 z-[600]" style={{ bottom: rowHeight + 8 }}>
            <MapControls t={t} api={state.api} vertical={false} />
          </div>
        )}

        {/* Card row */}
        <div className="absolute inset-x-0 bottom-0 z-[600] bg-gradient-to-t from-darkblue via-darkblue/90 to-transparent pt-6" style={{ height: rowHeight }}>
          {items.length === 0 ? (
            <p className="pt-16 text-center text-white/80">{text.noResults}</p>
          ) : (
            <div className="relative h-full">
              <div
                ref={rowRef}
                onScroll={onScroll}
                className="scrollbar-hide flex h-full snap-x snap-mandatory gap-3 overflow-x-auto px-[14vw] pb-4 md:gap-4 md:px-[calc(50%-130px)]"
              >
                {items.map((e) => (
                  <div key={e.position} data-pos={e.position} className="w-[72vw] max-w-[280px] shrink-0 snap-center md:w-[260px]">
                    <NumberedCard
                      t={t}
                      exhibitor={e}
                      selected={state.selected === e.position}
                      onOpen={() => state.focus(e.position, true)}
                      className={`transition-transform duration-200 ${state.selected === e.position ? "" : "scale-[0.94] opacity-80"}`}
                    />
                  </div>
                ))}
              </div>
              {desktop && (
                <>
                  <button type="button" aria-label="Previous" onClick={() => step(-1)} className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cerise bg-darkblue text-2xl text-white hover:bg-cerise">
                    &lsaquo;
                  </button>
                  <button type="button" aria-label="Next" onClick={() => step(1)} className="absolute right-16 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cerise bg-darkblue text-2xl text-white hover:bg-cerise">
                    &rsaquo;
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </AppFrame>
      <CompanyModal t={t} state={state} />
    </>
  );
}
