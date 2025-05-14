
import { useState } from 'react';
import { Challenge } from '../../../hooks/useAquariumData';
import { API_BASE_URL } from '../../../config/api';
import { toast } from '../../../hooks/use-toast';

export type PendingActionType = "solution" | "lecture";

interface UseChallengeCardProps {
  challenge: Challenge;
  onSystemStatusUpdate?: (status: any) => void;
}

export const useChallengeCard = ({ challenge, onSystemStatusUpdate }: UseChallengeCardProps) => {
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<PendingActionType | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  
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
      setShowSolution(false);
    } else {
      setPendingAction("solution");
      setConfirmDialogOpen(true);
    }
  };

  const handleLectureRequest = () => {
    if (showMoreInfo) {
      setShowMoreInfo(false);
    } else {
      setPendingAction("lecture");
      setConfirmDialogOpen(true);
    }
  };

  const handleValidateSolution = async () => {
    try {
      setIsValidating(true);
      setValidationMessage(null);

      // Simulate API call to validate solution
      const response = await fetch(`${API_BASE_URL}/validate/${challenge.name}`);
      const data = await response.json();

      if (data.success) {
        setIsSolved(true);
        setValidationMessage(data.message || "Great job! Challenge successfully solved!");
        
        // Show success toast
        toast({
          title: "Challenge Completed!",
          description: `You've successfully solved: ${challenge.title}`,
          variant: "default"
        });
        
        // Update system status if provided
        if (onSystemStatusUpdate && data.systemStatus) {
          onSystemStatusUpdate(data.systemStatus);
        }
      } else {
        setValidationMessage(data.message || "Validation failed. Please check your implementation.");
        
        // Show warning toast
        toast({
          title: "Validation Failed",
          description: data.message || "Your solution doesn't quite match what we're looking for.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error validating solution:', error);
      setValidationMessage("Error validating solution. Please try again later.");
      
      // Show error toast
      toast({
        title: "Validation Error",
        description: "We encountered a technical issue checking your solution.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  const handleConfirm = () => {
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
