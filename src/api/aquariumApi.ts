import { API_URLS } from '../config/api';

// Aggregated System Status API
export const getSystemStatus = async () => {
  try {
    // Initialize the system status with default values
    const systemStatus = {
      environmental_monitoring: 'unknown',
      species_database: 'unknown',
      feeding_system: 'unknown',
      remote_monitoring: 'unknown',
      analysis_engine: 'unknown',
      overall_status: 'unknown',
      last_updated: new Date().toISOString()
    };

    // Try to fetch sensor status from aqua-monitor
    try {
      const sensorResponse = await fetch('/api/sensors/status');
      if (sensorResponse.ok) {
        const sensorData = await sensorResponse.json();
        systemStatus.environmental_monitoring = sensorData.status || 'unknown';
        systemStatus.last_updated = sensorData.last_updated || systemStatus.last_updated;
      }
    } catch (sensorError) {
      console.error('Error fetching sensor status:', sensorError);
    }

    // Try to fetch species-hub health
    try {
      const speciesResponse = await fetch('/api/species');
      systemStatus.species_database = speciesResponse.ok ? 'online' : 'offline';
    } catch (speciesError) {
      console.error('Error checking species database:', speciesError);
    }

    // Try to fetch feeding system status
    try {
      const feedingResponse = await fetch('/api/feeding/schedule');
      systemStatus.feeding_system = feedingResponse.ok ? 'online' : 'offline';
    } catch (feedingError) {
      console.error('Error checking feeding system:', feedingError);
    }

    // Try to fetch analysis engine status
    try {
      const analysisResponse = await fetch('/api/analysis/tanks');
      systemStatus.analysis_engine = analysisResponse.ok ? 'online' : 'offline';
    } catch (analysisError) {
      console.error('Error checking analysis engine:', analysisError);
    }

    // Check remote monitoring through a separate health endpoint
    try {
      const monitoringResponse = await fetch('/api/health');
      systemStatus.remote_monitoring = monitoringResponse.ok ? 'online' : 'offline';
    } catch (monitoringError) {
      console.error('Error checking remote monitoring:', monitoringError);
    }

    // Calculate overall status
    const statusValues = [
      systemStatus.environmental_monitoring,
      systemStatus.species_database,
      systemStatus.feeding_system,
      systemStatus.remote_monitoring,
      systemStatus.analysis_engine
    ];

    if (statusValues.some(status => status === 'offline' || status === 'critical')) {
      systemStatus.overall_status = 'critical';
    } else if (statusValues.some(status => status === 'degraded')) {
      systemStatus.overall_status = 'degraded';
    } else if (statusValues.every(status => status === 'online' || status === 'ok' || status === 'operational')) {
      systemStatus.overall_status = 'operational';
    } else {
      systemStatus.overall_status = 'unknown';
    }

    return systemStatus;
  } catch (error) {
    console.error('Error aggregating system status:', error);
    throw error;
  }
};

export const getChallenges = async () => {
  try {
    const response = await fetch(`${API_URLS.AQUA_BRAIN}/challenges/current`);
    if (!response.ok) throw new Error('Failed to fetch challenges');
    return await response.json();
  } catch (error) {
    console.error('Error fetching challenges:', error);
    throw error;
  }
};

