import { Circle, FeatureGroup, ImageOverlay, LayerGroup, LayersControl, MapContainer, Marker, Popup, Rectangle, SVGOverlay, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

export default function Map() {
    // var floor2_base = L.imageOverlay("/resources/floor-2.svg", latLngBounds, {opacity: 1, interactive: true});
    // var floor2_markers = [
    //     L.marker([0, -0.4], {icon: ceriseMarker}),
    //     L.marker([0.17, 0.11], {icon: ceriseMarker}),
    //     L.marker([0.18, -0.03], {icon: ceriseMarker})
    // ];
    // var floor2 = L.layerGroup([floor2_base, ...floor2_markers]).addTo(map);

    return (
        <div className="md:m-2 backdrop-blur-sm border-4 border-pink-600 grow-0 rounded-2xl">
            <MapContainer
                center={[0, 0]}
                zoom={9}
                scrollWheelZoom={false}
                style={{ height: '84.5vh', width: '60vw' }}
            >
            <ImageOverlay url="/img/map/floor-2.svg" bounds={[[-1, -1], [1, 1]]}/>
        </MapContainer>
        </div>
    )
}