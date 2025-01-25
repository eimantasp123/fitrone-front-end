import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "./i18n.js";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GoogleMapsLoader from "./utils/GoogleMapsLoader.js";

// Create a Query Client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <GoogleMapsLoader> */}
    <QueryClientProvider client={queryClient}>
      <Router>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    {/* </GoogleMapsLoader> */}
  </React.StrictMode>,
);
