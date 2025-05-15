
import { useState, useEffect, useRef } from 'react';
import { Challenge } from '../../../hooks/useAquariumData';
import { validateChallengeSolution } from './useChallengeValidation';
import { useChallengeStorage, ConfirmedActions, StoragePendingActionType } from './useChallengeStorage';

// Re-export the type from storage to avoid circular dependency
export type PendingActionType = StoragePendingActionType;

interface UseChallengeCardProps {
  challenge: Challenge;
  onSystemStatusUpdate?: (status: any) => void;
}

export const useChallengeCard = ({ challenge, onSystemStatusUpdate }: UseChallengeCardProps) => {
  // Create a ref to track if this is the first render
  const isFirstRender = useRef(true);
  
  // Initialize state for showing various sections
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<PendingActionType | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  
  const challengeId = challenge.id.toString();
  
  // Use the storage hook to manage confirmations
  const { confirmedActions, saveConfirmation } = useChallengeStorage({
    challengeId
  });
  
  // Check if challenge is already solved
  const [isSolved, setIsSolved] = useState<boolean>(
    challenge.status === 'solved'
  );

  // Check if the challenge has a solution property
  const hasSolution = Boolean(challenge.solution);
  
  // Check if the challenge has a hint property
  const hasHint = Boolean(challenge.hint);
  
  // Check if the solution has a lecture property (for More Information)
  const hasLecture = typeof challenge.solution === 'object' && Boolean(challenge.solution.lecture);

  // Force update the localStorage values on component mount
  useEffect(() => {
    // This will run only once when the component mounts
    if (isFirstRender.current) {
      isFirstRender.current = false;
      
      // Direct check of localStorage values for this challenge
      const solutionConfirmKey = `shellcon_solution_confirmed_${challengeId}`;
      const lectureConfirmKey = `shellcon_lecture_confirmed_${challengeId}`;
      
      const directSolutionValue = localStorage.getItem(solutionConfirmKey) === 'true';
      const directLectureValue = localStorage.getItem(lectureConfirmKey) === 'true';
      
      console.log(`[Card Debug] Challenge ${challengeId} - initial check:`);
      console.log(`  - solution confirmed (state):`, confirmedActions.solution);
      console.log(`  - lecture confirmed (state):`, confirmedActions.lecture);
      console.log(`  - solution confirmed (localStorage):`, directSolutionValue);
      console.log(`  - lecture confirmed (localStorage):`, directLectureValue);
    }
  }, [challengeId, confirmedActions]);

  const handleSolutionRequest = () => {
    if (showSolution) {
      // If solution is already visible, hide it
      setShowSolution(false);
    } else {
      // Check localStorage directly to ensure we have the latest value
      const solutionConfirmKey = `shellcon_solution_confirmed_${challengeId}`;
      const isConfirmed = localStorage.getItem(solutionConfirmKey) === 'true';
      
      console.log(`[useChallengeCard] Solution request - isConfirmed from localStorage:`, isConfirmed);
      console.log(`[useChallengeCard] Solution request - confirmedActions.solution:`, confirmedActions.solution);
      
      if (isConfirmed || confirmedActions.solution) {
        // If user has already confirmed this action before, show solution without confirmation
        console.log(`[useChallengeCard] Solution was confirmed before, showing without dialog`);
        setShowSolution(true);
      } else {
        // Otherwise, show the confirmation dialog
        console.log(`[useChallengeCard] Solution not confirmed, showing dialog`);
        setPendingAction("solution");
        setConfirmDialogOpen(true);
      }
    }
  };

  const handleLectureRequest = () => {
    if (showMoreInfo) {
      // If lecture is already visible, hide it
      setShowMoreInfo(false);
    } else {
      // Check localStorage directly to ensure we have the latest value
      const lectureConfirmKey = `shellcon_lecture_confirmed_${challengeId}`;
      const isConfirmed = localStorage.getItem(lectureConfirmKey) === 'true';
      
      console.log(`[useChallengeCard] Lecture request - isConfirmed from localStorage:`, isConfirmed);
      console.log(`[useChallengeCard] Lecture request - confirmedActions.lecture:`, confirmedActions.lecture);
      
      if (isConfirmed || confirmedActions.lecture) {
        // If user has already confirmed this action before, show lecture without confirmation
        console.log(`[useChallengeCard] Lecture was confirmed before, showing without dialog`);
        setShowMoreInfo(true);
      } else {
        // Otherwise, show the confirmation dialog
        console.log(`[useChallengeCard] Lecture not confirmed, showing dialog`);
        setPendingAction("lecture");
        setConfirmDialogOpen(true);
      }
    }
  };

  const handleValidateSolution = async () => {
    setIsValidating(true);
    setValidationMessage(null);

    try {
      const result = await validateChallengeSolution(challenge, onSystemStatusUpdate);
      setIsSolved(result.isValid);
      setValidationMessage(result.message);
    } finally {
      setIsValidating(false);
    }
  };

  const handleConfirm = () => {
    if (!pendingAction) return;
    
    console.log(`[useChallengeCard] Handling confirmation for:`, pendingAction);
    
    // Call saveConfirmation to update localStorage and state
    saveConfirmation(pendingAction);
    
    // Update the UI based on the action
    if (pendingAction === "solution") {
      setShowSolution(true);
    } else if (pendingAction === "lecture") {
      setShowMoreInfo(true);
    }
    
    setConfirmDialogOpen(false);
    setPendingAction(null);
  };

  return {
    showSolution,
    showHint,
    showMoreInfo,
    confirmDialogOpen,
    pendingAction,
    isValidating,
    validationMessage,
    isSolved,
    hasSolution,
    hasHint,
    hasLecture,
    setShowSolution,
    setShowHint,
    setShowMoreInfo,
    setConfirmDialogOpen,
    setPendingAction,
    handleSolutionRequest,
    handleLectureRequest,
    handleValidateSolution,
    handleConfirm
  };
};
