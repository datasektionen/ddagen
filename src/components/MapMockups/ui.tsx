import type Locale from "@/locales";
import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { CheckMark } from "@/components/CheckMark";
import {
  ExhibitorCard,
  ExhibitorModal,
  offerLabel,
  yearLabels,
} from "@/components/ExhibitorCard";
import { MapProp } from "@/shared/Classes";
import type { Floor } from "./floors";
import type { MapApi } from "./FloorMap";
import { INDUSTRIES, OFFERS, YEARS, type MapState } from "./useMapState";

// Short labels the site's locale files don't have yet (mockups only).
export function mockText(t: Locale) {
  const sv = t.locale === "sv";
  return {
    floor: (f: Floor) => (f === 2 ? t.map.floors.one : t.map.floors.two),
    reset: sv ? "Visa hela kartan" : "Show whole map",
    zoomIn: sv ? "Zooma in" : "Zoom in",
    zoomOut: sv ? "Zooma ut" : "Zoom out",
    map: sv ? "Karta" : "Map",
    list: sv ? "Lista" : "List",
    all: sv ? "Alla företag" : "All companies",
    showOnMap: sv ? "Visa på kartan" : "Show on map",
    moreInfo: sv ? "Mer info" : "More info",
    close: t.logos.close,
    results: t.logos.results,
    noResults: t.logos.noResults,
    filters: t.map.search.buttonTwo,
    industry: t.map.search.filterIndustry,
  };
}

export function MockupSeo({ title }: { title: string }) {
  return <NextSeo title={title} noindex nofollow />;
}

