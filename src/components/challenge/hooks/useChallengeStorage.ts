
import { useState, useCallback, useEffect } from 'react';

// Define this type here instead of importing to avoid circular dependency
export type StoragePendingActionType = "solution" | "lecture";

interface StorageConfig {
  challengeId: string;
}

export interface ConfirmedActions {
  solution: boolean;
  lecture: boolean;
}

export const useChallengeStorage = ({ challengeId }: StorageConfig) => {
  // Ensure challengeId is always a string
  const normalizedId = String(challengeId);
  
  // Create unique keys for this challenge's localStorage items
  const solutionConfirmKey = `shellcon_solution_confirmed_${normalizedId}`;
  const lectureConfirmKey = `shellcon_lecture_confirmed_${normalizedId}`;
  
  // Debug localStorage values
  console.log(`[Storage Debug] Challenge ${normalizedId} solution key:`, solutionConfirmKey);
  console.log(`[Storage Debug] Current localStorage value:`, localStorage.getItem(solutionConfirmKey));
  
  // Initialize confirmed actions from localStorage with direct access
  const [confirmedActions, setConfirmedActions] = useState<ConfirmedActions>(() => {
    const solutionConfirmed = localStorage.getItem(solutionConfirmKey) === 'true';
    const lectureConfirmed = localStorage.getItem(lectureConfirmKey) === 'true';
    
    console.log(`[Storage Debug] Initial state - solution confirmed:`, solutionConfirmed);
    console.log(`[Storage Debug] Initial state - lecture confirmed:`, lectureConfirmed);
    
    return {
      solution: solutionConfirmed,
      lecture: lectureConfirmed
    };
  });
  
  // Use effect to sync state with localStorage when the component mounts or keys change
  // Only run this effect once when the component mounts to avoid loops
  useEffect(() => {
    const solutionConfirmed = localStorage.getItem(solutionConfirmKey) === 'true';
    const lectureConfirmed = localStorage.getItem(lectureConfirmKey) === 'true';
    
    console.log(`[Storage Debug] useEffect - solution confirmed:`, solutionConfirmed);
    console.log(`[Storage Debug] useEffect - lecture confirmed:`, lectureConfirmed);
    
    // Only update state if the values are different to avoid unnecessary re-renders
    if (solutionConfirmed !== confirmedActions.solution || lectureConfirmed !== confirmedActions.lecture) {
      setConfirmedActions({
        solution: solutionConfirmed,
        lecture: lectureConfirmed
      });
    }
  }, [solutionConfirmKey, lectureConfirmKey]); // Remove confirmedActions from dependency array
  
  const saveConfirmation = useCallback((action: StoragePendingActionType) => {
    const storageKey = action === 'solution' ? solutionConfirmKey : lectureConfirmKey;
    
    // Set the value in localStorage
    localStorage.setItem(storageKey, 'true');
    console.log(`[Storage Debug] Saved ${action} confirmation to localStorage:`, storageKey);
    
    // Update the state
    setConfirmedActions(prev => {
      const newState = { ...prev, [action]: true };
      console.log(`[Storage Debug] Updated state:`, newState);
      return newState;
    });
  }, [solutionConfirmKey, lectureConfirmKey]);

  return {
    confirmedActions,
    saveConfirmation
  };
};
