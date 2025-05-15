import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import Challenge from './Challenge';
import { useChallenges, useSystemStatus } from '../hooks/useAquariumData';
import { AlertCircle, List, Trophy, Loader2, Target } from "lucide-react";

const ChallengeList: React.FC = () => {
  const { challengesData, loading, error } = useChallenges();
  const { status, setStatus } = useSystemStatus();
  
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

  const handleSystemStatusUpdate = (systemStatus: any) => {
    console.log('handleSystemStatusUpdate called with:', JSON.stringify(systemStatus));
    
    if (!systemStatus) {
      console.warn('System status update called with null or undefined value');
      return;
    }
    
    if (setStatus) {
      // Update the system status with the returned values
      setStatus((prevStatus) => {
        console.log('Previous status:', JSON.stringify(prevStatus));
        
        if (!prevStatus) {
          console.warn('Previous status is null, cannot update');
          return prevStatus;
        }
        
        const updatedStatus = { ...prevStatus };
        
        // Update specific system components if provided
        Object.keys(systemStatus).forEach(key => {
          console.log(`Checking key: ${key}, exists in status: ${key in updatedStatus}`);
          
          if (key in updatedStatus) {
            const oldValue = updatedStatus[key];
            // @ts-ignore - We know these properties exist
            updatedStatus[key] = systemStatus[key];
            console.log(`Updated ${key} from ${oldValue} to ${systemStatus[key]}`);
          } else {
            console.warn(`Key ${key} not found in status object`);
          }
        });
        
        // Calculate new overall status based on component statuses
        const componentStatuses = [
          updatedStatus.environmental_monitoring,
          updatedStatus.species_database,
          updatedStatus.feeding_system,
          updatedStatus.remote_monitoring,
          updatedStatus.analysis_engine
        ];
        
        // Update the overall status based on the worst component status
        if (componentStatuses.includes('error')) {
          updatedStatus.overall_status = 'critical';
        } else if (componentStatuses.includes('degraded')) {
          updatedStatus.overall_status = 'degraded';
        } else {
          updatedStatus.overall_status = 'normal';
        }
        
        // Update timestamp
        updatedStatus.last_updated = new Date().toISOString();
        
        // Save the updated status to localStorage to persist between page reloads
        try {
          // Directly save the updated status to localStorage
          const statusKey = 'system_status';
          localStorage.setItem(statusKey, JSON.stringify(updatedStatus));
          console.log('Final system status saved to localStorage:', JSON.stringify(updatedStatus));
        } catch (error) {
          console.error('Error saving system status to localStorage:', error);
        }
        
        console.log('Returning updated status:', JSON.stringify(updatedStatus));
        return updatedStatus;
      });
    } else {
      console.error('setStatus function is not available, cannot update system status');
    }
  };

  return (
    <Card className="border-orange-500/40 bg-gray-800 shadow-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b border-orange-500/30 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle 
            className="card-header-title flex items-center gap-2"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              color: 'transparent',
              backgroundImage: 'linear-gradient(to bottom right, #f97316, #fbbf24, #f59e0b)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              textShadow: '0 0 15px rgba(249, 115, 22, 0.2)'
            }}
          >
            <Target className="h-5 w-5 text-orange-400" />
            Optimization Challenges
          </CardTitle>
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="h-4 w-4 text-orange-400" />
            <span>{solved} of {total} challenges solved</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 bg-gradient-to-b from-gray-900/80 to-black">
        {loading && (
          <div className="space-y-4">
            <div className="flex justify-center items-center py-4">
              <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
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
              <Challenge 
                key={challenge.id} 
                challenge={challenge} 
                onSystemStatusUpdate={handleSystemStatusUpdate} 
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChallengeList;
