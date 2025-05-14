
import { useState, useEffect } from 'react';
import { getSystemStatus, getChallenges } from '../api/aquariumApi';

export interface SystemStatus {
  environmental_monitoring: string;
  species_database: string;
  feeding_system: string;
  remote_monitoring: string;
  analysis_engine: string;
  overall_status: string;
  last_updated: string;
}

export interface Challenge {
  id: number;
  name: string;
  title: string;
  status: string;
  description: string;
  // New properties
  hint?: string;
  service?: string;
  file?: string;
  function?: string;
  // Solution can either be a string (old format) or an object (new format)
  solution: string | {
    code?: string;
    explanation?: string;
    lecture?: string;
  };
}

export interface ChallengesResponse {
  challenges: Challenge[];
  total: number;
  solved: number;
}

export const useSystemStatus = () => {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSystemStatus = async () => {
      try {
        const data = await getSystemStatus();
        setStatus(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch system status');
        setLoading(false);
      }
    };

    fetchSystemStatus();

    // Poll for updates every 15 seconds
    const interval = setInterval(fetchSystemStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return { status, loading, error, setStatus };
};

export const useChallenges = () => {
  const [challengesData, setChallengesData] = useState<ChallengesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await getChallenges();
        setChallengesData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch challenges');
        setLoading(false);
      }
    };

    fetchChallenges();

    // Poll for updates every 10 seconds
    const interval = setInterval(fetchChallenges, 10000);
    return () => clearInterval(interval);
  }, []);

  return { challengesData, loading, error, setChallengesData };
};
