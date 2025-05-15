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
  // Create unique keys for this challenge's localStorage items
  const challengeId = challenge.id.toString();
  const solutionConfirmKey = `shellcon_solution_confirmed_${challengeId}`;
  const lectureConfirmKey = `shellcon_lecture_confirmed_${challengeId}`;
  
  // Initialize state for showing various sections
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showMoreInfo, setShowMoreInfo] = useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<PendingActionType | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  
  // Initialize confirmed actions from localStorage
  const [confirmedActions, setConfirmedActions] = useState<Record<PendingActionType, boolean>>(() => ({
    solution: localStorage.getItem(solutionConfirmKey) === 'true',
    lecture: localStorage.getItem(lectureConfirmKey) === 'true'
  }));
  
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
    try {
      setIsValidating(true);
      setValidationMessage(null);

      // Get the correct validation endpoint from the challenge object
      let validationEndpoint = `/api/challenges/${challenge.id}/validate`;
      
      // Use the validation_endpoint from the challenge if available
      if (challenge.validation_endpoint && challenge.validation_endpoint.url) {
        // If the URL starts with '/', it's a relative path
        if (challenge.validation_endpoint.url.startsWith('/')) {
          validationEndpoint = challenge.validation_endpoint.url;
        } else {
          // Otherwise, prepend the API base URL
          validationEndpoint = `${API_BASE_URL}/${challenge.validation_endpoint.url}`;
        }
      }
      
      console.log(`Validating challenge ${challenge.id} using endpoint: ${validationEndpoint}`);
      
      // Call the validation endpoint
      const response = await fetch(validationEndpoint);
      
      // Check if response is ok before trying to parse JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Validation error (${response.status}):`, errorText);
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      // Safely parse the JSON response
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        throw new Error('Invalid response format from server');
      }

      // Check if the response has the expected format
      if (data.valid !== undefined) {
        // New API format
        setIsSolved(data.valid);
        setValidationMessage(data.message || (data.valid ? "Great job! Challenge successfully solved!" : "Validation failed. Please check your implementation."));
        
        // Only show success toast, not failure toast
        if (data.valid) {
          toast({
            title: "Challenge Completed!",
            description: `You've successfully solved: ${challenge.title}`,
            variant: "default"
          });
        }
        
        // Update system status if provided
        if (onSystemStatusUpdate && data.system_component) {
          onSystemStatusUpdate({
            [`${challenge.id === 1 ? 'environmental_monitoring' : 
               challenge.id === 2 ? 'species_database' : 
               challenge.id === 3 ? 'feeding_system' : 
               challenge.id === 4 ? 'remote_monitoring' : 
               challenge.id === 5 ? 'analysis_engine' : ''}`]: data.valid ? 'normal' : (challenge.id === 3 ? 'error' : 'degraded')
          });
        }
      } else if (data.success !== undefined) {
        // Old API format
        setIsSolved(data.success);
        setValidationMessage(data.message || (data.success ? "Great job! Challenge successfully solved!" : "Validation failed. Please check your implementation."));
        
        // Only show success toast, not failure toast
        if (data.success) {
          toast({
            title: "Challenge Completed!",
            description: `You've successfully solved: ${challenge.title}`,
            variant: "default"
          });
        }
        
        // Update system status if provided
        if (onSystemStatusUpdate && data.systemStatus) {
          onSystemStatusUpdate(data.systemStatus);
        }
      } else {
        // Unknown response format
        console.warn('Unknown validation response format:', data);
        setValidationMessage("Received an unexpected response format from the server.");
        
        toast({
          title: "Validation Error",
          description: "Received an unexpected response format from the server.",
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
      // Mark solution action as confirmed and save to localStorage
      localStorage.setItem(solutionConfirmKey, 'true');
      setConfirmedActions(prev => ({ ...prev, solution: true }));
    } else if (pendingAction === "lecture") {
      setShowMoreInfo(true);
      // Mark lecture action as confirmed and save to localStorage
      localStorage.setItem(lectureConfirmKey, 'true');
      setConfirmedActions(prev => ({ ...prev, lecture: true }));
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
