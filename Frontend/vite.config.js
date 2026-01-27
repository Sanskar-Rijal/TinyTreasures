import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    watch: {
      usePolling: true, // Required for Docker - enables file system polling
    },
  },
});
