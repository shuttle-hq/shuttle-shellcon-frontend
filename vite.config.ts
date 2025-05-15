import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');
  
  // Get API URLs from environment variables or use defaults
  const AQUA_MONITOR_URL = env.VITE_AQUA_MONITOR_URL || 'http://localhost:8000';
  const SPECIES_HUB_URL = env.VITE_SPECIES_HUB_URL || 'http://localhost:8001';
  const AQUA_BRAIN_URL = env.VITE_AQUA_BRAIN_URL || 'http://localhost:8002';
  
  console.log('Using backend services:');
  console.log(`- AQUA_MONITOR_URL: ${AQUA_MONITOR_URL}`);
  console.log(`- SPECIES_HUB_URL: ${SPECIES_HUB_URL}`);
  console.log(`- AQUA_BRAIN_URL: ${AQUA_BRAIN_URL}`);
  
  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        // aqua-monitor endpoints
        '/api/tanks': AQUA_MONITOR_URL,
        '/api/sensors': AQUA_MONITOR_URL,
        '/api/challenges/1/validate': AQUA_MONITOR_URL,  // Challenge #1 validation is on aqua-monitor

        // species-hub endpoints
        '/api/species': SPECIES_HUB_URL,
        '/api/feeding': SPECIES_HUB_URL,

        // aqua-brain endpoints - fix for the challenges endpoint
        '/api/system': AQUA_BRAIN_URL,
        '/api/analysis': AQUA_BRAIN_URL,
        '/api/challenges': {
          target: AQUA_BRAIN_URL,
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
  };
});
