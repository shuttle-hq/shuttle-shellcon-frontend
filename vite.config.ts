
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // aqua-monitor endpoints
      '/api/tanks': 'http://localhost:8000',
      '/api/sensors': 'http://localhost:8000',
      '/api/challenges/1/validate': 'http://localhost:8000',  // Challenge #1 validation is on aqua-monitor

      // species-hub endpoints
      '/api/species': 'http://localhost:8001',
      '/api/feeding': 'http://localhost:8001',

      // aqua-brain endpoints - fix for the challenges endpoint
      '/api/system': 'http://localhost:8002',
      '/api/analysis': 'http://localhost:8002',
      '/api/challenges': {
        target: 'http://localhost:8002',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
