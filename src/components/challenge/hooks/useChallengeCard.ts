
import { useState, useCallback } from 'react';
import { Challenge } from '../../../hooks/useAquariumData';
import { toast } from '@/hooks/use-toast';
import { API_BASE_URL } from '../../../config/api';

interface UseChallengeCardProps {
  challenge: Challenge;
  onSystemStatusUpdate?: (status: any) => void;
}

// Define the allowed pending action types
export type PendingActionType = 'solution' | 'lecture';

export const useChallengeCard = ({ challenge, onSystemStatusUpdate }: UseChallengeCardProps) => {
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<PendingActionType | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const isSolved = challenge.status === 'solved';

  // Determine if the challenge has a hint, solution, or lecture
  const hasHint = !!challenge.hint;
  const hasSolution = !!challenge.solution;

  // Check if there's a lecture available in the solution object
  const hasLecture = typeof challenge.solution === 'object' && !!challenge.solution.lecture;

  // Request to view the solution (with confirmation)
  const handleSolutionRequest = useCallback(() => {
    setPendingAction('solution');
    setConfirmDialogOpen(true);
  }, []);

  // Request to view more information / lecture (with confirmation)
  const handleLectureRequest = useCallback(() => {
    setPendingAction('lecture');
    setConfirmDialogOpen(true);
  }, []);

  // Confirm dialog action
  const handleConfirm = useCallback(() => {
    if (pendingAction === 'solution') {
      setShowSolution(true);
    } else if (pendingAction === 'lecture') {
      setShowMoreInfo(true);
    }
    
    // Close the dialog
    setConfirmDialogOpen(false);
  }, [pendingAction]);

  // Validate the solution
  const handleValidateSolution = useCallback(async () => {
    if (!challenge.id || isValidating) return;

    setIsValidating(true);
    setValidationMessage(null);

    try {
      // Mock API call for the demo
      const response = await fetch(`${API_BASE_URL}/challenges/${challenge.id}/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        // Check if data.implementation.valid exists (it's our expected response format)
        const isValid = data?.implementation?.valid;

        if (isValid) {
          setValidationMessage("🎉 Challenge successfully solved!");
          toast({
            title: "Challenge solved!",
            description: `You've successfully solved the "${challenge.title}" challenge!`,
            variant: "default" // Changed from "success" to "default"
          });

          // The API returns an updated system status that we need to pass back
          // to update the SystemStatus component
          if (onSystemStatusUpdate && data.system_status) {
            onSystemStatusUpdate(data.system_status);
          }
        } else {
          // Not valid, show the error message
          const message = data?.implementation?.message || "The solution doesn't meet all requirements yet.";
          setValidationMessage(`⚠️ ${message}`);
          toast({
            title: "Not quite right",
            description: message,
            variant: "default" // Changed from "warning" to "default"
          });
        }
      } else {
        throw new Error(data.message || 'Failed to validate solution');
      }
    } catch (error) {
      console.error("Error validating solution:", error);
      setValidationMessage("⚠️ Error validating solution. Please try again.");
      toast({
        title: "Error",
        description: "Failed to validate the solution. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  }, [challenge.id, challenge.title, isValidating, onSystemStatusUpdate]);

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
    handleSolutionRequest,
    handleLectureRequest,
    handleValidateSolution,
    handleConfirm
  };
};
