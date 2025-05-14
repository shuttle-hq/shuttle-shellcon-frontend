
import React from 'react';
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
import { useChallengeCard } from './hooks/useChallengeCard';

interface ChallengeCardProps {
  challenge: ChallengeType;
  onSystemStatusUpdate?: (status: any) => void;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onSystemStatusUpdate }) => {
  const {
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
  } = useChallengeCard({ challenge, onSystemStatusUpdate });

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
          {typeof challenge.solution === 'object' && (
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
        onOpenChange={setConfirmDialogOpen} 
        onConfirm={handleConfirm} 
        pendingAction={pendingAction} 
      />
    </>
  );
};

export default ChallengeCard;
