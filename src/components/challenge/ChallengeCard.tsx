
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Challenge as ChallengeType } from '../../hooks/useAquariumData';
import { Check, X } from "lucide-react";
import ChallengeMetadata from './ChallengeMetadata';
import ActionButtons from './ActionButtons';
import HintSection from './HintSection';
import SolutionSection from './SolutionSection';
import LectureSection from './LectureSection';
import ConfirmationDialog from './ConfirmationDialog';
import { validateChallengeSolution } from '../../api/aquariumApi';

interface ChallengeCardProps {
  challenge: ChallengeType;
  onSystemStatusUpdate?: (status: any) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onSystemStatusUpdate }) => {
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
          {validationMessage && (
            <div className={`mb-4 p-3 rounded border ${isSolved ? 'border-green-500/40 bg-green-900/20 text-green-400' : 'border-orange-500/40 bg-orange-900/20 text-orange-400'}`}>
              {validationMessage}
            </div>
          )}

          {/* Action Buttons */}
          <ActionButtons 
            hasHint={hasHint}
            hasSolution={hasSolution}
            hasLecture={hasLecture}
            showHint={showHint}
            showSolution={showSolution}
            showMoreInfo={showMoreInfo}
            onToggleHint={() => setShowHint(!showHint)}
            onSolutionRequest={handleSolutionRequest}
            onLectureRequest={handleLectureRequest}
            onValidateRequest={handleValidateSolution}
            isValidating={isValidating}
            challengeId={challenge.id}
          />

          {/* Hint Section */}
          <HintSection 
            hint={challenge.hint} 
            isVisible={showHint} 
          />

          {/* Solution Section - Fix the boolean prop issue */}
          <SolutionSection 
            solution={challenge.solution} 
            isVisible={showSolution} 
          />

          {/* More Information Section with Markdown */}
          {typeof challenge.solution === 'object' && (
            <LectureSection 
              lecture={challenge.solution.lecture} 
              isVisible={showMoreInfo} 
            />
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <ConfirmationDialog 
        isOpen={confirmDialogOpen} 
        onOpenChange={setConfirmDialogOpen} 
        onConfirm={handleConfirm} 
        pendingAction={pendingAction} 
      />
    </>
  );
};

export default ChallengeCard;
