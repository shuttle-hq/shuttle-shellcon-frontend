
export const API_URLS = {
  AQUA_MONITOR: import.meta.env.VITE_AQUA_MONITOR_URL || '/api',
  SPECIES_HUB: import.meta.env.VITE_SPECIES_HUB_URL || '/api',
  AQUA_BRAIN: import.meta.env.VITE_AQUA_BRAIN_URL || '/api',
};

// Export the API_BASE_URL to be used in components
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