// Map number in the same style as the dots on the map.
export function NumberBadge({
  position,
  selected = false,
  className = "",
}: {
  position: number;
  selected?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-cerise text-[13px] font-medium leading-none text-white ${
        selected ? "ring-4 ring-yellow" : "ring-2 ring-white/80"
      } ${className}`}
    >
      {position}
    </span>
  );
}

export function FloorSwitch({
  t,
  floor,
  setFloor,
  counts,
  className = "",
}: {
  t: Locale;
  floor: Floor;
  setFloor: (f: Floor) => void;
  counts?: (f: Floor) => number;
  className?: string;
}) {
  const text = mockText(t);
  return (
    <div
      role="tablist"
      aria-label={t.map.header}
      className={`inline-flex rounded-full border-2 border-cerise bg-darkblue/90 p-1 backdrop-blur-sm ${className}`}
    >
      {([2, 3] as Floor[]).map((f) => (
        <button
          key={f}
          type="button"
          role="tab"
          aria-selected={floor === f}
          onClick={() => setFloor(f)}
          className={`rounded-full px-4 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${
            floor === f ? "bg-cerise text-white" : "text-white hover:bg-cerise/20"
          }`}
        >
          {text.floor(f)}
          {counts && <span className="ml-1.5 opacity-70">{counts(f)}</span>}
        </button>
      ))}
    </div>
  );
}

export function SearchInput({
  t,
  value,
  onChange,
  className = "",
  inputRef,
  id,
}: {
  t: Locale;
  value: string;
  onChange: (v: string) => void;
  className?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  id?: string;
}) {
  return (
    <input
      ref={inputRef}
      id={id}
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={t.map.search.placeHolder}
      aria-label={t.map.search.placeHolder}
      className={`box-border h-12 min-w-0 rounded-full border-2 border-cerise bg-darkblue/90 px-5 text-base text-white outline-none backdrop-blur-sm placeholder:text-white/40 focus:border-yellow ${className}`}
    />
  );
}

export function FilterButton({
  t,
  count,
  open,
  onClick,
  className = "",
}: {
  t: Locale;
  count: number;
  open: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      className={`box-border inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border-2 border-cerise px-4 text-sm font-medium uppercase tracking-wide transition-colors ${
        open || count ? "bg-cerise text-white" : "bg-darkblue/90 text-white hover:bg-cerise/20"
      } ${className}`}
    >
      {t.map.search.buttonTwo}
      {count > 0 && <span className="rounded-full bg-white/25 px-2 text-xs">{count}</span>}
    </button>
  );
}

// The /logos filter fields, plus the industry filter the map page has.
export function FilterFields({ t, state }: { t: Locale; state: MapState }) {
  const text = mockText(t);
  const yLabels = yearLabels(t);
  const industryLabels = t.exhibitorSettings.table.row1.section2.industry as Record<
    string,
    string
  >;
  const pill = (on: boolean) =>
    `rounded-lg border px-3 py-1.5 text-sm transition-colors ${
      on ? "border-cerise bg-cerise text-white" : "border-white/30 text-white hover:border-yellow"
    }`;

  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="mb-3 text-xs font-medium uppercase tracking-wider text-cerise">
          {t.map.description.offers}
        </legend>
        <div className="grid grid-cols-1 gap-2.5 xxs:grid-cols-2">
          {OFFERS.map((k) => (
            <label key={k} className="flex cursor-pointer items-center gap-3 text-sm text-white">
              <CheckMark
                name={k}
                checked={state.offers.includes(k)}
                onChange={() => state.toggleOffer(k)}
              />
              {offerLabel(t, k)}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-xs font-medium uppercase tracking-wider text-cerise">
          {t.logos.years}
        </legend>
        <div className="flex flex-wrap gap-2">
          {YEARS.map((y) => (
            <button
              key={y}
              type="button"
              aria-pressed={state.years.includes(y)}
              onClick={() => state.toggleYear(y)}
              className={pill(state.years.includes(y))}
            >
              {yLabels[y]}
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-3 text-xs font-medium uppercase tracking-wider text-cerise">
          {text.industry}
        </legend>
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((i) => (
            <button
              key={i}
              type="button"
              aria-pressed={state.industries.includes(i)}
              onClick={() => state.toggleIndustry(i)}
              className={pill(state.industries.includes(i))}
            >
              {industryLabels[i]}
            </button>
          ))}
        </div>
      </fieldset>
      {state.filterCount > 0 && (
        <button
          type="button"
          onClick={state.clearFilters}
          className="self-start text-sm text-cerise underline hover:text-yellow"
        >
          {t.logos.clear}
        </button>
      )}
    </div>
  );
}

export function MapControls({
  t,
  api,
  className = "",
  vertical = true,
}: {
  t: Locale;
  api: MapApi | null;
  className?: string;
  vertical?: boolean;
}) {
  const text = mockText(t);
  const btn =
    "flex h-11 w-11 items-center justify-center text-xl leading-none text-white hover:bg-cerise/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow";
  return (
    <div
      className={`z-[500] flex overflow-hidden rounded-full border-2 border-cerise bg-darkblue/90 backdrop-blur-sm ${
        vertical ? "flex-col" : "flex-row"
      } ${className}`}
    >
      <button type="button" aria-label={text.zoomIn} title={text.zoomIn} className={btn} onClick={() => api?.zoomIn()}>
        +
      </button>
      <button type="button" aria-label={text.zoomOut} title={text.zoomOut} className={btn} onClick={() => api?.zoomOut()}>
        &minus;
      </button>
      <button type="button" aria-label={text.reset} title={text.reset} className={btn} onClick={() => api?.reset()}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
        </svg>
      </button>
    </div>
  );
}

// Locks page scroll for full-screen map layouts (like the real map page does).
export function useLockBodyScroll(lock = true) {
  useEffect(() => {
    if (!lock) return;
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [lock]);
}

// The /logos card with the company's map number on it.
export function NumberedCard({
  t,
  exhibitor,
  selected = false,
  onOpen,
  className = "",
}: {
  t: Locale;
  exhibitor: MapProp;
  selected?: boolean;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <div className={`relative flex flex-col ${className}`}>
      <ExhibitorCard t={t} exhibitor={exhibitor} onOpen={onOpen} />
      <NumberBadge
        position={exhibitor.position}
        selected={selected}
        className="pointer-events-none absolute left-3 top-3"
      />
    </div>
  );
}

// The /logos modal for the selected company.
export function CompanyModal({ t, state }: { t: Locale; state: MapState }) {
  if (!state.modalOpen || !state.selectedExhibitor) return null;
  return (
    <ExhibitorModal
      t={t}
      exhibitor={state.selectedExhibitor}
      onClose={() => state.setModalOpen(false)}
    />
  );
}

// Full-height frame under the fixed navbar for app-style layouts. It stays in
// the page flow (so the footer can't show through the navbar) and locks page
// scroll like the real map page.
export function AppFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  useLockBodyScroll();
  return (
    <div className="relative z-10 h-[100dvh] pt-20">
      <div className={`relative isolate h-full overflow-hidden bg-darkblue ${className}`}>
        {children}
      </div>
    </div>
  );
}

// True on md screens and up. Mobile and desktop get separate layouts.
export function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}
