import React from 'react';

function AreaMap({ location }) {
  const mapURL = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&z=12&output=embed`;
  return (
    <iframe
      title="Map"
      src={mapURL}
      width="100%"
      height="300"
      className="rounded-md border"
    />
  );
}

export default AreaMap;