
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Challenge as ChallengeType } from '../hooks/useAquariumData';
import { Check, X } from "lucide-react";

interface ChallengeProps {
  challenge: ChallengeType;
}

const Challenge: React.FC<ChallengeProps> = ({ challenge }) => {
  const [showSolution, setShowSolution] = useState(false);

  const isSolved = challenge.status === 'solved';

  return (
    <Card className={`mb-4 border-l-4 ${isSolved ? 'border-l-green-500' : 'border-l-orange-500'}`}>
      <CardHeader className="bg-gray-50 pb-2">
        <CardTitle className="text-lg flex justify-between">
          <div className="flex items-center gap-2">
            {challenge.title}
            <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
              {challenge.name}
            </span>
          </div>
          <div>
            {isSolved ? (
              <div className="flex items-center gap-1 text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-semibold">
                <Check className="h-3 w-3" />
                Solved
              </div>
            ) : (
              <div className="flex items-center gap-1 text-orange-600 bg-orange-100 px-2 py-1 rounded text-xs font-semibold">
                <X className="h-3 w-3" />
                Pending
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="mb-4 text-gray-700">{challenge.description || "No description available"}</p>
        
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="text-orange-500 border-orange-500 hover:bg-orange-50"
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? "Hide Solution" : "Show Solution"}
          </Button>
        </div>

        {showSolution && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md border border-gray-200">
            <h4 className="font-bold mb-2 text-gray-800">Solution:</h4>
            <div className="text-gray-700">
              {challenge.solution || "Solution content will be available once implemented."}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Challenge;
