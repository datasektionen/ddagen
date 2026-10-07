import { useEffect, useMemo, useRef } from "react";
import { ImageOverlay, MapContainer, Marker, SVGOverlay, useMap, useMapEvents } from "react-leaflet";
import L, { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapProp } from "@/shared/Classes";
import { addImageDetails } from "@/shared/addImageDetails";
import { FLOORS } from "./floors";
import type { FloorMapProps } from "./FloorMap";

// Width of the floor plans in svg units and the size of a printed dot in them.
const PLAN_WIDTH = 765;
const DOT_SIZE = 30;

// A finger moves a little during a tap; don't count that as a drag (default 3px).
(L.Draggable.prototype as unknown as { options: L.DraggableOptions }).options.clickTolerance = 8;

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// The selected company's dot turns into its logo (or its name when it has no
// logo), centred where the dot is.
function logoIcon(e: MapProp): DivIcon {
  const name = escapeHtml(e.name);
  const w = e.logo ? 108 : Math.min(220, Math.max(88, e.name.length * 8 + 32));
  const h = e.logo ? 68 : 42;
  const content = e.logo
    ? `<img src="${addImageDetails(e.logo)}" alt="${name}" class="object-contain" style="max-width: ${w - 16}px !important; max-height: ${h - 12}px !important" />`
    : `<span class="truncate text-sm font-medium text-darkblue">${name}</span>`;
  return new DivIcon({
    className: "",
    iconSize: [w, h],
    html: `<div class="flex h-full w-full items-center justify-center rounded-xl bg-[#dfe1e9] px-2 shadow-lg ring-4 ring-yellow">${content}</div>`,
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
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  // The pending "finish the reset" handler, dropped when a new move starts so
  // it can't snap a later selection back out.
  const finishReset = useRef<() => void>();
  const cancelReset = () => {
    if (finishReset.current) map.off("moveend", finishReset.current);
    finishReset.current = undefined;
  };

  const tools = useMemo(() => {
    const bounds = L.latLngBounds(FLOORS[floor].bounds);
    const fitOptions = () => ({
      paddingTopLeft: L.point(boxRef.current.left, boxRef.current.top),
      paddingBottomRight: L.point(boxRef.current.right, boxRef.current.bottom),
    });
    const fitZoom = () => {
      const b = boxRef.current;
      // getBoundsZoom is clamped to the current limits, which would stop the
      // map from zooming further out when it gets smaller.
      map.options.minZoom = 0;
      map.options.maxZoom = 30;
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
    // While the map is squeezed (e.g. the list on a phone pulled up) there is
    // nothing to fit into, and fitting would give a broken zoom.
    const noRoom = () => {
      const b = boxRef.current;
      const size = map.getSize();
      return size.x - b.left - b.right < 40 || size.y - b.top - b.bottom < 40;
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
      if (noRoom()) return;
      setLimits();
      if (animate) map.flyToBounds(bounds, { ...fitOptions(), duration: 0.4 });
      else map.fitBounds(bounds, { ...fitOptions(), animate: false });
      limitPan();
    };
    // Zoomed in on the selected company's dot, which lands in the middle of
    // the area not covered by panels. False when it isn't on this floor.
    const showSelected = (animate: boolean) => {
      const pos = FLOORS[floor].positions[selectedRef.current ?? 0];
      if (!pos) return false;
      const b = boxRef.current;
      const zoom = Math.max(map.getZoom(), map.getMinZoom() + 1.25);
      const shift = L.point((b.left - b.right) / 2, (b.top - b.bottom) / 2);
      const target = map.unproject(map.project(pos, zoom).subtract(shift), zoom);
      if (animate) map.flyTo(target, zoom, { duration: 0.4 });
      else map.setView(target, zoom, { animate: false });
      return true;
    };
    // After a resize or new insets: keep the selected company in view, else
    // refit when fully zoomed out, else keep the view.
    const refresh = () => {
      const wasMin = atMin();
      map.invalidateSize();
      if (noRoom()) return;
      setLimits();
      if (showSelected(false)) limitPan();
      else if (wasMin || map.getZoom() < map.getMinZoom()) fit(false);
      else limitPan();
    };
    return { bounds, fitOptions, limitPan, syncDragging, fit, refresh, showSelected };
  }, [map, floor]);

  useEffect(() => {
    const { fit, limitPan, syncDragging, refresh } = tools;
    const onZoomEnd = () => {
      limitPan();
      syncDragging();
    };
    fit(false);
    syncDragging();
    map.on("zoomend", onZoomEnd);
    // ResizeObserver also fires once on start; only react to real size changes.
    let last = `${map.getContainer().clientWidth}x${map.getContainer().clientHeight}`;
    const observer = new ResizeObserver(() => {
      const size = `${map.getContainer().clientWidth}x${map.getContainer().clientHeight}`;
      if (size === last) return;
      last = size;
      refresh();
    });
    observer.observe(map.getContainer());

    onApi?.({
      floor,
      reset: () => {
        cancelReset();
        map.stop();
        fit(true);
        // If another movement interrupts the animation, finish without it.
        finishReset.current = () => {
          finishReset.current = undefined;
          if (map.getZoom() > map.getMinZoom() + 0.05) fit(false);
        };
        map.once("moveend", finishReset.current);
      },
      zoomIn: () => map.zoomIn(0.75),
      zoomOut: () => map.zoomOut(0.75),
    });

    return () => {
      map.off("zoomend", onZoomEnd);
      observer.disconnect();
    };
  }, [tools]);

  // Smooth zoom for mouse wheels and trackpads. Leaflet's own wheel zoom
  // collects input for 40ms and then animates a step, which feels slow on a
  // trackpad, and it ignores Safari's pinch events. Here every frame zooms a
  // little around the cursor. Touch pinch is still handled by Leaflet.
  useEffect(() => {
    const el = map.getContainer();
    let pending = 0;
    let at = L.point(0, 0);
    let frame = 0;
    const apply = () => {
      frame = 0;
      const z = Math.min(map.getMaxZoom(), Math.max(map.getMinZoom(), map.getZoom() + pending));
      pending = 0;
      if (Math.abs(z - map.getZoom()) > 0.001) map.setZoomAround(at, z, { animate: false });
    };
    const zoomBy = (dz: number, clientX: number, clientY: number) => {
      const r = el.getBoundingClientRect();
      at = L.point(clientX - r.left, clientY - r.top);
      pending += dz;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      map.stop();
      const px = e.deltaMode === 1 ? e.deltaY * 33 : e.deltaMode === 2 ? e.deltaY * 400 : e.deltaY;
      // A trackpad pinch arrives as ctrl + wheel with small steps.
      const rate = e.ctrlKey ? 0.015 : 0.004;
      zoomBy(Math.max(-1, Math.min(1, -px * rate)), e.clientX, e.clientY);
    };

    // Safari on a Mac sends its own gesture events for trackpad pinch.
    type Gesture = Event & { scale: number; clientX: number; clientY: number };
    let startZoom = 0;
    const onGestureStart = (e: Event) => {
      e.preventDefault();
      map.stop();
      startZoom = map.getZoom();
    };
    const onGestureChange = (e: Event) => {
      const g = e as Gesture;
      e.preventDefault();
      pending = 0;
      zoomBy(startZoom + Math.log2(g.scale) - map.getZoom(), g.clientX, g.clientY);
    };
    const safariPinch = "GestureEvent" in window && navigator.maxTouchPoints === 0;

    el.addEventListener("wheel", onWheel, { passive: false });
    if (safariPinch) {
      el.addEventListener("gesturestart", onGestureStart);
      el.addEventListener("gesturechange", onGestureChange);
    }
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("gesturestart", onGestureStart);
      el.removeEventListener("gesturechange", onGestureChange);
    };
  }, [map]);

  // Panels opening or closing change the free area.
  useEffect(() => {
    tools.refresh();
    tools.syncDragging();
  }, [tools, boxKey]);

  // Move to the selected company's dot when it's on this floor.
  useEffect(() => {
    if (!FLOORS[floor].positions[selected ?? 0]) return;
    cancelReset();
    tools.showSelected(true);
  }, [tools, selected]);

  return null;
}

// The dots are drawn in an svg laid over the floor plan, in the plan's own
// coordinates, so they grow and shrink with it on every frame of a zoom.
function Dots({
  floor,
  markers,
  dimmedSet,
  selected,
  onSelect,
  markerMode,
}: Pick<FloorMapProps, "floor" | "markers" | "selected" | "onSelect" | "markerMode"> & {
  dimmedSet: Set<number>;
}) {
  const map = useMap();
  const plan = FLOORS[floor];
  const [[south, west], [north, east]] = plan.bounds;
  // Drawn in plan units, not lat/lng: with lat/lng the numbers would be under
  // the browser's minimum font size and get blown up over the whole map.
  const k = PLAN_WIDTH / (east - west);
  const r = DOT_SIZE / 2;
  const onFloor = markers.filter((e) => e.floor === floor && plan.positions[e.position]);
  const picked = onFloor.find((e) => e.position === selected);

  return (
    <>
      <SVGOverlay
        bounds={plan.bounds}
        attributes={{
          viewBox: `${west * k} ${-north * k} ${(east - west) * k} ${(north - south) * k}`,
          preserveAspectRatio: "none",
        }}
      >
        {onFloor
          .filter((e) => e !== picked)
          .map((e) => {
            const [y, x] = plan.positions[e.position];
            const lat = y * k;
            const lng = x * k;
            const dimmed = dimmedSet.has(e.position);
            // The main sponsor is yellow, like its card in the list.
            const sponsor = e.packageTier === 3 && !dimmed;
            const color = dimmed ? "#a7a9b6" : sponsor ? "#ffc800" : "#ee2f7b";
            // Small enough that neighbouring logos on floor 2 barely overlap.
            const w = r * 1.8;
            const h = r * 1.6;
            return (
              <g
                key={e.position}
                data-dot
                className="cursor-pointer"
                style={{ pointerEvents: "auto" }}
                onClick={() => {
                  // A drag that ends on a dot isn't a click.
                  if (!(map.dragging as L.Handler & { moved: () => boolean }).moved()) onSelect(e.position);
                }}
              >
                <title>{e.name}</title>
                {markerMode === "logo" && e.logo ? (
                  <g opacity={dimmed ? 0.4 : 1}>
                    <rect
                      x={lng - w / 2}
                      y={-lat - h / 2}
                      width={w}
                      height={h}
                      rx={r * 0.35}
                      fill="#dfe1e9"
                      stroke={color}
                      strokeWidth={r * (sponsor ? 0.2 : 0.1)}
                    />
                    <image
                      href={addImageDetails(e.logo)}
                      x={lng - w / 2 + r * 0.15}
                      y={-lat - h / 2 + r * 0.15}
                      width={w - r * 0.3}
                      height={h - r * 0.3}
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </g>
                ) : (
                  <>
                    <circle
                      cx={lng}
                      cy={-lat}
                      r={r}
                      fill={color}
                      stroke="#ffffff"
                      strokeOpacity={dimmed ? 0.6 : 0.8}
                      strokeWidth={r * 0.08}
                    />
                    <text
                      x={lng}
                      y={-lat}
                      fill={sponsor ? "#0f142d" : "#ffffff"}
                      fontSize={r * 0.84}
                      fontWeight={500}
                      textAnchor="middle"
                      dominantBaseline="central"
                      pointerEvents="none"
                    >
                      {e.position}
                    </text>
                  </>
                )}
              </g>
            );
          })}
      </SVGOverlay>
      {picked && (
        <Marker
          key={picked.position}
          position={plan.positions[picked.position]}
          icon={logoIcon(picked)}
          title={picked.name}
          zIndexOffset={1000}
          eventHandlers={{ click: () => onSelect(picked.position) }}
        />
      )}
    </>
  );
}

// Leaflet doesn't fire this for drags or clicks on the logo; clicks on the
// dots are skipped here because the dots handle those themselves.
function MapClick({ onMapClick }: Pick<FloorMapProps, "onMapClick">) {
  useMapEvents({
    click: (e) => {
      if ((e.originalEvent.target as Element).closest?.("[data-dot]")) return;
      onMapClick?.();
    },
  });
  return null;
}

export default function FloorMapInner(props: FloorMapProps) {
  const {
    floor,
    markers,
    dimmed,
    selected,
    onSelect,
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
      doubleClickZoom={false}
      scrollWheelZoom={false}
      maxBoundsViscosity={1}
      bounceAtZoomLimits={false}
      zoomControl={false}
      attributionControl={false}
      className={`!bg-[#dfe1e9] ${className}`}
      style={{ height: "100%", width: "100%" }}
    >
      <Controller {...props} />
      <MapClick onMapClick={props.onMapClick} />
      <ImageOverlay url={plan.image} bounds={plan.bounds} />
      <Dots
        floor={floor}
        markers={markers}
        dimmedSet={dimmedSet}
        selected={selected}
        onSelect={onSelect}
        markerMode={props.markerMode ?? "number"}
      />
    </MapContainer>
  );
}
