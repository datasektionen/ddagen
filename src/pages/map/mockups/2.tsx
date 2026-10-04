import { useEffect, useRef, useState } from "react";
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
  NumberedCard,
  SearchInput,
  mockText,
  useIsDesktop,
} from "@/components/MapMockups/ui";

export const getServerSideProps = loadMapData;

// Mockup 2 — Thumb zone. For one-handed iPhone use: everything you touch lives
// in a bottom sheet you drag between peek, half and full. The top of the
// screen is only for looking at the map.

const PEEK = 188;

function Controls({ t, state, showFilters, setShowFilters }: {
  t: Locale;
  state: MapState;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <FloorSwitch t={t} floor={state.floor} setFloor={state.setFloor} />
        <MapControls t={t} api={state.api} vertical={false} />
      </div>
      <div className="flex gap-2">
        <SearchInput t={t} value={state.search} onChange={state.setSearch} className="flex-1" />
        <FilterButton
          t={t}
          count={state.filterCount}
          open={showFilters}
          onClick={() => setShowFilters(!showFilters)}
        />
      </div>
    </div>
  );
}

function Grid({ t, state, onPick }: { t: Locale; state: MapState; onPick: (p: number) => void }) {
  const text = mockText(t);
  return (
    <>
      <p className="mb-3 text-sm text-white/70" aria-live="polite">
        {state.filtered.length} {text.results}
      </p>
      {state.filtered.length === 0 ? (
        <p className="py-10 text-center text-white/70">{text.noResults}</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {state.filtered.map((e) => (
            <NumberedCard
              key={e.position}
              t={t}
              exhibitor={e}
              selected={state.selected === e.position}
              onOpen={() => onPick(e.position)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default function Mockup2({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const state = useMapState(exhibitorData);
  const desktop = useIsDesktop();
  const [showFilters, setShowFilters] = useState(false);

  // Bottom sheet: snap heights in px, dragged by the handle.
  const frameRef = useRef<HTMLDivElement>(null);
  const [frameH, setFrameH] = useState(700);
  const [snap, setSnap] = useState(0);
  const [dragH, setDragH] = useState<number | null>(null);
  const dragStart = useRef<{ y: number; h: number } | null>(null);
  const snaps = [PEEK, Math.round(frameH * 0.55), frameH - 12];
  const sheetH = dragH ?? snaps[snap];

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setFrameH(el.clientHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [desktop]);

  function onPointerDown(e: React.PointerEvent) {
    dragStart.current = { y: e.clientY, h: sheetH };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragStart.current) return;
    const h = dragStart.current.h - (e.clientY - dragStart.current.y);
    setDragH(Math.min(frameH - 12, Math.max(PEEK, h)));
  }
  function onPointerUp() {
    if (!dragStart.current) return;
    const h = dragH ?? sheetH;
    const nearest = snaps.reduce((best, s, i) => (Math.abs(s - h) < Math.abs(snaps[best] - h) ? i : best), 0);
    // A tap on the handle steps up to the next height.
    setSnap(dragH === null ? (snap + 1) % snaps.length : nearest);
    setDragH(null);
    dragStart.current = null;
  }

  function pick(position: number) {
    state.focus(position, true);
    setSnap(0);
  }

  const map = (
    <FloorMap
      floor={state.floor}
      markers={exhibitorData}
      dimmed={exhibitorData.filter((e) => !state.filtered.includes(e)).map((e) => e.position)}
      selected={state.selected}
      onSelect={(p) => state.focus(p, true)}
      onApi={state.setApi}
      inset={desktop ? { bottom: 72 } : { bottom: Math.min(sheetH, snaps[1]) }}
    />
  );

  return (
    <>
      <MockupSeo title="Map mockup 2 — Thumb zone" />
      <AppFrame>
        {desktop ? (
          <div className="flex h-full">
            <aside className="flex w-[440px] shrink-0 flex-col border-r-2 border-cerise bg-darkblue">
              <div className="flex flex-col gap-4 p-6 pb-4">
                <h1 className="text-4xl font-medium uppercase text-cerise">{t.map.header}</h1>
                <div className="flex gap-2">
                  <SearchInput t={t} value={state.search} onChange={state.setSearch} className="flex-1" />
                  <FilterButton
                    t={t}
                    count={state.filterCount}
                    open={showFilters}
                    onClick={() => setShowFilters(!showFilters)}
                  />
                </div>
                {showFilters && (
                  <div className="rounded-2xl border-2 border-cerise/60 bg-black/40 p-5">
                    <FilterFields t={t} state={state} />
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-y-auto px-6 pb-6">
                <Grid t={t} state={state} onPick={(p) => state.focus(p, true)} />
              </div>
            </aside>
            <div className="relative flex-1">
              {map}
              {/* Bottom toolbar: the desktop version of the thumb zone */}
              <div className="absolute bottom-4 left-4 z-[600] flex items-center gap-3">
                <FloorSwitch t={t} floor={state.floor} setFloor={state.setFloor} />
                <MapControls t={t} api={state.api} vertical={false} />
              </div>
            </div>
          </div>
        ) : (
          <div ref={frameRef} className="relative h-full">
            {map}
            <section
              aria-label={mockText(t).all}
              className={`absolute inset-x-0 bottom-0 z-[600] flex flex-col rounded-t-3xl border-t-2 border-cerise bg-darkblue shadow-[0_-8px_30px_rgba(0,0,0,0.4)] ${
                dragH === null ? "transition-[height] duration-200" : ""
              }`}
              style={{ height: sheetH }}
            >
              <div
                role="button"
                tabIndex={0}
                aria-label="Resize list"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onKeyDown={(e) => e.key === "Enter" && setSnap((snap + 1) % snaps.length)}
                className="flex h-7 shrink-0 cursor-grab touch-none items-center justify-center"
              >
                <span className="h-1.5 w-12 rounded-full bg-white/40" />
              </div>
              <div className="shrink-0 px-4 pb-3">
                <Controls t={t} state={state} showFilters={showFilters} setShowFilters={(v) => {
                  setShowFilters(v);
                  if (v) setSnap(Math.max(snap, 1));
                }} />
              </div>
              <div className="flex-1 overflow-y-auto px-4 pb-6">
                {showFilters && (
                  <div className="mb-4 rounded-2xl border-2 border-cerise/60 bg-black/40 p-4">
                    <FilterFields t={t} state={state} />
                  </div>
                )}
                <Grid t={t} state={state} onPick={pick} />
              </div>
            </section>
          </div>
        )}
      </AppFrame>
      <CompanyModal t={t} state={state} />
    </>
  );
}
