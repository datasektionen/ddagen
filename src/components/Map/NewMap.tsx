import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { Dispatch } from "react";
import { ImageOverlay, MapContainer, Marker } from 'react-leaflet';
import { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";

const ceriseMarker = new DivIcon({
  className: 'rounded-full bg-pink-600',
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
    return (
        <div className="w-full md:m-2 box-border backdrop-blur-sm border-4 border-pink-600 rounded-2xl">
            <MapContainer
                center={[0, 0]}
                zoom={9}
                scrollWheelZoom={true}
                style={{height: '84.5vh', width: '100%'}}
                className="w-full"
            >
                <ImageOverlay url="/img/map/floor-2.svg" bounds={[[-1, -1], [1, 1]]}/>
                <Marker position={[-0.03, -0.05]} icon={ceriseMarker}/>
                <Marker position={[-0.03, 0.06]} icon={ceriseMarker}/>
                <Marker position={[-0.03, 0.17]} icon={ceriseMarker}/>
                <Marker position={[0.1, -0.02]} icon={ceriseMarker}/>
                <Marker position={[0.1, 0.11]} icon={ceriseMarker}/>
                <Marker position={[0.12, -0.19]} icon={ceriseMarker}/>
                <Marker position={[0.24, -0.16]} icon={ceriseMarker}/>
            </MapContainer>
        </div>
    )
}