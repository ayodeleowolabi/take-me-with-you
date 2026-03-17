import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for missing marker icons in Vite/React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function TravelMap({ cities }) {
  const validCities = cities.filter(city => city.lat && city.lng);

  return (
   <MapContainer
  center={[20, 0]}
  zoom={2}
  style={{ width: '100%', height: '500px', minHeight: '500px', display: 'block' }}
>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validCities.map(city => (
        <Marker key={city._id} position={[city.lat, city.lng]}>
          <Popup>
            <strong>{city.name}</strong><br />
            {city.country}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}