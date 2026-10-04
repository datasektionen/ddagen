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

// Mockup 3 — Accessible, list first. The list is the main way in: real list
// semantics, an announced result count, large targets, visible focus and a
// "show on map" button on every company. The map is a second view.

const focusRing =
  "focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-darkblue";

function CompanyList({ t, state, onShow }: { t: Locale; state: MapState; onShow: (p: number) => void }) {
  const text = mockText(t);
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <label htmlFor="mock3-search" className="text-lg font-medium text-white">
          {t.map.search.placeHolder}
        </label>
        <SearchInput id="mock3-search" t={t} value={state.search} onChange={state.setSearch} className="w-full text-lg" />
        <button
          type="button"
          aria-expanded={showFilters}
          aria-controls="mock3-filters"
          onClick={() => setShowFilters((v) => !v)}
          className={`self-start rounded-full border-2 border-cerise px-5 py-2.5 text-base font-medium uppercase tracking-wide text-white hover:bg-cerise/20 ${focusRing}`}
        >
          {text.filters}
          {state.filterCount > 0 && ` (${state.filterCount})`}
        </button>
        {showFilters && (
          <div id="mock3-filters" className="rounded-2xl border-2 border-white/30 bg-black/40 p-5">
            <FilterFields t={t} state={state} />
          </div>
        )}
      </div>

      <p className="text-base text-white" role="status" aria-live="polite">
        {state.filtered.length} {text.results}
      </p>

      {state.filtered.length === 0 ? (
        <p className="py-10 text-center text-lg text-white">{text.noResults}</p>
      ) : (
        <ul id="mock3-list" className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {state.filtered.map((e) => (
            <li key={e.position} className="flex flex-col gap-2">
              <NumberedCard
                t={t}
                exhibitor={e}
                selected={state.selected === e.position}
                onOpen={() => state.focus(e.position, true)}
              />
              <button
                type="button"
                onClick={() => onShow(e.position)}
                className={`flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-white/40 px-4 text-base text-white hover:border-yellow ${focusRing}`}
              >
                {text.showOnMap}
                <span className="text-white/80">· {text.floor(e.floor)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Mockup3({ exhibitorData }: { exhibitorData: MapProp[] }) {
  const t = useLocale();
  const text = mockText(t);
  const state = useMapState(exhibitorData);
  const desktop = useIsDesktop();
  const [tab, setTab] = useState<"list" | "map">("list");

  function showOnMap(position: number) {
    state.focus(position);
    setTab("map");
  }

  const map = (
    <div className="relative h-full" aria-label={t.map.header}>
      <FloorMap
        floor={state.floor}
        markers={exhibitorData}
        dimmed={exhibitorData.filter((e) => !state.filtered.includes(e)).map((e) => e.position)}
        selected={state.selected}
        onSelect={(p) => state.focus(p, true)}
        onApi={state.setApi}
        inset={{ top: 72, bottom: 72 }}
      />
      <FloorSwitch
        t={t}
        floor={state.floor}
        setFloor={state.setFloor}
        className="absolute left-1/2 top-3 z-[600] -translate-x-1/2"
      />
      <MapControls
        t={t}
        api={state.api}
        vertical={false}
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
      />
    </div>
  );

  return (
    <>
      <MockupSeo title="Map mockup 3 — Accessible, list first" />
      <AppFrame>
        <a
          href="#mock3-list"
          className="sr-only z-[700] rounded-lg bg-yellow px-4 py-2 font-medium text-darkblue focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          {t.locale === "sv" ? "Hoppa till listan" : "Skip to the list"}
        </a>
        {desktop ? (
          <div className="flex h-full">
            <section className="w-1/2 overflow-y-auto border-r-2 border-cerise px-8 py-8 lg:px-12">
              <h1 className="mb-2 text-4xl font-medium uppercase text-cerise">{t.map.header}</h1>
              <p className="mb-6 text-lg text-white/90">
                {t.locale === "sv"
                  ? "Varje företag har ett nummer som står på kartan."
                  : "Every company has a number that is shown on the map."}
              </p>
              <CompanyList t={t} state={state} onShow={(p) => state.focus(p)} />
            </section>
            <section className="w-1/2">{map}</section>
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div role="tablist" aria-label={t.map.header} className="grid shrink-0 grid-cols-2 border-b-2 border-cerise">
              {(["list", "map"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  id={`mock3-tab-${k}`}
                  aria-selected={tab === k}
                  aria-controls={`mock3-panel-${k}`}
                  onClick={() => setTab(k)}
                  className={`min-h-[56px] text-lg font-medium uppercase tracking-wide ${
                    tab === k ? "bg-cerise text-white" : "text-white"
                  } ${focusRing}`}
                >
                  {k === "list" ? text.list : text.map}
                </button>
              ))}
            </div>
            <div
              id="mock3-panel-list"
              role="tabpanel"
              aria-labelledby="mock3-tab-list"
              hidden={tab !== "list"}
              className="flex-1 overflow-y-auto px-4 py-6"
            >
              <CompanyList t={t} state={state} onShow={showOnMap} />
            </div>
            <div
              id="mock3-panel-map"
              role="tabpanel"
              aria-labelledby="mock3-tab-map"
              hidden={tab !== "map"}
              className="relative flex-1"
            >
              {tab === "map" && map}
            </div>
          </div>
        )}
      </AppFrame>
      <CompanyModal t={t} state={state} />
    </>
  );
}
