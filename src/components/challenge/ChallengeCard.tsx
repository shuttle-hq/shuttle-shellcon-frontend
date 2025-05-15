
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Challenge as ChallengeType } from '../../hooks/useAquariumData';
import { Check, X } from "lucide-react";
import ChallengeMetadata from './ChallengeMetadata';
import ActionButtons from './ActionButtons';
import HintSection from './HintSection';
import SolutionSection from './SolutionSection';
import LectureSection from './LectureSection';
import ConfirmationDialog from './ConfirmationDialog';
import ValidationMessage from './ValidationMessage';
import { useChallengeCard, PendingActionType } from './hooks/useChallengeCard';

interface ChallengeCardProps {
  challenge: ChallengeType;
  onSystemStatusUpdate?: (status: any) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onSystemStatusUpdate }) => {
  // State for showing content
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingActionType | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  
  // State for challenge status - check localStorage first
  const solvedChallengesKey = 'solved_challenges';
  const [isSolved, setIsSolved] = useState(() => {
    // Check if this challenge is marked as solved in localStorage
    const solvedChallenges = localStorage.getItem(solvedChallengesKey);
    if (solvedChallenges) {
      try {
        const parsedChallenges = JSON.parse(solvedChallenges);
        if (Array.isArray(parsedChallenges) && parsedChallenges.includes(challenge.id)) {
          return true;
        }
      } catch (e) {
        console.error('Error parsing solved challenges from localStorage:', e);
      }
    }
    // Fall back to the challenge status from props
    return challenge.status === 'solved';
  });
  
  // Track if the user has seen any dialog for this challenge
  const [seenDialogs, setSeenDialogs] = useState<Set<string>>(new Set());
  
  // Check if challenge has these properties
  const hasSolution = Boolean(challenge.solution);
  const hasHint = Boolean(challenge.hint);
  const hasLecture = typeof challenge.solution === 'object' && Boolean(challenge.solution.lecture);
  
  // Handle solution request
  const handleSolutionRequest = () => {
    // If solution is already visible, hide it
    if (showSolution) {
      setShowSolution(false);
      return;
    }
    
    // If user has already seen a dialog for this challenge, don't show it again
    if (seenDialogs.has(challenge.name)) {
      setShowSolution(true);
      return;
    }
    
    // Otherwise, show the confirmation dialog
    setPendingAction('solution');
    setConfirmDialogOpen(true);
  };
  
  // Handle lecture request
  const handleLectureRequest = () => {
    // If lecture is already visible, hide it
    if (showMoreInfo) {
      setShowMoreInfo(false);
      return;
    }
    
    // If user has already seen a dialog for this challenge, don't show it again
    if (seenDialogs.has(challenge.name)) {
      setShowMoreInfo(true);
      return;
    }
    
    // Otherwise, show the confirmation dialog
    setPendingAction('lecture');
    setConfirmDialogOpen(true);
  };
  
  // Handle validation
  const handleValidateSolution = async () => {
    setIsValidating(true);
    setValidationMessage(null);
    
    try {
      const { validateChallengeSolution } = await import('./hooks/useChallengeValidation');
      const result = await validateChallengeSolution(challenge, onSystemStatusUpdate);
      
      // If validation was successful, update the solved state
      if (result.isValid) {
        setIsSolved(true);
        
        // Persist the solved state to localStorage
        try {
          // Get the current solved challenges or initialize an empty array
          const solvedChallengesStr = localStorage.getItem(solvedChallengesKey);
          const solvedChallenges = solvedChallengesStr ? JSON.parse(solvedChallengesStr) : [];
          
          // Add this challenge ID if it's not already in the array
          if (!solvedChallenges.includes(challenge.id)) {
            solvedChallenges.push(challenge.id);
            localStorage.setItem(solvedChallengesKey, JSON.stringify(solvedChallenges));
            console.log(`Challenge ${challenge.id} marked as solved in localStorage`);
          }
        } catch (storageError) {
          console.error('Error saving solved challenge to localStorage:', storageError);
        }
      } else {
        setIsSolved(false);
      }
      
      setValidationMessage(result.message);
    } catch (error) {
      console.error('Error validating solution:', error);
      setValidationMessage('Error validating solution. Please try again later.');
    } finally {
      setIsValidating(false);
    }
  };
  
  // Handle confirmation
  const handleConfirm = () => {
    if (!pendingAction) return;
    
    // Mark this challenge as having shown a dialog
    setSeenDialogs(prev => new Set(prev).add(challenge.name));
    
    // Save to localStorage for persistence
    if (pendingAction === 'solution') {
      localStorage.setItem(`shellcon_solution_confirmed_${challenge.id}`, 'true');
      setShowSolution(true);
    } else if (pendingAction === 'lecture') {
      localStorage.setItem(`shellcon_lecture_confirmed_${challenge.id}`, 'true');
      setShowMoreInfo(true);
    }
    
    setConfirmDialogOpen(false);
    setPendingAction(null);
  };

  return (
    <>
      <Card className={`mb-4 border ${isSolved ? 'border-green-500/40' : 'border-orange-500/40'} bg-gray-900 shadow-md hover:shadow-lg transition-all duration-300`}>
        <CardHeader className="bg-gray-900 pb-2 border-b-2 border-gray-700">
          <CardTitle className="text-lg flex justify-between">
            <div className="flex items-center gap-2 text-white">
              {challenge.title}
              <span className="text-xs px-2 py-1 rounded bg-gray-700 text-gray-300">
                {challenge.name}
              </span>
            </div>
            <div>
              {isSolved ? (
                <div className="flex items-center gap-1 text-green-400 bg-green-900/40 px-2 py-1 rounded text-xs font-semibold">
                  <Check className="h-3 w-3" />
                  Solved
                </div>
              ) : (
                <div className="flex items-center gap-1 text-orange-400 bg-orange-900/40 px-2 py-1 rounded text-xs font-semibold">
                  <X className="h-3 w-3" />
                  Pending
                </div>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="mb-4 text-gray-300">{challenge.description || "No description available"}</p>
          
          {/* Service, File and Function Information */}
          <ChallengeMetadata 
            service={challenge.service}
            file={challenge.file}
            function={challenge.function}
          />

          {/* Validation Message */}
          <ValidationMessage message={validationMessage} isSolved={isSolved} />

          {/* Action Buttons */}
          <ActionButtons 
            hasHint={hasHint}
            hasSolution={hasSolution}
            hasLecture={hasLecture}
            showHint={showHint}
            showSolution={showSolution === true} 
            showMoreInfo={showMoreInfo === true}
            onToggleHint={() => setShowHint(!showHint)}
            onSolutionRequest={handleSolutionRequest}
            onLectureRequest={handleLectureRequest}
            onValidateRequest={handleValidateSolution}
            isValidating={isValidating}
            challengeId={typeof challenge.id === 'number' ? challenge.id : 0}
          />

          {/* Hint Section */}
          <HintSection 
            hint={challenge.hint} 
            isVisible={showHint === true} 
          />

          {/* Solution Section */}
          <SolutionSection 
            solution={challenge.solution} 
            isVisible={showSolution === true} 
          />

          {/* More Information Section with Markdown */}
          {typeof challenge.solution === 'object' && challenge.solution.lecture && (
            <LectureSection 
              lecture={challenge.solution.lecture} 
              isVisible={showMoreInfo === true} 
            />
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <ConfirmationDialog 
        isOpen={confirmDialogOpen} 
        onOpenChange={(open) => {
          if (!open) {
            setConfirmDialogOpen(false);
          }
        }} 
        onConfirm={handleConfirm} 
        pendingAction={pendingAction as PendingActionType} 
      />
    </>
  );
};

export default ChallengeCard;
