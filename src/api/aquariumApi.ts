
import { API_URLS } from '../config/api';

// Aqua-Brain API
export const getSystemStatus = async () => {
  try {
    const response = await fetch(`${API_URLS.AQUA_BRAIN}/system/status`);
    if (!response.ok) throw new Error('Failed to fetch system status');
    return await response.json();
  } catch (error) {
    console.error('Error fetching system status:', error);
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
