import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fingerprint from "vite-plugin-fingerprintjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    fingerprint({
      useLocalScript: true,
    }),
  ],
});
