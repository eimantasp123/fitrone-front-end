let scriptLoadingPromise: Promise<void> | null = null;

const loadGoogleMapsScript = () => {
  if (
    typeof window.google === "object" &&
    typeof window.google.maps === "object"
  ) {
    return Promise.resolve();
  }

  if (scriptLoadingPromise) return scriptLoadingPromise;

  scriptLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAP_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = (err) => {
      reject(err);
    };

    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
};

export default loadGoogleMapsScript;
