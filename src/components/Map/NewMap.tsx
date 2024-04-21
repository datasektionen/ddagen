import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { Dispatch } from "react";
import { ImageOverlay, MapContainer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

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
                scrollWheelZoom={false}
                style={{height: '84.5vh', width: '100%'}}
                className="w-full"
            >
                <ImageOverlay url="/img/map/floor-2.svg" bounds={[[-1, -1], [1, 1]]}/>
            </MapContainer>
        </div>
    )
}