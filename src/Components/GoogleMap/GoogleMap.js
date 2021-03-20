import React, { useState, useEffect } from "react";

const GoogleMap = () => {
  const [map, setMap] = useState();

  useEffect(() => {
    const mapUrl = `https://www.google.com/maps/embed/v1/search?q=metrorail&key=AIzaSyAGLrruOsFHsF2JjTzX1Sd0CQBmzxIVpKg`;

    setMap(mapUrl);
  }, []);

  return (
    <div>
      <iframe
        title="google-Map"
        width="800rem"
        height="600"
        style={{ border: "0" }}
        loading="lazy"
        allowFullScreen
        src={map}
      ></iframe>
    </div>
  );
};

export default GoogleMap;
