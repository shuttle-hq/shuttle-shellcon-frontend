
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import Challenge from './Challenge';
import { useChallenges } from '../hooks/useAquariumData';
import { AlertCircle, List, Trophy, Loader2 } from "lucide-react";

const ChallengeList: React.FC = () => {
  const { challengesData, loading, error } = useChallenges();
  
  // Fallback challenges in case API is unavailable
  const fallbackChallenges = [
    {
      id: 1,
      name: "latency-mystery",
      title: "The Sluggish Sensor",
      status: "pending",
      description: "Optimize the code to reduce latency in the environmental sensor data processing.",
      solution: "Implement caching for frequently accessed sensor data and optimize the database query patterns."
    },
    {
      id: 2,
      name: "database-dilemma",
      title: "Database Dilemma",
      status: "pending",
      description: "Address the database inefficiencies causing slow species information retrieval.",
      solution: "Use proper indexing for commonly queried fields and implement connection pooling."
    },
    {
      id: 3,
      name: "error-enigma",
      title: "Error Handling Enigma",
      status: "pending",
      description: "Fix the error handling mechanisms that are causing unexpected service crashes.",
      solution: "Implement proper error propagation and recovery strategies using Rust's Result type."
    },
    {
      id: 4,
      name: "memory-monster",
      title: "The Memory Monster",
      status: "pending",
      description: "Address resource management issues creating memory leaks.",
      solution: "Ensure proper cleanup of resources using RAII patterns and avoid unnecessary cloning of large data structures."
    },
    {
      id: 5,
      name: "concurrency-conundrum",
      title: "Concurrency Conundrum",
      status: "pending",
      description: "Optimize concurrency patterns that are limiting throughput and scalability.",
      solution: "Implement async/await patterns properly and use appropriate synchronization primitives."
    }
  ];

  const challenges = challengesData?.challenges || fallbackChallenges;
  const solved = challengesData?.solved || 0;
  const total = challengesData?.total || fallbackChallenges.length;

  return (
    <Card className="border-orange-500/30 bg-gray-800 shadow-lg">
      <CardHeader className="bg-gray-900 text-white border-b border-orange-500/20">
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <List className="h-5 w-5 text-orange-400" />
            Optimization Challenges
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-orange-400" />
            <span>{solved} of {total} challenges solved</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {loading && (
          <div className="space-y-4">
            <div className="flex justify-center items-center py-4">
              <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-10 w-full bg-gray-700" />
                <Skeleton className="h-24 w-full bg-gray-700" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error} - Using fallback challenges data
            </AlertDescription>
          </Alert>
        )}

        {!loading && (
          <div>
            {challenges.map((challenge) => (
              <Challenge key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChallengeList;
