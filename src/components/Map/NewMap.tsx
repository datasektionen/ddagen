import type Locale from "@/locales";
import { MapProp } from "@/shared/Classes";
import { Dispatch } from "react";
import { ImageOverlay, MapContainer, Marker } from 'react-leaflet';
import { DivIcon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const ceriseMarker = (id: string): DivIcon =>
  new DivIcon({
    html: id,
    className: 'rounded-full bg-pink-600 text-white text-center content-center',
    iconSize: [30, 30]
  });

const positions = [
  [-0.03, -0.05],
  [-0.03, 0.06],
  [-0.03, 0.17],
  [0.1, -0.02],
  [0.1, 0.11],
  [0.12, -0.19],
  [0.24, -0.16],
  [0.32, 0.01],
  [0.3, 0.17],
  [0.22, 0.25],
  [0.10, 0.25],
  [0.55, 0.1],
  [0.55, 0.25],
  [0.67, -0.05],
  [0.67, 0.06],
  [0.67, 0.17],
  [0.67, 0.28],
  [0.67, 0.39],
  [0.57, 0.40],
  [0.47, 0.40]
];

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
    // return (
    //     <div className="w-full md:m-2 box-border backdrop-blur-sm border-4 border-pink-600 rounded-2xl">
    //         <MapContainer
    //             center={[0, 0]}
    //             zoom={9}
    //             scrollWheelZoom={true}
    //             style={{height: '84.5vh', width: '100%'}}
    //             className="w-full"
    //         >
    //             <ImageOverlay url="/img/map/floor-2.svg" bounds={[[-1, -1], [1, 1]]}/>
                // <Marker position={[-0.03, -0.05]} icon={ceriseMarker("1")}/>
                // <Marker position={[-0.03, 0.06]} icon={ceriseMarker("2")}/>
                // <Marker position={[-0.03, 0.17]} icon={ceriseMarker("3")}/>
                // <Marker position={[0.1, -0.02]} icon={ceriseMarker("4")}/>
                // <Marker position={[0.1, 0.11]} icon={ceriseMarker("5")}/>
                // <Marker position={[0.12, -0.19]} icon={ceriseMarker("6")}/>
                // <Marker position={[0.24, -0.16]} icon={ceriseMarker("7")}/>
                // <Marker position={[0.32, 0.01]} icon={ceriseMarker("8")}/>
                // <Marker position={[0.3, 0.17]} icon={ceriseMarker("9")}/>
                // <Marker position={[0.22, 0.25]} icon={ceriseMarker("10")}/>
                // <Marker position={[0.10, 0.25]} icon={ceriseMarker("11")}/>
                // <Marker position={[0.55, 0.1]} icon={ceriseMarker("12")}/>
                // <Marker position={[0.55, 0.25]} icon={ceriseMarker("13")}/>
                // <Marker position={[0.67, -0.05]} icon={ceriseMarker("14")}/>
                // <Marker position={[0.67, 0.06]} icon={ceriseMarker("15")}/>
                // <Marker position={[0.67, 0.17]} icon={ceriseMarker("16")}/>
                // <Marker position={[0.67, 0.28]} icon={ceriseMarker("17")}/>
                // <Marker position={[0.67, 0.39]} icon={ceriseMarker("18")}/>
                // <Marker position={[0.57, 0.40]} icon={ceriseMarker("19")}/>
                // <Marker position={[0.47, 0.40]} icon={ceriseMarker("20")}/>
    //         </MapContainer>
    //     </div>
    // )
    console.log(exhibitors);
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

          {Object.entries(exhibitors).map(([id, exhibitor]) => (
            <Marker
              key={id}
              position={positions[exhibitor.position] as LatLngExpression}
              icon={ceriseMarker(id)}
            />
          ))}

          <Marker position={[-0.03, -0.05]} icon={ceriseMarker("1")}/>
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
        </MapContainer>
      </div>
    );
}