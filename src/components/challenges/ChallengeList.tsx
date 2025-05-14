import React, { useState } from 'react';
import Challenge from './Challenge';
import { useChallenges, Challenge as ChallengeType } from '@/hooks/useChallenges';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ChallengeList = () => {
  const { challenges, loading, error, stats, refreshChallenges } = useChallenges();
  const [currentChallenge, setCurrentChallenge] = useState<ChallengeType | null>(null);

  const handleRefresh = () => {
    refreshChallenges();
  };
  
  // When challenges load, set the first challenge as current if none selected
  React.useEffect(() => {
    if (challenges.length > 0 && !currentChallenge) {
      setCurrentChallenge(challenges[0]);
    }
  }, [challenges, currentChallenge]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/30 border border-red-500 text-white rounded-md">
        <h3 className="text-lg font-medium">Failed to load challenges</h3>
        <p className="mt-1 text-sm text-gray-300">{error}</p>
      </div>
    );
  }

  const progressPercentage = stats.total > 0 
    ? Math.round((stats.solved / stats.total) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card className="border-2 border-orange-500/30 bg-gray-900 text-white">
        <CardHeader className="bg-gray-850 border-b border-orange-500/40">
          <div className="flex justify-between items-center">
            <CardTitle className="text-orange-400">
              Challenge Progress
            </CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-orange-400"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex justify-between mb-2 text-sm">
            <span>{stats.solved} solved</span>
            <span>{stats.total} total</span>
          </div>
          <Progress value={progressPercentage} className="h-2 bg-gray-700" />
        </CardContent>
      </Card>
      
      {/* Current Challenge */}
      {currentChallenge && (
        <Challenge challenge={currentChallenge} />
      )}
      
      {/* Challenge Navigation (for multiple challenges) */}
      {challenges.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {challenges.map(challenge => (
            <Button
              key={challenge.id}
              variant={challenge.id === currentChallenge?.id ? "default" : "outline"}
              size="sm"
              className={`
                ${challenge.id === currentChallenge?.id 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                  : 'border-orange-500/50 text-orange-400 hover:bg-gray-800'}
              `}
              onClick={() => setCurrentChallenge(challenge)}
            >
              {challenge.title}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChallengeList;
