import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImageOverlay, LayerGroup, LayersControl, MapContainer, Marker, ZoomControl } from 'react-leaflet';
import { Control, DivIcon, DivOverlay, LatLngBoundsExpression, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import IconControl from './IconControl';
import { useMap } from 'react-leaflet';
import L from "leaflet";
import { addImageDetails } from "@/shared/addImageDetails";

// Image bounds keep each floor plan's aspect ratio (height / width of the svg).
const FLOOR_2_BOUNDS: LatLngBoundsExpression = [[-0.737, -1], [0.737, 1]];
const FLOOR_3_BOUNDS: LatLngBoundsExpression = [[-0.498, -1], [0.498, 1]];

// Marker positions on top of the dots in plan2TOM.svg / plan3TOM.svg. The
// numbers match public/downloadables/exhibitor_map/exhibitors.md.
const FLOOR_2_POSITIONS: { [k: number]: [number, number] } = {
  1: [-0.352, -0.270],
  2: [-0.395, -0.119],
  3: [-0.395, -0.019],
  4: [-0.395, 0.079],
  5: [-0.395, 0.176],
  6: [-0.394, 0.275],
  7: [-0.308, -0.107],
  8: [-0.308, -0.014],
  9: [-0.308, 0.124],
  10: [-0.308, 0.230],
  11: [-0.308, 0.337],
  12: [-0.226, -0.064],
  13: [-0.228, 0.053],
  14: [-0.226, 0.177],
  15: [-0.226, 0.294],
  16: [-0.136, -0.224],
  17: [-0.127, -0.055],
  18: [-0.124, 0.091],
  19: [-0.123, 0.236],
  20: [-0.168, 0.465],
  21: [-0.041, -0.055],
  22: [-0.044, 0.091],
  23: [-0.041, 0.234],
  24: [0.101, -0.165],
  25: [0.229, -0.148],
  26: [0.102, 0.007],
  27: [0.101, 0.081],
  28: [0.176, 0.008],
  29: [0.176, 0.081],
  30: [0.168, 0.260],
  31: [0.318, 0.013],
  32: [0.318, 0.124],
  33: [0.421, 0.166],
  34: [0.421, 0.244],
  35: [0.421, 0.324],
  36: [0.546, 0.023],
  37: [0.510, 0.089],
  38: [0.508, 0.170],
  39: [0.510, 0.258],
  40: [0.578, 0.091],
  41: [0.578, 0.170],
  42: [0.578, 0.258],
  43: [0.508, 0.402],
  44: [0.595, 0.402],
  45: [0.688, -0.063],
  46: [0.691, 0.038],
  47: [0.687, 0.138],
  48: [0.687, 0.237],
  49: [0.533, -0.439],
  50: [0.533, -0.338],
  51: [0.533, -0.236],
  52: [0.434, -0.240],
  53: [0.412, -0.157],
  54: [0.179, -0.609],
  55: [0.291, -0.572],
  56: [0.401, -0.528],
  57: [0.141, -0.455],
  58: [0.231, -0.475],
  59: [0.321, -0.455],
  60: [0.313, -0.371],
  61: [0.229, -0.388],
  62: [0.106, -0.287],
  63: [0.202, -0.272],
  64: [0.305, -0.252],
  65: [-0.294, -0.671],
  66: [-0.245, -0.779],
  67: [-0.297, -0.510],
  68: [-0.191, -0.624],
  79: [-0.142, -0.747],
  80: [0.060, -0.643],
};

const FLOOR_3_POSITIONS: { [k: number]: [number, number] } = {
  69: [-0.070, -0.342],
  70: [-0.070, -0.189],
  71: [0.083, -0.860],
  72: [0.221, -0.803],
  73: [0.126, -0.539],
  74: [0.018, -0.563],
  75: [-0.086, -0.574],
  76: [-0.219, -0.843],
  77: [-0.119, -0.906],
};


function isValidPosition(position: unknown): position is [number, number] {
  return Array.isArray(position) && 
         position.length === 2 && 
         typeof position[0] === 'number' && 
         typeof position[1] === 'number';
}

function filterExhibitorsByFloor(exhibitors: { [k: string]: MapProp }, floorPositions: { [k: number]: [number, number] }) {
  return Object.entries(exhibitors).filter(([_, exhibitor]) => {
    return exhibitor && exhibitor.position in floorPositions;
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
    const [zoomLevel, setZoomLevel] = useState(9);

    useEffect(() => {
      document.body.classList.add('overflow-hidden');
      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    }, []);

    const IconControlComponent = () => {
      const map = useMap();
      
      const handleZoom = () => {
        const zoom = map.getZoom();
        
        setZoomLevel(zoom);
      };

      const handleShowIcons = (b: boolean) => {
        // zoom in when logos should show
        if(map.getZoom() < 9){
          map.panTo([0.08,0]);
          map.setZoom(9);
        }
        setShowIcons(b);
      }
      
      useEffect(() => {
        const control = new IconControl(handleShowIcons, showIcons);
        map.addControl(control);
        
        map.on("zoom", handleZoom);
        return () => {
          map.off("zoom", handleZoom);
          map.removeControl(control);
        };
      }, [map, showIcons]);
      
      return null;
    }

    const exhibitorMarker = (exhibitor: MapProp, selected: boolean): DivIcon => {
      const id = exhibitor.position.toString();
      const size = 15 + (zoomLevel - 8) * (zoomLevel - 8) * 5;
      const showLogo = showIcons && zoomLevel >= 9 && exhibitor.logo;

      return new DivIcon({
        html: showLogo ? `
        <div class="flex justify-center items-center duration-200 ease-in"
          style="width: ${size}px; height: ${size}px">
          <img src="${addImageDetails(exhibitor.logo ?? undefined)}" alt="${id}" 
            class="w-full h-auto duration-200 ease-in" 
            style="max-width: ${size * 2}px !important; max-height: ${size}px !important"
          />
        </div>` : id, 
        className: !showLogo ? `rounded-full bg-pink-600 ring ${selected ? "border-4 border-pink-500 ring-3 ring-yellow" : "ring-2 ring-pink-500"} text-white text-center content-center` : "",
        iconSize: selected ? [38, 38] : [30, 30]
      });
    }

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
              <IconControlComponent />
              <ZoomControl position="bottomleft"/>
              <LayersControl position="bottomright" collapsed={false}>
                <LayersControl.BaseLayer checked={mapInView == 1} name="Floor 2">
                  <LayerGroup>
                    <ImageOverlay url="/downloadables/exhibitor_map/plan2TOM.svg" bounds={FLOOR_2_BOUNDS}/>
                    {filterExhibitorsByFloor(exhibitors, FLOOR_2_POSITIONS).map(([key, exhibitor]) => {
                      const position = FLOOR_2_POSITIONS[exhibitor.position];
                      
                      if (!isValidPosition(position)) {
                        console.warn(`Invalid position for exhibitor ${key}`);
                        return null;
                      }

                      return (
                        <Marker
                          key={key}
                          position={position as LatLngExpression}
                          icon={exhibitorMarker(exhibitor, selectedExhibitor === +key)}
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
                    <ImageOverlay url="/downloadables/exhibitor_map/plan3TOM.svg" bounds={FLOOR_3_BOUNDS}/>
                    {filterExhibitorsByFloor(exhibitors, FLOOR_3_POSITIONS).map(([key, exhibitor]) => {
                      const position = FLOOR_3_POSITIONS[exhibitor.position];
                      
                      if (!isValidPosition(position)) {
                        console.warn(`Invalid position for exhibitor ${key}`);
                        return null;
                      }
                      
                      return (
                        <Marker
                          key={key}
                          position={position as LatLngExpression}
                          icon={exhibitorMarker(exhibitor, selectedExhibitor === +key)}
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