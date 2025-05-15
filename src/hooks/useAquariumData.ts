
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
  // Validation endpoint information
  validation_endpoint?: {
    url: string;
    method: string;
    service: string;
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
        
        // Check for locally validated challenges and preserve their state
        const solvedChallengesKey = 'solved_challenges';
        const solvedChallengesStr = localStorage.getItem(solvedChallengesKey);
        
        if (solvedChallengesStr && data.challenges) {
          try {
            const solvedChallenges = JSON.parse(solvedChallengesStr);
            
            // Update the challenges with locally validated state
            if (Array.isArray(solvedChallenges) && solvedChallenges.length > 0) {
              const updatedChallenges = data.challenges.map(challenge => {
                // If this challenge is in our locally solved list, mark it as solved
                if (solvedChallenges.includes(challenge.id)) {
                  return { ...challenge, status: 'solved' };
                }
                return challenge;
              });
              
              // Update the solved count to match our local state
              const solvedCount = updatedChallenges.filter(c => c.status === 'solved').length;
              
              // Create updated data with our locally validated challenges
              const updatedData = {
                ...data,
                challenges: updatedChallenges,
                solved: solvedCount
              };
              
              setChallengesData(updatedData);
              setLoading(false);
              return; // Exit early since we've set the data
            }
          } catch (parseError) {
            console.error('Error parsing solved challenges:', parseError);
            // Continue with original data if there's an error
          }
        }
        
        // If we didn't have any locally validated challenges or there was an error,
        // just use the data from the API
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
