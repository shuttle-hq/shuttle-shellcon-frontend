
import { useState, useCallback } from 'react';
import { PendingActionType } from './useChallengeCard';

interface StorageConfig {
  challengeId: string;
}

export interface ConfirmedActions {
  solution: boolean;
  lecture: boolean;
}

export const useChallengeStorage = ({ challengeId }: StorageConfig) => {
  // Create unique keys for this challenge's localStorage items
  const solutionConfirmKey = `shellcon_solution_confirmed_${challengeId}`;
  const lectureConfirmKey = `shellcon_lecture_confirmed_${challengeId}`;
  
  // Initialize confirmed actions from localStorage
  const [confirmedActions, setConfirmedActions] = useState<ConfirmedActions>(() => ({
    solution: localStorage.getItem(solutionConfirmKey) === 'true',
    lecture: localStorage.getItem(lectureConfirmKey) === 'true'
  }));
  
  const saveConfirmation = useCallback((action: PendingActionType) => {
    const storageKey = action === 'solution' ? solutionConfirmKey : lectureConfirmKey;
    localStorage.setItem(storageKey, 'true');
    setConfirmedActions(prev => ({ ...prev, [action]: true }));
  }, [solutionConfirmKey, lectureConfirmKey]);

  return {
    confirmedActions,
    saveConfirmation
  };
};
