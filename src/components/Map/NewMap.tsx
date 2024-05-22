import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { Dispatch } from "react";
import { ImageOverlay, LayerGroup, LayersControl, MapContainer, Marker } from 'react-leaflet';
import { DivIcon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const ceriseMarker = (id: string): DivIcon =>
  new DivIcon({
    html: id,
    className: 'rounded-full bg-pink-600 text-white text-center content-center',
    iconSize: [30, 30]
  });

const positions: { [k: string]: [number, number] } = {
  '1': [-0.03, -0.05],
  '2': [-0.03, 0.06],
  '3': [-0.03, 0.17],
  '4': [0.1, -0.02],
  '5': [0.1, 0.11],
  '6': [0.12, -0.19],
  '7': [0.24, -0.16],
  '8': [0.32, 0.01],
  '9': [0.3, 0.17],
  '10': [0.22, 0.25],
  '11': [0.10, 0.25],
  '12': [0.55, 0.1],
  '13': [0.55, 0.25],
  '14': [0.67, -0.05],
  '15': [0.67, 0.06],
  '16': [0.67, 0.17],
  '17': [0.67, 0.28],
  '18': [0.67, 0.39],
  '19': [0.57, 0.40],
  '20': [0.47, 0.40],
  '21': [-0.06, 0],
};

export default function Map({
    t,
    exhibitors,
    mapInView,
    setMapInView,
    selectedExhibitor,
    setSelectedExhibitor,
  }: {
    t: Locale;
    exhibitors: {
      [k: string]: MapProp;
    };
    mapInView: 1 | 2 | 3;
    setMapInView: Dispatch<1 | 2 | 3>;
    selectedExhibitor: number;
    setSelectedExhibitor: Dispatch<number>;
  }) {
    // console.log(exhibitors);
    return (
      <div className="w-full md:m-2 box-border backdrop-blur-sm border-4 border-pink-600 rounded-2xl">
        <MapContainer
          center={[0, 0]}
          minZoom={8}
          zoom={9}
          maxZoom={11}
          attributionControl={false}
          style={{height: '84.5vh', width: '100%', borderRadius: '0.75rem'}}
        >
          <LayersControl position="bottomright" collapsed={false}>
            <LayersControl.BaseLayer checked={mapInView == 1} name="Floor 2">
              <LayerGroup>
                <ImageOverlay url="/img/map/floor-2.svg" bounds={[[-1, -1], [1, 1]]}/>
                {/* {Object.values(Object.entries(positions).slice(0, 20)).map(([key, position]: [string, [number, number]], index: number) => (
                  <Marker
                    key={index}
                    position={position}
                    icon={ceriseMarker(String(index + 1))}
                    eventHandlers={{
                      click: (e) => {
                        console.log(e, e.target);
                      },
                    }}/>
                ))} */}
                {Object.keys(exhibitors).map((key) => {
                  const exhibitor = exhibitors[key];
                  return (
                    <Marker
                      key={key}
                      position={positions[exhibitor.position] as LatLngExpression}
                    />
                  );
                })}
              </LayerGroup>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked={mapInView == 2} name="Floor 3">
              <LayerGroup>
                <ImageOverlay url="/img/map/floor-3.svg" bounds={[[-1, -1], [1, 1]]}/>
                {Object.values(Object.entries(positions).slice(20, 30)).map(([key, position]: [string, [number, number]], index: number) => (
                    <Marker
                      key={index}
                      position={position}
                      icon={ceriseMarker(String(index + 1))}
                      eventHandlers={{
                        click: (e) => {
                          console.log(e, e.target);
                        },
                      }}/>
                  ))}
              </LayerGroup>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked={mapInView == 3} name="KTH Entrance">
              <ImageOverlay url="/img/map/kth-entrance.svg" bounds={[[-1, -1], [1, 1]]}/>
            </LayersControl.BaseLayer>
          </LayersControl>
        </MapContainer>
      </div>
    );
}