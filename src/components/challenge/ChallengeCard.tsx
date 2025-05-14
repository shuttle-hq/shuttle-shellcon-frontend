
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

interface ChallengeCardProps {
  challenge: ChallengeType;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'solution' | 'lecture' | null>(null);
  const [seenDialogs, setSeenDialogs] = useState<Set<string>>(new Set());

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
          />

          {/* Hint Section */}
          <HintSection 
            hint={challenge.hint} 
            isVisible={Boolean(showHint)} 
          />

          {/* Solution Section */}
          <SolutionSection 
            solution={challenge.solution} 
            isVisible={Boolean(showSolution)} 
          />

          {/* More Information Section with Markdown */}
          {typeof challenge.solution === 'object' && (
            <LectureSection 
              lecture={challenge.solution.lecture} 
              isVisible={Boolean(showMoreInfo)} 
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
