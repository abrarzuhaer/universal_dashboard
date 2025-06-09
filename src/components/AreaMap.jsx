<<<<<<< HEAD
// import React from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const mapContainerStyle = {
//   width: '100%',
//   height: '300px',
// };

// const center = {
//   lat: 23.8103, // Dhaka default
//   lng: 90.4125,
// };

// function AreaMap({ location }) {
//   return (
//     <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//       <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={8}>
//         <Marker position={center} />
//       </GoogleMap>
//     </LoadScript>
//   );
// }

// export default AreaMap;

import React from 'react';

function AreaMap({ location }) {
  const mapURL = `https://maps.google.com/maps?q=${encodeURIComponent(
    location
  )}&z=12&output=embed`;
  return (
    <iframe
      title="Map"
      src={mapURL}
      width="100%"
      height="300"
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginTop: '10px',
      }}
    />
  );
}


export default AreaMap;

