import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 3000,
    host: true, // Your desired port number
  },
  optimizeDeps: {
    include: ["react-cookie", "react-player"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Configure the @ alias
    },
  },
});
