import React, { useEffect } from "react";

const loadGoogleMapsScript = (apiKey: string) => {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
};

const GoogleMapsLoader = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API; // Load your API key securely
    if (apiKey) {
      loadGoogleMapsScript(apiKey);
    } else {
      console.error("Google Maps API key is missing!");
    }
  }, []);

  return <>{children}</>;
};

export default GoogleMapsLoader;
