import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { Dispatch, useEffect, useState } from "react";
import { ImageOverlay, LayerGroup, LayersControl, MapContainer, Marker, ZoomControl } from 'react-leaflet';
import { DivIcon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const FLOOR_2_RANGE = { start: 1, end: 79 };
const FLOOR_3_RANGE = { start: 80, end: 98 };
const KTH_ENTRANCE_RANGE = { start: 99, end: 102 };

const positions: { [k: number]: [number, number] } = {
  1: [-0.46, -0.542],
  2: [-0.36, -0.52],
  3: [-0.25, -0.495],
  4: [-0.28, -0.71],
  5: [-0.21, -0.78],
  6: [-0.11, -0.74],
  7: [-0.2, -0.63],
  8: [0.07, -0.65],
  9: [0.21, -0.60],
  10: [0.2, -0.38],
  11: [0.13, -0.50],
  12: [0.22, -0.47],
  13: [0.32, -0.44],
  14: [0.3, -0.35],
  15: [0.35, -0.55],
  16: [0.11, -0.41],
  17: [0.09, -0.30],
  18: [0.2, -0.27],
  19: [0.31, -0.24],
  20: [0.55, -0.42],
  21: [0.55, -0.34],
  22: [0.55, -0.26],
  23: [0.415, -0.23],
  24: [0.4, -0.15],
  25: [0.68, -0.06],
  26: [0.68, 0.01],
  27: [0.68, 0.08],
  28: [0.68, 0.15],
  29: [0.68, 0.22],
  30: [0.68, 0.29],
  31: [0.60, 0.40],
  32: [0.50, 0.4],
  33: [0.41, 0.32],
  34: [0.41, 0.24],
  35: [0.41, 0.16],
  36: [0.52, 0.16],
  37: [0.52, 0.26],
  38: [0.58, 0.26],
  39: [0.58, 0.16],
  40: [0.1, -0.18],
  41: [0.24, -0.15],
  42: [0.32, 0],
  43: [0.32, 0.11],
  44: [0.32, 0.22],
  45: [0.22, 0.25],
  46: [0.10, 0.25],
  47: [-0.04, 0.27],
  48: [-0.04, 0.12],
  49: [-0.04, -0.03],
  50: [0.10, -0.02],
  51: [0.10, 0.1],
  52: [0.20, 0.1],
  53: [0.20, -0.02],
  54: [-0.12, -0.23],
  55: [-0.12, -0.05],
  56: [-0.12, 0.07],
  57: [-0.12, 0.19],
  58: [-0.12, 0.31],
  59: [-0.18, 0.5],
  60: [-0.24, 0.26],
  61: [-0.24, -0.14],
  62: [-0.35, -0.29],
  63: [-0.305, -0.14],
  64: [-0.305, -0.03],
  65: [-0.305, 0.13],
  66: [-0.305, 0.23],
  67: [-0.305, 0.33],
  68: [-0.35, 0.49],
  69: [-0.4, 0.3],
  70: [-0.4, 0.19],
  71: [-0.4, 0.08],
  72: [-0.4, -0.03],
  73: [-0.4, -0.14],
  74: [-0.10, 0.76],
  75: [-0.16, 0.84],
  76: [-0.27, 0.865],
  77: [-0.38, 0.89],
  78: [-0.49, 0.915],
  79: [-0.6, 0.88],
  80: [-0.22, -0.85],
  81: [-0.03, -0.88],
  82: [0.06, -0.85],
  83: [0.15, -0.82],
  84: [0.24, -0.79],
  85: [0.10, -0.53],
  86: [0, -0.555],
  87: [-0.1, -0.58],
  88: [-0.2, -0.605],
  89: [0.3, -0.15],
  90: [0.3, 0],
  91: [0.3, 0.15],
  92: [0.3, 0.3],
  93: [0.3, 0.58],
  94: [0, 0.43],
  95: [-0.08, 0.12],
  96: [-0.08, 0],
  97: [0.10, 0.06],
  98: [-1000, -1000],
  99: [-0.02, -0.65],
  100: [-0.1, -0.72],
  101: [-0.18, -0.79],
  102: [-0.18, -0.95]
};

function isValidPosition(position: unknown): position is [number, number] {
  return Array.isArray(position) && 
         position.length === 2 && 
         typeof position[0] === 'number' && 
         typeof position[1] === 'number';
}

function filterExhibitorsByFloor(exhibitors: { [k: string]: MapProp }, floorRange: { start: number, end: number }) {
  return Object.entries(exhibitors).filter(([_, exhibitor]) => {
    return exhibitor && exhibitor.position >= floorRange.start && exhibitor.position <= floorRange.end;
  });
}

const exhibitorMarker = (id: string, selected: boolean): DivIcon =>
  new DivIcon({
    html: id,
    className: `rounded-full bg-pink-600 ring ${selected ? "border-4 border-pink-500 ring-3 ring-yellow" : "ring-2 ring-pink-500"} text-white text-center content-center`,
    iconSize: selected ? [38, 38] : [30, 30]
  });

export default function Map({
    t,
    exhibitors,
    mapInView,
    selectedExhibitor,
    setSelectedExhibitor
  }: {
    t: Locale;
    exhibitors: {
      [k: string]: MapProp;
    };
    mapInView: 1 | 2 | 3;
    selectedExhibitor: number;
    setSelectedExhibitor: Dispatch<number>;
  }) {
    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
      document.body.classList.add('overflow-hidden');
      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    }, []);

    return (
      <div className="h-full w-full md:m-2 box-border backdrop-blur-sm md:border-4 md:border-pink-600 md:rounded-2xl select-none">
        <MapContainer
          center={[0, 0]}
          minZoom={8}
          zoom={9}
          maxZoom={11}
          attributionControl={false}
          className="md:rounded-xl"
          style={{height: '100%', width: '100%'}}
          zoomControl={false}
          whenReady={() => setMapReady(true)}
        >
          {mapReady && (
            <>
              <ZoomControl position="bottomleft"/>
              <LayersControl position="bottomright" collapsed={false}>
                <LayersControl.BaseLayer checked={mapInView == 1} name="Floor 2">
                  <LayerGroup>
                    <ImageOverlay url="/img/map/floor-2.svg" bounds={[[-1, -1], [1, 1]]}/>
                    {filterExhibitorsByFloor(exhibitors, FLOOR_2_RANGE).map(([key, exhibitor]) => {
                      const position = positions[exhibitor.position];
                      
                      if (!isValidPosition(position)) {
                        console.warn(`Invalid position for exhibitor ${key}`);
                        return null;
                      }

                      return (
                        <Marker
                          key={key}
                          position={position as LatLngExpression}
                          icon={exhibitorMarker(exhibitor.position.toString(), selectedExhibitor === +key)}
                          eventHandlers={{
                            click: () => setSelectedExhibitor(+key)
                          }}
                        />
                      );
                    })}
                  </LayerGroup>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked={mapInView == 2} name="Floor 3">
                  <LayerGroup>
                    <ImageOverlay url="/img/map/floor-3.svg" bounds={[[-1, -1], [1, 1]]}/>
                    {filterExhibitorsByFloor(exhibitors, FLOOR_3_RANGE).map(([key, exhibitor]) => {
                      const position = positions[exhibitor.position];
                      
                      if (!isValidPosition(position)) {
                        console.warn(`Invalid position for exhibitor ${key}`);
                        return null;
                      }
                      
                      return (
                        <Marker
                          key={key}
                          position={position as LatLngExpression}
                          icon={exhibitorMarker(exhibitor.position.toString(), selectedExhibitor === +key)}
                          eventHandlers={{
                            click: () => setSelectedExhibitor(+key)
                          }}
                        />
                      );
                    })}
                  </LayerGroup>
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked={mapInView == 3} name="KTH Entrance">
                  <LayerGroup>
                    <ImageOverlay url="/img/map/kth-entrance.svg" bounds={[[-1, -1], [1, 1]]}/>
                    {filterExhibitorsByFloor(exhibitors, KTH_ENTRANCE_RANGE).map(([key, exhibitor]) => {
                      const position = positions[exhibitor.position];
                      
                      if (!isValidPosition(position)) {
                        console.warn(`Invalid position for exhibitor ${key}`);
                        return null;
                      }

                      return (
                        <Marker
                          key={key}
                          position={position as LatLngExpression}
                          icon={exhibitorMarker(exhibitor.position.toString(), selectedExhibitor === +key)}
                          eventHandlers={{
                            click: () => setSelectedExhibitor(+key)
                          }}
                        />
                      );
                    })}
                  </LayerGroup>
                </LayersControl.BaseLayer>
              </LayersControl>
            </>
          )}
        </MapContainer>
      </div>
    );
}