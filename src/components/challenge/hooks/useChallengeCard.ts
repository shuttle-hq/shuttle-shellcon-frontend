
import { useState } from 'react';
import { Challenge } from '../../../hooks/useAquariumData';
import { validateChallengeSolution } from '../../../api/aquariumApi';

interface UseChallengeCardProps {
  challenge: Challenge;
  onSystemStatusUpdate?: (status: any) => void;
}

export function useChallengeCard({ challenge, onSystemStatusUpdate }: UseChallengeCardProps) {
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<'solution' | 'lecture' | null>(null);
  const [seenDialogs, setSeenDialogs] = useState<Set<string>>(new Set());
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const isSolved = challenge.status === 'solved';

  // Check if this challenge has a solution with code and lecture
  const hasSolution = challenge.solution && (
    typeof challenge.solution === 'string' || 
    (typeof challenge.solution === 'object' && 
      (challenge.solution.code || challenge.solution.explanation))
  );
  
  const hasHint = !!challenge.hint;
  
  const hasLecture = challenge.solution && 
    typeof challenge.solution === 'object' && 
    !!challenge.solution.lecture;

  const handleSolutionRequest = () => {
    // If solution has already been shown, show it without dialog
    if (showSolution) {
      setShowSolution(false);
      return;
    }
    
    // If user has already seen a dialog for this challenge, don't show it again
    if (seenDialogs.has(challenge.name)) {
      setShowSolution(true);
      return;
    }
    
    setPendingAction('solution');
    setConfirmDialogOpen(true);
  };

  const handleLectureRequest = () => {
    // If lecture has already been shown, show it without dialog
    if (showMoreInfo) {
      setShowMoreInfo(false);
      return;
    }
    
    // If user has already seen a dialog for this challenge, don't show it again
    if (seenDialogs.has(challenge.name)) {
      setShowMoreInfo(true);
      return;
    }
    
    setPendingAction('lecture');
    setConfirmDialogOpen(true);
  };

  const handleValidateSolution = async () => {
    if (!challenge.id) {
      setValidationMessage("Challenge ID is missing. Cannot validate solution.");
      return;
    }

    setIsValidating(true);
    setValidationMessage(null);
    
    try {
      console.log(`Attempting to validate challenge ${challenge.id}`);
      const response = await validateChallengeSolution(challenge.id);
      
      // Update UI based on response
      if (response.implementation && response.implementation.valid) {
        setValidationMessage(response.implementation.message);
        
        // If the challenge status was updated, we can update it locally too
        if (response.challenge && response.challenge.status === "SOLVED") {
          // We'd update the challenge status in the parent component
          challenge.status = "solved";
        }
        
        // Update system status if provided
        if (response.system_status && onSystemStatusUpdate) {
          onSystemStatusUpdate(response.system_status);
        }
      } else {
        setValidationMessage(response.implementation?.message || "Validation failed with no specific message");
      }
    } catch (error) {
      console.error("Error validating solution:", error);
      setValidationMessage("Failed to validate your solution. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  const handleConfirm = () => {
    // Mark this challenge as having shown a dialog
    setSeenDialogs(prev => new Set(prev).add(challenge.name));
    
    if (pendingAction === 'solution') {
      setShowSolution(true);
    } else if (pendingAction === 'lecture') {
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
    setShowHint,
    setConfirmDialogOpen,
    handleSolutionRequest,
    handleLectureRequest,
    handleValidateSolution,
    handleConfirm
  };
}
