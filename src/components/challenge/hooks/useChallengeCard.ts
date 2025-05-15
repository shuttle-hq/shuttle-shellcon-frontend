import { useState } from 'react';
import { Challenge } from '../../../hooks/useAquariumData';
import { validateChallengeSolution } from './useChallengeValidation';
import { useChallengeStorage, ConfirmedActions } from './useChallengeStorage';

export type PendingActionType = "solution" | "lecture";

interface UseChallengeCardProps {
  challenge: Challenge;
  onSystemStatusUpdate?: (status: any) => void;
}

export const useChallengeCard = ({ challenge, onSystemStatusUpdate }: UseChallengeCardProps) => {
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

  const handleSolutionRequest = () => {
    if (showSolution) {
      // If solution is already visible, hide it
      setShowSolution(false);
    } else if (confirmedActions.solution) {
      // If user has already confirmed this action before, show solution without confirmation
      setShowSolution(true);
    } else {
      // Otherwise, show the confirmation dialog
      setPendingAction("solution");
      setConfirmDialogOpen(true);
    }
  };

  const handleLectureRequest = () => {
    if (showMoreInfo) {
      // If lecture is already visible, hide it
      setShowMoreInfo(false);
    } else if (confirmedActions.lecture) {
      // If user has already confirmed this action before, show lecture without confirmation
      setShowMoreInfo(true);
    } else {
      // Otherwise, show the confirmation dialog
      setPendingAction("lecture");
      setConfirmDialogOpen(true);
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
    
    if (pendingAction === "solution") {
      setShowSolution(true);
      saveConfirmation("solution");
    } else if (pendingAction === "lecture") {
      setShowMoreInfo(true);
      saveConfirmation("lecture");
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
