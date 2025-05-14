import { API_URLS } from '../config/api';

// System Status API for default challenge statuses
export const getSystemStatus = async () => {
  try {
    // Create the system status with the default values for each challenge component
    // These match the status values returned by the API when challenges are not solved
    const systemStatus = {
      environmental_monitoring: 'degraded', // Challenge #1 - Async I/O
      species_database: 'degraded',        // Challenge #2 - Query Optimization
      feeding_system: 'error',             // Challenge #3 - Error Handling 
      remote_monitoring: 'degraded',       // Challenge #4 - Resource Management (named "Sensor Management" in API)
      analysis_engine: 'degraded',         // Challenge #5 - Shared State
      overall_status: 'degraded',          // Overall status based on component statuses
      last_updated: new Date().toISOString()
    };

    // Try to fetch challenge #1 status (Environmental Monitoring)
    try {
      const response = await fetch('/api/challenges/1/validate');
      if (response.ok) {
        const data = await response.json();
        if (data.system_component && data.system_component.name === 'Environmental Monitoring') {
          systemStatus.environmental_monitoring = data.system_component.status;
        }
      }
    } catch (error) {
      console.error('Error fetching Environmental Monitoring status:', error);
    }

    // Try to fetch challenge #2 status (Species Database)
    try {
      const response = await fetch('/api/challenges/2/validate');
      if (response.ok) {
        const data = await response.json();
        if (data.system_component && data.system_component.name === 'Species Database') {
          systemStatus.species_database = data.system_component.status;
        }
      }
    } catch (error) {
      console.error('Error fetching Species Database status:', error);
    }

    // Try to fetch challenge #3 status (Feeding Schedule)
    try {
      const response = await fetch('/api/challenges/3/validate');
      if (response.ok) {
        const data = await response.json();
        if (data.system_component && data.system_component.name === 'Feeding Schedule') {
          systemStatus.feeding_system = data.system_component.status;
        }
      }
    } catch (error) {
      console.error('Error fetching Feeding Schedule status:', error);
    }

    // Try to fetch challenge #4 status (Sensor Management / Remote Monitoring)
    try {
      const response = await fetch('/api/challenges/4/validate');
      if (response.ok) {
        const data = await response.json();
        if (data.system_component && data.system_component.name === 'Sensor Management') {
          systemStatus.remote_monitoring = data.system_component.status;
        }
      }
    } catch (error) {
      console.error('Error fetching Sensor Management status:', error);
    }

    // Try to fetch challenge #5 status (Analysis Engine)
    try {
      const response = await fetch('/api/challenges/5/validate');
      if (response.ok) {
        const data = await response.json();
        if (data.system_component && data.system_component.name === 'Analysis Engine') {
          systemStatus.analysis_engine = data.system_component.status;
        }
      }
    } catch (error) {
      console.error('Error fetching Analysis Engine status:', error);
    }

    // Calculate overall status
    const statusValues = [
      systemStatus.environmental_monitoring,
      systemStatus.species_database,
      systemStatus.feeding_system,
      systemStatus.remote_monitoring,
      systemStatus.analysis_engine
    ];

    if (statusValues.some(status => status === 'error' || status === 'critical' || status === 'offline')) {
      systemStatus.overall_status = 'critical';
    } else if (statusValues.some(status => status === 'degraded')) {
      systemStatus.overall_status = 'degraded';
    } else if (statusValues.every(status => status === 'normal' || status === 'online' || status === 'operational')) {
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
