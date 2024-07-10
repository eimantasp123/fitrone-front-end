import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Your desired port number
    open: true, // Automatically open the browser
  },
  optimizeDeps: {
    include: ["react-cookie"],
  },
});
