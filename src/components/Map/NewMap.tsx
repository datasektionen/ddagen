import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { Dispatch, useEffect, useState } from "react";
import { ImageOverlay, LayerGroup, LayersControl, MapContainer, Marker, ZoomControl } from 'react-leaflet';
import { Control, DivIcon, DivOverlay, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import IconControl from './IconControl';
import { useMap } from 'react-leaflet';

const FLOOR_2_RANGE_1 = { start: 1, end: 77 };
const FLOOR_2_RANGE_2 = { start: 91, end: 93 };
const FLOOR_3_RANGE = { start: 78, end: 90 };

const positions: { [k: number]: [number, number] } = {
  1: [-0.48, -0.730],
  2: [-0.32, -0.52],
  3: [-0.30, -0.695],
  4: [-0.255, -0.80],
  5: [-0.175, -0.768],
  6: [-0.2, -0.66],
  7: [-0.35, -0.27],
  8: [-0.42, -0.15],
  9: [-0.42, -0.05],
  10: [-0.42, 0.05],
  11: [-0.42, 0.15],
  12: [-0.42, 0.25],
  13: [-0.3, -0.1],
  14: [-0.3, 0],
  15: [-0.3, 0.15],
  16: [-0.3, 0.25],
  17: [-0.3, 0.35],
  18: [-0.22, -0.1],
  19: [-0.22, 0.1],
  20: [-0.22, 0.2],
  21: [-0.22, 0.35],
  22: [-0.13, -0.23],
  23: [-0.13, 0],
  24: [-0.13, 0.1],
  25: [-0.13, 0.2],
  26: [-0.18, 0.5],
  27: [-0.04, 0.06],
  28: [-0.04, 0.16],
  29: [-0.04, 0.26],
  30: [0.15, -0.18],
  31: [0.25, -0.15],
  32: [0.08, 0.0],
  33: [0.08, 0.1],
  34: [0.18, 0.0],
  35: [0.18, 0.1],
  36: [0.12, 0.26],
  37: [0.22, 0.26],
  38: [0.33, 0.05],
  39: [0.33, 0.17],
  40: [0.33, 0.25],
  41: [0.4, 0.17],
  42: [0.4, 0.25],
  43: [0.4, 0.33],
  44: [0.56, 0.0],
  45: [0.5, 0.05],
  46: [0.5, 0.15],
  47: [0.5, 0.25],
  48: [0.6, 0.05],
  49: [0.6, 0.15],
  50: [0.6, 0.25],
  51: [0.45, 0.4],
  52: [0.53, 0.4],
  53: [0.6, 0.4],
  54: [0.7, -0.07],
  55: [0.7, 0.01],
  56: [0.7, 0.09],
  57: [0.7, 0.17],
  58: [0.7, 0.25],
  59: [0.7, 0.33],
  60: [0.7, 0.41],
  61: [0.42, -0.2],
  62: [0.43, -0.26],
  63: [0.55, -0.42],
  64: [0.55, -0.355],
  65: [0.55, -0.29],
  66: [0.15, -0.64],
  67: [0.25, -0.60],
  68: [0.35, -0.56],
  69: [0.13, -0.50],
  70: [0.22, -0.47],
  71: [0.32, -0.44],
  72: [0.11, -0.41],
  73: [0.2, -0.38],
  74: [0.3, -0.35],
  75: [0.09, -0.30],
  76: [0.2, -0.27],
  77: [0.28, -0.25],
  78: [-0.22, -0.85],
  79: [-0.17, -0.6],
  80: [-0.07, -0.58],
  81: [0.03, -0.56],
  82: [0.13, -0.53],
  83: [0.3, -0.25],
  84: [0.3, -0.1],
  85: [0.3, 0.05],
  86: [0.3, 0.2],
  87: [0.3, 0.35],
  88: [0.3, 0.5],
  89: [-0.07, -0.4],
  90: [-0.07, -0.2],
  91: [-0.35, 0.49],
  92: [0.55, -0.23],
  93: [-0.42, 0.35],
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
    const [showIcons, setShowIcons] = useState(false);

    useEffect(() => {
      document.body.classList.add('overflow-hidden');
      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    }, []);

    /*
    const IconControlComponent = () => {
      const map = useMap();
      
      useEffect(() => {
        const control = new IconControl(setShowIcons, showIcons);
        map.addControl(control);
        
        return () => {
          map.removeControl(control);
        };
      }, [map]);
      
      return null;
    }
    */

    const exhibitorMarker = (id: string, selected: boolean): DivIcon =>
      new DivIcon({
        html: showIcons ? `
        <div className="flex max-w-full justify-center items-center">
          
          <img src="/img/exhibitors/${id}.png" alt="dkm" class="w-full h-auto" 
            onerror="this.onerror=null; this.src="/img/exhibitors/dkm.svg"  
          />
        </div>` : id,
        className: `rounded-full bg-pink-600 ring ${selected ? "border-4 border-pink-500 ring-3 ring-yellow" : "ring-2 ring-pink-500"} text-white text-center content-center`,
        iconSize: selected ? [38, 38] : [30, 30]
      });

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
              {/*<IconControlComponent />*/}
              <ZoomControl position="bottomleft"/>
              <LayersControl position="bottomright" collapsed={false}>
                <LayersControl.BaseLayer checked={mapInView == 1} name="Floor 2">
                  <LayerGroup>
                    <ImageOverlay url="/img/map/floor-2.svg" bounds={[[-1, -1], [1, 1]]}/>
                    {filterExhibitorsByFloor(exhibitors, FLOOR_2_RANGE_1).map(([key, exhibitor]) => {
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
                    {filterExhibitorsByFloor(exhibitors, FLOOR_2_RANGE_2).map(([key, exhibitor]) => {
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
              </LayersControl>
            </>
          )}
        </MapContainer>
      </div>
    );
}