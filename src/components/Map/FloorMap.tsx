import dynamic from "next/dynamic";
import { MapProp } from "@/shared/Classes";
import type { Floor } from "./floors";

export type MapApi = {
  floor: Floor;
  reset: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
};

export type FloorMapProps = {
  floor: Floor;
  markers: MapProp[];
  dimmed?: number[];
  selected?: number;
  onSelect: (position: number) => void;
  padding?: number;
  // Space in px covered by panels drawn on top of the map.
  inset?: { top?: number; right?: number; bottom?: number; left?: number };
  onApi?: (api: MapApi) => void;
  className?: string;
};

// Leaflet needs the browser, so the map only renders client side.
const FloorMap = dynamic<FloorMapProps>(() => import("./FloorMapInner"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#dfe1e9]" />,
});

export default FloorMap;
