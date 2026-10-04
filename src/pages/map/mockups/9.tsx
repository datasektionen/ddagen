import { useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "@/locales";
import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { loadMapData } from "@/components/MapMockups/data";
import FloorMap from "@/components/MapMockups/FloorMap";
import { useMapState, type MapState } from "@/components/MapMockups/useMapState";
import {
  AppFrame,
  CompanyModal,
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

// Mockup 9 — Power user. Everything visible at once on desktop: filters,
// map and a sortable results table, driven from the keyboard
// (/ search, 2/3 floor, 0 reset, arrows to move, Enter to open).

type Sort = "number" | "name";

function Table({ t, state, rows, sort, setSort, rowRefs }: {
  t: Locale;
  state: MapState;
  rows: MapProp[];
  sort: Sort;
  setSort: (s: Sort) => void;
  rowRefs: React.MutableRefObject<Record<number, HTMLTableRowElement | null>>;
}) {
  const text = mockText(t);
  const th = (key: Sort, label: string) => (
    <th scope="col" aria-sort={sort === key ? "ascending" : "none"} className="py-2 text-left">
      <button type="button" onClick={() => setSort(key)} className={`text-xs font-medium uppercase tracking-wider ${sort === key ? "text-cerise" : "text-white/60 hover:text-white"}`}>
        {label} {sort === key && "↓"}
      </button>
    </th>
  );
  if (!rows.length) return <p className="py-10 text-center text-white/70">{text.noResults}</p>;
  return (
    <table className="w-full border-collapse text-sm">
      <thead className="sticky top-0 bg-darkblue">
        <tr className="border-b border-white/15">
          {th("number", "#")}
          {th("name", t.locale === "sv" ? "Företag" : "Company")}
          <th scope="col" className="py-2 text-right text-xs font-medium uppercase tracking-wider text-white/60">
            {t.locale === "sv" ? "Plan" : "Floor"}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((e) => {
          const on = state.selected === e.position;
          return (
            <tr
              key={e.position}
              ref={(el) => (rowRefs.current[e.position] = el)}
              onClick={() => state.focus(e.position)}
              onDoubleClick={() => state.focus(e.position, true)}
              aria-selected={on}
              className={`cursor-pointer border-b border-white/5 ${on ? "bg-cerise/25" : "hover:bg-white/5"}`}
            >
              <td className="w-12 py-1.5">
                <NumberBadge position={e.position} selected={on} className="!h-7 !w-7 !text-xs" />
              </td>
              <td className="py-1.5 pr-2 text-white">
                <span className="block truncate">{e.name}</span>
                {e.industry && <span className="block truncate text-xs text-white/50">{e.industry}</span>}
              </td>
              <td className="py-1.5 text-right text-white/70">{e.floor}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="rounded border border-white/30 bg-white/10 px-1.5 py-0.5 font-sans text-[11px] text-white">{children}</kbd>;
}

export default function Mockup9({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const text = mockText(t);
  const state = useMapState(exhibitorData);
  const desktop = useIsDesktop();
  const [sort, setSort] = useState<Sort>("number");
  const [tab, setTab] = useState<"map" | "list" | "filters">("map");
  const searchRef = useRef<HTMLInputElement>(null);
  const rowRefs = useRef<Record<number, HTMLTableRowElement | null>>({});

  const rows = useMemo(
    () =>
      [...state.filtered].sort((a, b) =>
        sort === "number" ? a.position - b.position : a.name.localeCompare(b.name, "sv")
      ),
    [state.filtered, sort]
  );

  // Keyboard shortcuts (desktop).
  useEffect(() => {
    if (!desktop) return;
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement).tagName === "INPUT";
      if (state.modalOpen) return;
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape" && typing) {
        (e.target as HTMLElement).blur();
      } else if (!typing && (e.key === "2" || e.key === "3")) {
        state.setFloor(+e.key as 2 | 3);
      } else if (!typing && e.key === "0") {
        state.api?.reset();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const i = rows.findIndex((r) => r.position === state.selected);
        const next = rows[Math.min(rows.length - 1, Math.max(0, i + (e.key === "ArrowDown" ? 1 : -1)))];
        if (next) {
          state.focus(next.position);
          rowRefs.current[next.position]?.scrollIntoView({ block: "nearest" });
        }
      } else if (e.key === "Enter" && state.selected) {
        state.setModalOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [desktop, rows, state]);

  const map = (inset: { top?: number; bottom?: number }) => (
    <FloorMap
      floor={state.floor}
      markers={exhibitorData}
      dimmed={exhibitorData.filter((e) => !state.filtered.includes(e)).map((e) => e.position)}
      selected={state.selected}
      onSelect={(p) => state.focus(p)}
      onApi={state.setApi}
      padding={12}
      inset={inset}
    />
  );

  return (
    <>
      <MockupSeo title="Map mockup 9 — Power user" />
      <AppFrame>
        {desktop ? (
          <div className="flex h-full">
            <aside className="flex w-[300px] shrink-0 flex-col gap-4 overflow-y-auto border-r-2 border-cerise p-5">
              <h1 className="text-3xl font-medium uppercase text-cerise">{t.map.header}</h1>
              <SearchInput inputRef={searchRef} t={t} value={state.search} onChange={state.setSearch} className="w-full" />
              <FilterFields t={t} state={state} />
            </aside>
            <div className="relative flex-1">
              {map({ top: 56, bottom: 48 })}
              <div className="absolute inset-x-3 top-3 z-[600] flex items-center justify-between gap-3">
                <FloorSwitch t={t} floor={state.floor} setFloor={state.setFloor} counts={state.countOnFloor} />

                <MapControls t={t} api={state.api} vertical={false} />
              </div>
              <p className="absolute bottom-3 left-3 z-[600] hidden items-center gap-1.5 whitespace-nowrap rounded-full bg-darkblue/90 px-4 py-2 text-xs text-white/80 xl:flex">
                <Kbd>/</Kbd> {t.locale === "sv" ? "sök" : "search"} <Kbd>2</Kbd><Kbd>3</Kbd> {t.locale === "sv" ? "plan" : "floor"}
                <Kbd>↑</Kbd><Kbd>↓</Kbd> {t.locale === "sv" ? "bläddra" : "browse"} <Kbd>Enter</Kbd> {t.locale === "sv" ? "öppna" : "open"} <Kbd>0</Kbd> {t.locale === "sv" ? "hela kartan" : "whole map"}
              </p>
            </div>
            <aside className="flex w-[380px] shrink-0 flex-col border-l-2 border-cerise">
              {state.selectedExhibitor ? (
                <div className="shrink-0 p-4 pb-2">
                  <NumberedCard t={t} exhibitor={state.selectedExhibitor} selected onOpen={() => state.setModalOpen(true)} className="[&>button]:min-h-[150px]" />
                </div>
              ) : (
                <p className="shrink-0 p-4 text-sm text-white/60">
                  {t.locale === "sv" ? "Välj ett företag i listan eller på kartan." : "Pick a company in the list or on the map."}
                </p>
              )}
              <p className="shrink-0 px-4 text-sm text-white/70" aria-live="polite">
                {rows.length} {text.results}
              </p>
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <Table t={t} state={state} rows={rows} sort={sort} setSort={setSort} rowRefs={rowRefs} />
              </div>
            </aside>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div role="tablist" className="grid shrink-0 grid-cols-3 gap-1 border-b-2 border-cerise p-2">
              {(["map", "list", "filters"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={tab === k}
                  onClick={() => setTab(k)}
                  className={`rounded-full py-2.5 text-sm font-medium uppercase tracking-wide ${tab === k ? "bg-cerise text-white" : "text-white"}`}
                >
                  {k === "map" ? text.map : k === "list" ? `${text.list} ${rows.length}` : `${text.filters}${state.filterCount ? ` ${state.filterCount}` : ""}`}
                </button>
              ))}
            </div>
            {tab === "map" && (
              <div className="relative flex-1">
                {map({ top: 60, bottom: state.selectedExhibitor ? 190 : 60 })}
                <div className="absolute inset-x-3 top-3 z-[600] flex justify-between">
                  <FloorSwitch t={t} floor={state.floor} setFloor={state.setFloor} counts={state.countOnFloor} />
                </div>
                <MapControls t={t} api={state.api} vertical={false} className={`absolute left-3 ${state.selectedExhibitor ? "bottom-[196px]" : "bottom-3"}`} />
                {state.selectedExhibitor && (
                  <div className="absolute inset-x-3 bottom-3 z-[600]">
                    <NumberedCard t={t} exhibitor={state.selectedExhibitor} selected onOpen={() => state.setModalOpen(true)} className="[&>button]:min-h-[170px]" />
                  </div>
                )}
              </div>
            )}
            {tab === "list" && (
              <div className="flex flex-1 flex-col overflow-hidden">
                <div className="shrink-0 p-3">
                  <SearchInput t={t} value={state.search} onChange={state.setSearch} className="w-full" />
                </div>
                <div className="flex-1 overflow-y-auto px-3 pb-4" onClick={(ev) => (ev.target as HTMLElement).closest("tr[aria-selected]") && setTab("map")}>
                  <Table t={t} state={state} rows={rows} sort={sort} setSort={setSort} rowRefs={rowRefs} />
                </div>
              </div>
            )}
            {tab === "filters" && (
              <div className="flex-1 overflow-y-auto p-4">
                <FilterFields t={t} state={state} />
              </div>
            )}
          </div>
        )}
      </AppFrame>
      <CompanyModal t={t} state={state} />
    </>
  );
}
