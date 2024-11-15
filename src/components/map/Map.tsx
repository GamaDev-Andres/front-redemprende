import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  center: [number, number];
  zoom?: number;
  markers?: { position: [number, number]; label: string }[];
}

const Map = ({ center, zoom = 13, markers = [] }: MapProps) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
