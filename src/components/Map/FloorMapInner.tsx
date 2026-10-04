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
        map.stop();
        fit(true);
        // If another movement interrupts the animation, finish without it.
        map.once("moveend", () => {
          if (map.getZoom() > map.getMinZoom() + 0.05) fit(false);
        });
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

// The dots are drawn in an svg laid over the floor plan, in the plan's own
// coordinates, so they grow and shrink with it on every frame of a zoom.
function Dots({
  floor,
  markers,
  dimmedSet,
  selected,
  onSelect,
}: Pick<FloorMapProps, "floor" | "markers" | "selected" | "onSelect"> & {
  dimmedSet: Set<number>;
}) {
  const map = useMap();
  const plan = FLOORS[floor];
  const [[south, west], [north, east]] = plan.bounds;
  const r = (DOT_SIZE / 2 / PLAN_WIDTH) * (east - west);
  const onFloor = markers.filter((e) => e.floor === floor && plan.positions[e.position]);
  const picked = onFloor.find((e) => e.position === selected);

  return (
    <>
      <SVGOverlay
        bounds={plan.bounds}
        attributes={{
          viewBox: `${west} ${-north} ${east - west} ${north - south}`,
          preserveAspectRatio: "none",
        }}
      >
        {onFloor
          .filter((e) => e !== picked)
          .map((e) => {
            const [lat, lng] = plan.positions[e.position];
            // Dimmed dots are solid grey so the pink dot in the plan doesn't show through.
            const dimmed = dimmedSet.has(e.position);
            return (
              <circle
                key={e.position}
                data-dot
                cx={lng}
                cy={-lat}
                r={r}
                fill={dimmed ? "#a7a9b6" : "#ee2f7b"}
                stroke="#ffffff"
                strokeOpacity={dimmed ? 0.6 : 0.8}
                strokeWidth={r * 0.08}
                className="cursor-pointer"
                style={{ pointerEvents: "auto" }}
                onClick={() => {
                  // A drag that ends on a dot isn't a click.
                  if (!(map.dragging as L.Handler & { moved: () => boolean }).moved()) onSelect(e.position);
                }}
              >
                <title>{e.name}</title>
              </circle>
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
      />
    </MapContainer>
  );
}
