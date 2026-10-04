import { useEffect, useMemo, useRef, useState } from "react";
import { ImageOverlay, MapContainer, Marker, useMap, useMapEvents } from "react-leaflet";
import L, { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapProp } from "@/shared/Classes";
import { addImageDetails } from "@/shared/addImageDetails";
import { FLOORS } from "./floors";
import type { FloorMapProps } from "./FloorMap";

// Width of the floor plans in svg units; markers are sized like the printed dots.
const PLAN_WIDTH = 765;
const DOT_SIZE = 30;

function markerIcon(
  e: MapProp,
  mode: "number" | "logo",
  selected: boolean,
  dimmed: boolean,
  scale: number
): DivIcon {
  // Dimmed markers are solid grey so the pink dot in the svg doesn't show through.
  const fade = dimmed ? "!bg-[#a7a9b6] !ring-white/60" : "";
  const size = Math.round(Math.min(40, Math.max(12, DOT_SIZE * scale)));
  if (mode === "logo" && e.logo && size >= 24) {
    const w = Math.round(size * 1.8);
    const h = Math.round(size * 1.15);
    return new DivIcon({
      className: "",
      iconSize: selected ? [w + 14, h + 9] : [w, h],
      html: `<div class="flex h-full w-full items-center justify-center rounded-xl bg-[#dfe1e9] p-1 shadow-md ${
        selected ? "ring-4 ring-yellow" : "ring-2 ring-cerise"
      } ${fade}"><img src="${addImageDetails(e.logo)}" alt="${e.name}" class="max-h-full max-w-full object-contain" /></div>`,
    });
  }
  // Too small to read: a plain dot, the number shows once zoomed in.
  const shown = selected ? Math.max(size, 30) + 6 : size;
  const label = shown >= 20 ? String(e.position) : "";
  return new DivIcon({
    className: "",
    iconSize: [shown, shown],
    html: `<div class="flex h-full w-full items-center justify-center rounded-full ${dimmed ? "" : "bg-cerise"} font-medium leading-none text-white shadow-md ${
      selected ? "ring-4 ring-yellow" : shown >= 20 ? "ring-2 ring-white/80" : "ring-1 ring-white/80"
    } ${fade}" style="font-size:${Math.max(11, Math.round(shown * 0.42))}px">${label}</div>`,
  });
}

type Inset = { top: number; right: number; bottom: number; left: number };

function fullInset(inset: FloorMapProps["inset"], pad: number): Inset {
  return {
    top: (inset?.top ?? 0) + pad,
    right: (inset?.right ?? 0) + pad,
    bottom: (inset?.bottom ?? 0) + pad,
    left: (inset?.left ?? 0) + pad,
  };
}

// Keeps the map inside the floor plan: zooming out stops when the whole plan
// fits, panning stops at its edges, and dragging is only on when zoomed in so
// one finger still scrolls the page on a phone.
function Controller({
  floor,
  padding,
  inset,
  selected,
  onApi,
}: Pick<FloorMapProps, "floor" | "padding" | "inset" | "selected" | "onApi">) {
  const map = useMap();
  const box = fullInset(inset, padding ?? 16);
  const boxKey = `${box.top},${box.right},${box.bottom},${box.left}`;
  // Latest insets for handlers set up once per floor.
  const boxRef = useRef(box);
  boxRef.current = box;

  const tools = useMemo(() => {
    const bounds = L.latLngBounds(FLOORS[floor].bounds);
    const fitOptions = () => ({
      paddingTopLeft: L.point(boxRef.current.left, boxRef.current.top),
      paddingBottomRight: L.point(boxRef.current.right, boxRef.current.bottom),
    });
    const fitZoom = () => {
      const b = boxRef.current;
      return map.getBoundsZoom(bounds, false, L.point(b.left + b.right, b.top + b.bottom));
    };
    // Panning stops when the plan's edge reaches the edge of the free area,
    // so nothing ends up hidden under panels drawn on top of the map.
    const limitPan = () => {
      const b = boxRef.current;
      const z = map.getZoom();
      const sw = map.project(bounds.getSouthWest(), z).add(L.point(-b.left, b.bottom));
      const ne = map.project(bounds.getNorthEast(), z).add(L.point(b.right, -b.top));
      map.setMaxBounds(L.latLngBounds(map.unproject(sw, z), map.unproject(ne, z)));
    };
    const atMin = () => map.getZoom() <= map.getMinZoom() + 0.05;
    const syncDragging = () => {
      if (atMin()) map.dragging.disable();
      else map.dragging.enable();
    };
    // Set the zoom limits without letting Leaflet start its own zoom animation.
    const setLimits = () => {
      const z = fitZoom();
      map.options.minZoom = z;
      map.options.maxZoom = z + 3;
      map.fire("zoomlevelschange");
    };
    const fit = (animate: boolean) => {
      map.invalidateSize();
      setLimits();
      if (animate) map.flyToBounds(bounds, { ...fitOptions(), duration: 0.4 });
      else map.fitBounds(bounds, { ...fitOptions(), animate: false });
      limitPan();
    };
    // After a resize or new insets: refit when fully zoomed out, else keep the view.
    const refresh = () => {
      const wasMin = atMin();
      map.invalidateSize();
      setLimits();
      if (wasMin || map.getZoom() < map.getMinZoom()) fit(false);
      else limitPan();
    };
    return { bounds, fitOptions, limitPan, syncDragging, fit, refresh };
  }, [map, floor]);

  useEffect(() => {
    const { fit, limitPan, syncDragging, refresh, fitOptions } = tools;
    const onZoomEnd = () => {
      limitPan();
      syncDragging();
    };
    fit(false);
    syncDragging();
    map.on("zoomend", onZoomEnd);
    const observer = new ResizeObserver(refresh);
    observer.observe(map.getContainer());

    onApi?.({
      reset: () => fit(true),
      zoomIn: () => map.zoomIn(0.75),
      zoomOut: () => map.zoomOut(0.75),
      showPositions: (positions: number[]) => {
        const pts = positions
          .map((p) => FLOORS[floor].positions[p])
          .filter(Boolean);
        if (pts.length)
          map.flyToBounds(L.latLngBounds(pts).pad(0.35), {
            ...fitOptions(),
            maxZoom: map.getMinZoom() + 2,
            duration: 0.4,
          });
      },
    });

    return () => {
      map.off("zoomend", onZoomEnd);
      observer.disconnect();
    };
  }, [tools]);

  // Panels opening or closing change the free area.
  useEffect(() => {
    tools.refresh();
    tools.syncDragging();
  }, [tools, boxKey]);

  // Move to the selected company's dot when it's on this floor.
  useEffect(() => {
    const pos = FLOORS[floor].positions[selected ?? 0];
    if (!pos) return;
    const b = boxRef.current;
    const zoom = Math.max(map.getZoom(), map.getMinZoom() + 1.25);
    // Offset so the dot lands in the middle of the area not covered by panels.
    const shift = L.point((b.left - b.right) / 2, (b.top - b.bottom) / 2);
    const target = map.unproject(map.project(pos, zoom).subtract(shift), zoom);
    map.flyTo(target, zoom, { duration: 0.4 });
  }, [map, floor, selected]);

  return null;
}

