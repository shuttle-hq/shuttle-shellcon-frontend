
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Challenge as ChallengeType } from '../hooks/useAquariumData';
import { BookOpen, Check, ChevronDown, ChevronUp, Code, ExternalLink, HelpCircle, Info, X } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface ChallengeProps {
  challenge: ChallengeType;
}

const Challenge: React.FC<ChallengeProps> = ({ challenge }) => {
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const isSolved = challenge.status === 'solved';

  // Check if this challenge has a solution with code and lecture
  const hasSolution = challenge.solution && (
    typeof challenge.solution === 'string' || 
    (typeof challenge.solution === 'object' && 
      (challenge.solution.code || challenge.solution.explanation))
  );
  
  const hasHint = challenge.hint;
  
  const hasLecture = challenge.solution && 
    typeof challenge.solution === 'object' && 
    challenge.solution.lecture;

  return (
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
        <div className="mb-4 space-y-2">
          {challenge.service && (
            <div className="flex items-start gap-2 text-sm">
              <span className="font-semibold text-gray-400 min-w-[80px]">Service:</span>
              <span className="text-gray-300 bg-gray-700/40 px-2 py-1 rounded">{challenge.service}</span>
            </div>
          )}
          {challenge.file && (
            <div className="flex items-start gap-2 text-sm">
              <span className="font-semibold text-gray-400 min-w-[80px]">File:</span>
              <span className="text-gray-300 bg-gray-700/40 px-2 py-1 rounded font-mono text-xs">{challenge.file}</span>
            </div>
          )}
          {challenge.function && (
            <div className="flex items-start gap-2 text-sm">
              <span className="font-semibold text-gray-400 min-w-[80px]">Function:</span>
              <span className="text-gray-300 bg-gray-700/40 px-2 py-1 rounded font-mono text-xs">{challenge.function}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-2">
          {/* Hint Button */}
          {hasHint && (
            <Button
              variant="outline"
              size="sm"
              className="text-blue-400 border-blue-500 hover:bg-blue-500/10 hover:text-blue-300"
              onClick={() => setShowHint(!showHint)}
            >
              <HelpCircle className="h-4 w-4 mr-1" />
              {showHint ? "Hide Hint" : "Show Hint"}
            </Button>
          )}

          {/* Solution Button */}
          {hasSolution && (
            <Button
              variant="outline"
              size="sm"
              className="text-orange-400 border-orange-500 hover:bg-orange-500/10 hover:text-orange-300"
              onClick={() => setShowSolution(!showSolution)}
            >
              <Code className="h-4 w-4 mr-1" />
              {showSolution ? "Hide Solution" : "Show Solution"}
            </Button>
          )}

          {/* More Information Button - only shown if lecture is available */}
          {hasLecture && (
            <Button
              variant="outline"
              size="sm"
              className="text-green-400 border-green-500 hover:bg-green-500/10 hover:text-green-300"
              onClick={() => setShowMoreInfo(!showMoreInfo)}
            >
              <BookOpen className="h-4 w-4 mr-1" />
              {showMoreInfo ? "Hide Information" : "More Information"}
            </Button>
          )}
        </div>

        {/* Hint Section */}
        {showHint && hasHint && (
          <div className="mt-4 p-4 bg-blue-900/20 rounded-md border-2 border-blue-500/40 mb-4">
            <h4 className="font-bold mb-2 text-blue-300 flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Hint:
            </h4>
            <div className="text-gray-300">
              {challenge.hint}
            </div>
          </div>
        )}

        {/* Solution Section */}
        {showSolution && hasSolution && typeof challenge.solution === 'object' && (
          <div className="mt-4 p-4 bg-gray-900 rounded-md border-2 border-orange-500/40 mb-4">
            <h4 className="font-bold mb-2 text-orange-300 flex items-center gap-2">
              <Code className="h-4 w-4" />
              Solution:
            </h4>
            
            {/* Code Block */}
            {challenge.solution.code && (
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-orange-200 mb-1">Code Changes:</h5>
                <pre className="bg-black p-3 rounded font-mono text-xs overflow-x-auto text-gray-300">
                  {challenge.solution.code}
                </pre>
              </div>
            )}

            {/* Explanation */}
            {challenge.solution.explanation && (
              <div>
                <h5 className="text-sm font-semibold text-orange-200 mb-1">Explanation:</h5>
                <p className="text-gray-300">
                  {challenge.solution.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* More Information Section with Markdown */}
        {showMoreInfo && hasLecture && typeof challenge.solution === 'object' && challenge.solution.lecture && (
          <div className="mt-4 p-4 bg-green-900/20 rounded-md border-2 border-green-500/40">
            <h4 className="font-bold mb-2 text-green-300 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              More Information:
            </h4>
            <div className="text-gray-300 markdown-content prose prose-invert prose-sm max-w-none">
              <ReactMarkdown className="md-content">
                {challenge.solution.lecture}
              </ReactMarkdown>
            </div>
          </div>
        )}

        {/* Simple Solution Display - for backwards compatibility */}
        {showSolution && !hasSolution && typeof challenge.solution === 'string' && (
          <div className="mt-4 p-4 bg-gray-900 rounded-md border-2 border-orange-500/40">
            <h4 className="font-bold mb-2 text-orange-300">Solution:</h4>
            <div className="text-gray-300">
              {challenge.solution}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Challenge;
