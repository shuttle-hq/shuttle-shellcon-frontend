
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
export const getSpecies = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams(params);
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await fetch(`${API_URLS.SPECIES_HUB}/species${queryString}`);
    if (!response.ok) throw new Error('Failed to fetch species');
    return await response.json();
  } catch (error) {
    console.error('Error fetching species:', error);
    throw error;
  }
};

export const getSpeciesById = async (id: string) => {
  try {
    const response = await fetch(`${API_URLS.SPECIES_HUB}/species/${id}`);
    if (!response.ok) throw new Error('Failed to fetch species details');
    return await response.json();
  } catch (error) {
    console.error('Error fetching species details:', error);
    throw error;
  }
};

export const getFeedingSchedule = async (speciesId: string, params = {}) => {
  try {
    const queryParams = new URLSearchParams(params);
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await fetch(`${API_URLS.SPECIES_HUB}/species/${speciesId}/feeding-schedule${queryString}`);
    if (!response.ok) throw new Error('Failed to fetch feeding schedule');
    return await response.json();
  } catch (error) {
    console.error('Error fetching feeding schedule:', error);
    throw error;
  }
};