// Challenge validation function - confirmed working with our curl test
export const validateChallengeSolution = async (challengeId: number | string) => {
  try {
    // From our curl test, we know this endpoint is working correctly
    console.log(`Validating solution for challenge ${challengeId} at /api/challenges/${challengeId}/validate`);
    
    // Use direct endpoint path without service prefix as confirmed by curl test
    const response = await fetch(`/api/challenges/${challengeId}/validate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error(`Server returned status ${response.status} for challenge validation`);
      throw new Error(`Failed to validate solution for challenge ${challengeId}`);
    }
    
    const validationData = await response.json();
    
    // Format the response to match what the frontend expects
    // We're maintaining the expected structure based on the UI components
    return {
      implementation: {
        valid: validationData.valid,
        message: validationData.message
      },
      system_status: validationData.system_component ? {
        [validationData.system_component.name]: validationData.system_component.status
      } : null,
      details: validationData.details || null
    };
  } catch (error) {
    console.error(`Error validating solution for challenge ${challengeId}:`, error);
    throw error;
  }
};

export const getAllTankAnalysis = async () => {
  try {
    const response = await fetch(`${API_URLS.AQUA_BRAIN}/analysis/tanks`);
    if (!response.ok) throw new Error('Failed to fetch tank analysis summary');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tank analysis summary:', error);
    throw error;
  }
};

export const getTankAnalysis = async (tankId: string) => {
  try {
    const response = await fetch(`${API_URLS.AQUA_BRAIN}/analysis/tanks/${tankId}`);
    if (!response.ok) throw new Error(`Failed to fetch analysis for tank ${tankId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching analysis for tank ${tankId}:`, error);
    throw error;
  }
};

// Aqua-Monitor API
export const getAllTanks = async () => {
  try {
    const response = await fetch(`${API_URLS.AQUA_MONITOR}/tanks`);
    if (!response.ok) throw new Error('Failed to fetch tanks');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tanks:', error);
    throw error;
  }
};

export const getTankReadings = async (tankId: string) => {
  try {
    const response = await fetch(`${API_URLS.AQUA_MONITOR}/tanks/${tankId}/readings`);
    if (!response.ok) throw new Error('Failed to fetch tank readings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching tank readings:', error);
    throw error;
  }
};

export const getSensorStatus = async () => {
  try {
    const response = await fetch(`${API_URLS.AQUA_MONITOR}/sensors/status`);
    if (!response.ok) throw new Error('Failed to fetch sensor status');
    return await response.json();
  } catch (error) {
    console.error('Error fetching sensor status:', error);
    throw error;
  }
};

// Species-Hub API
export const getAllSpecies = async () => {
  try {
    const response = await fetch(`${API_URLS.SPECIES_HUB}/species`);
    if (!response.ok) throw new Error('Failed to fetch species');
    return await response.json();
  } catch (error) {
    console.error('Error fetching species:', error);
    throw error;
  }
};

export const searchSpeciesByName = async (searchTerm: string) => {
  try {
    const response = await fetch(`${API_URLS.SPECIES_HUB}/species?name=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) throw new Error('Failed to search species by name');
    return await response.json();
  } catch (error) {
    console.error('Error searching species by name:', error);
    throw error;
  }
};

export const searchSpeciesByScientificName = async (searchTerm: string) => {
  try {
    const response = await fetch(`${API_URLS.SPECIES_HUB}/species?scientific_name=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) throw new Error('Failed to search species by scientific name');
    return await response.json();
  } catch (error) {
    console.error('Error searching species by scientific name:', error);
    throw error;
  }
};

export const getSpeciesDetails = async (id: string) => {
  try {
    const response = await fetch(`${API_URLS.SPECIES_HUB}/species/${id}`);
    if (!response.ok) throw new Error('Failed to fetch species details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching species details:', error);
    throw error;
  }
};

export const getSpeciesFeedingSchedule = async (speciesId: string, tankType?: string, customDiet?: string) => {
  try {
    let url = `${API_URLS.SPECIES_HUB}/species/${speciesId}/feeding-schedule`;
    
    const params = new URLSearchParams();
    if (tankType) params.append('tank_type', tankType);
    if (customDiet) params.append('custom_diet', customDiet);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch feeding schedule');
    return await response.json();
  } catch (error) {
    console.error('Error fetching feeding schedule:', error);
    throw error;
  }
};

// Original getSpecies function for backwards compatibility
export const getSpecies = async () => {
  return getAllSpecies();
};

// Original getFeedingSchedule function for backwards compatibility
export const getFeedingSchedule = async () => {
  try {
    const response = await fetch(`${API_URLS.SPECIES_HUB}/feeding/schedule`);
    if (!response.ok) throw new Error('Failed to fetch feeding schedule');
    return await response.json();
  } catch (error) {
    console.error('Error fetching feeding schedule:', error);
    throw error;
  }
};
