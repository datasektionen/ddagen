import { useMemo, useState } from "react";
import { MapProp } from "@/shared/Classes";
import type { Floor } from "./floors";
import type { MapApi } from "./FloorMap";

export const YEARS = [0, 1, 2, 3, 4] as const;
export const OFFERS = [
  "summer",
  "internship",
  "partTime",
  "thesis",
  "fullTime",
  "trainee",
] as const;
export const INDUSTRIES = ["it", "f", "ie", "ps", "c", "er", "me", "o"] as const;

export type Offer = (typeof OFFERS)[number];
export type Industry = (typeof INDUSTRIES)[number];

function hasOffer(e: MapProp, offer: Offer) {
  switch (offer) {
    case "summer":
      return e.offers.summerJob.length > 0;
    case "internship":
      return e.offers.internship.length > 0;
    case "partTime":
      return e.offers.partTimeJob.length > 0;
    case "thesis":
      return e.offers.masterThesis;
    case "fullTime":
      return e.offers.fullTimeJob;
    case "trainee":
      return e.offers.traineeProgram;
  }
}

// Search, filters, floor, selection and modal state shared by every mockup.
// The filter rules are the same as on the real map page.
export function useMapState(exhibitorData: MapProp[]) {
  const [search, setSearch] = useState("");
  const [years, setYears] = useState<number[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [floor, setFloor] = useState<Floor>(2);
  const [selected, setSelected] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [api, setApi] = useState<MapApi | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return exhibitorData.filter((e) => {
      if (
        q &&
        !e.name.toLowerCase().includes(q) &&
        !e.industry.toLowerCase().includes(q) &&
        String(e.position) !== q
      )
        return false;
      if (
        years.length &&
        !years.some(
          (y) =>
            e.offers.summerJob.includes(y) ||
            e.offers.internship.includes(y) ||
            e.offers.partTimeJob.includes(y)
        )
      )
        return false;
      if (offers.length && !offers.some((o) => hasOffer(e, o))) return false;
      if (
        industries.length &&
        !industries.some((i) => e.industryType.toLowerCase() === i)
      )
        return false;
      return true;
    });
  }, [exhibitorData, search, years, offers, industries]);

  const byPosition = useMemo(
    () => Object.fromEntries(exhibitorData.map((e) => [e.position, e])),
    [exhibitorData]
  );

  function toggle<T>(list: T[], set: (v: T[]) => void, value: T) {
    set(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  // Select a company: switch to its floor and move the map to its dot.
  function focus(position: number, openModal = false) {
    const e = byPosition[position];
    if (!e) return;
    setFloor(e.floor);
    setSelected(position);
    if (openModal) setModalOpen(true);
  }

  return {
    search,
    setSearch,
    years,
    toggleYear: (y: number) => toggle(years, setYears, y),
    offers,
    toggleOffer: (o: Offer) => toggle(offers, setOffers, o),
    industries,
    toggleIndustry: (i: Industry) => toggle(industries, setIndustries, i),
    filterCount: years.length + offers.length + industries.length,
    clearFilters: () => {
      setYears([]);
      setOffers([]);
      setIndustries([]);
    },
    filtered,
    filteredOnFloor: filtered.filter((e) => e.floor === floor),
    countOnFloor: (f: Floor) => filtered.filter((e) => e.floor === f).length,
    byPosition,
    floor,
    setFloor,
    selected,
    setSelected,
    selectedExhibitor: byPosition[selected] as MapProp | undefined,
    focus,
    modalOpen,
    setModalOpen,
    api,
    setApi,
  };
}

export type MapState = ReturnType<typeof useMapState>;
