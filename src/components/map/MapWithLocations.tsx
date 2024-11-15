import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import userMarkIcon from '@/assets/location.png'
// Configurar ícono
const defaultIcon = L.icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = L.icon({
    iconUrl: userMarkIcon.src,
    shadowUrl: markerShadow.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

L.Marker.prototype.options.icon = defaultIcon;
interface Props {
  businessCoords: [number, number];
  userCoords?: [number, number] | null;
}
const MapWithLocations = ({ businessCoords, userCoords }:Props) => {
  const AdjustMapBounds = () => {
    const map = useMap();

    if (userCoords) {
      const bounds = L.latLngBounds([businessCoords, userCoords]);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView(businessCoords, 13);
    }

    return null;
  };

  return (
    <MapContainer
      style={{ height: '400px', width: '100%' }}
      center={businessCoords}
      zoom={13}
    >
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={businessCoords}>
        <Popup>Ubicación del negocio</Popup>
      </Marker>
      {userCoords && (
        <Marker position={userCoords} icon={userIcon}>
          <Popup>Tu ubicación</Popup>
        </Marker>
      )}
      <AdjustMapBounds />
    </MapContainer>
  );
};

export default MapWithLocations;