function Markers({
  floor,
  markers,
  dimmedSet,
  selected,
  onSelect,
  markerMode,
}: Pick<FloorMapProps, "floor" | "markers" | "selected" | "onSelect"> & {
  dimmedSet: Set<number>;
  markerMode: "number" | "logo";
}) {
  const map = useMap();
  const plan = FLOORS[floor];
  const measure = () => {
    const b = L.latLngBounds(plan.bounds);
    const z = map.getZoom();
    return (map.project(b.getNorthEast(), z).x - map.project(b.getSouthWest(), z).x) / PLAN_WIDTH;
  };
  const [scale, setScale] = useState(measure);
  useMapEvents({ zoomend: () => setScale(measure()), resize: () => setScale(measure()) });
  // The first fit can happen before the events above are registered.
  useEffect(() => setScale(measure()), []);
  const bucket = Math.round(scale * 20) / 20;

  return (
    <>
      {markers
        .filter((e) => e.floor === floor && plan.positions[e.position])
        .map((e) => {
          const isSelected = selected === e.position;
          const isDimmed = dimmedSet.has(e.position);
          return (
            <Marker
              key={`${e.position}-${markerMode}-${isSelected}-${isDimmed}-${bucket}`}
              position={plan.positions[e.position]}
              icon={markerIcon(e, markerMode, isSelected, isDimmed, bucket)}
              title={`${e.position} ${e.name}`}
              zIndexOffset={isSelected ? 1000 : 0}
              eventHandlers={{ click: () => onSelect(e.position) }}
            />
          );
        })}
    </>
  );
}

export default function FloorMapInner(props: FloorMapProps) {
  const {
    floor,
    markers,
    dimmed,
    selected,
    onSelect,
    markerMode = "number",
    wheelZoom = true,
    className = "",
  } = props;
  const plan = FLOORS[floor];
  const dimmedSet = useMemo(() => new Set(dimmed ?? []), [dimmed]);

  return (
    <MapContainer
      key={floor}
      center={[0, 0]}
      zoom={8}
      zoomSnap={0}
      zoomDelta={0.75}
      maxBoundsViscosity={1}
      bounceAtZoomLimits={false}
      scrollWheelZoom={wheelZoom}
      zoomControl={false}
      attributionControl={false}
      className={`!bg-[#dfe1e9] ${className}`}
      style={{ height: "100%", width: "100%" }}
    >
      <Controller {...props} />
      <ImageOverlay url={plan.image} bounds={plan.bounds} />
      <Markers
        floor={floor}
        markers={markers}
        dimmedSet={dimmedSet}
        selected={selected}
        onSelect={onSelect}
        markerMode={markerMode}
      />
    </MapContainer>
  );
}
