import React, { useEffect } from 'react';
// Make sure to import useMap from react-leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// A simple mapping from area names to coordinates
const areaCoordinates = {
  'Dhaka, Bangladesh': [23.8103, 90.4125],
  'Chittagong, Bangladesh': [22.3569, 91.7805],
  'Rajshahi, Bangladesh': [24.3688, 88.5916],
  'Khulna, Bangladesh': [22.8456, 89.5403],
  'Barisal, Bangladesh': [22.701, 90.3535],
  'Sylhet, Bangladesh': [24.8949, 91.8687],
  'Rangpur, Bangladesh': [25.7438, 89.2752],
};

// This is the helper component that fixes the issue
// It uses the useMap() hook to get the map instance and update its view.
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function AreaMap({ location }) {
  const position = areaCoordinates[location] || [23.685, 90.3563];
  const zoomLevel = location === 'Dhaka, Bangladesh' ? 12 : 8;

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <MapContainer
        center={position}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        {/* We add the ChangeView component here */}
        <ChangeView center={position} zoom={zoomLevel} />
        
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{location}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

// FIX: Changed "export just" to "export default"
export default AreaMap;