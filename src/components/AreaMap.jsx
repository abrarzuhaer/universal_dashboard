
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
