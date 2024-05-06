import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { Dispatch } from "react";
import { Circle, FeatureGroup, ImageOverlay, LayerGroup, LayersControl, MapContainer, Marker, Popup, Rectangle } from 'react-leaflet';
import { DivIcon, LatLngExpression, Layer } from "leaflet";
import "leaflet/dist/leaflet.css";

const ceriseMarker = (id: string): DivIcon =>
  new DivIcon({
    html: id,
    className: 'rounded-full bg-pink-600 text-white text-center content-center',
    iconSize: [30, 30]
  });

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
                <Marker position={[-0.03, -0.05]} icon={ceriseMarker("1")} 
                eventHandlers={{
                  click: (e) => {
                    console.log(e, e.target);
                  },
                }}/>
                <Marker position={[-0.03, 0.06]} icon={ceriseMarker("2")}/>
                <Marker position={[-0.03, 0.17]} icon={ceriseMarker("3")}/>
                <Marker position={[0.1, -0.02]} icon={ceriseMarker("4")}/>
                <Marker position={[0.1, 0.11]} icon={ceriseMarker("5")}/>
                <Marker position={[0.12, -0.19]} icon={ceriseMarker("6")}/>
                <Marker position={[0.24, -0.16]} icon={ceriseMarker("7")}/>
                <Marker position={[0.32, 0.01]} icon={ceriseMarker("8")}/>
                <Marker position={[0.3, 0.17]} icon={ceriseMarker("9")}/>
                <Marker position={[0.22, 0.25]} icon={ceriseMarker("10")}/>
                <Marker position={[0.10, 0.25]} icon={ceriseMarker("11")}/>
                <Marker position={[0.55, 0.1]} icon={ceriseMarker("12")}/>
                <Marker position={[0.55, 0.25]} icon={ceriseMarker("13")}/>
                <Marker position={[0.67, -0.05]} icon={ceriseMarker("14")}/>
                <Marker position={[0.67, 0.06]} icon={ceriseMarker("15")}/>
                <Marker position={[0.67, 0.17]} icon={ceriseMarker("16")}/>
                <Marker position={[0.67, 0.28]} icon={ceriseMarker("17")}/>
                <Marker position={[0.67, 0.39]} icon={ceriseMarker("18")}/>
                <Marker position={[0.57, 0.40]} icon={ceriseMarker("19")}/>
                <Marker position={[0.47, 0.40]} icon={ceriseMarker("20")}/>
              </LayerGroup>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked={mapInView == 2} name="Floor 3">
              <ImageOverlay url="/img/map/floor-3.svg" bounds={[[-1, -1], [1, 1]]}/>
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked={mapInView == 3} name="KTH Entrance">
              <ImageOverlay url="/img/map/kth-entrance.svg" bounds={[[-1, -1], [1, 1]]}/>
            </LayersControl.BaseLayer>
          </LayersControl>

          {/* {Object.entries(exhibitors).map(([id, exhibitor]) => (
            <Marker
              key={id}
              position={positions[exhibitor.position] as LatLngExpression}
              icon={ceriseMarker(id)}
            />
          ))} */}
        </MapContainer>
      </div>
    );
}