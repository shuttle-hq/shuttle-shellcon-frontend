
import React from 'react';
import { Code } from "lucide-react";

interface SolutionProps {
  solution: string | {
    code?: string;
    explanation?: string;
    lecture?: string;
  };
  isVisible: boolean;
}

const SolutionSection: React.FC<SolutionProps> = ({ solution, isVisible }) => {
  if (!isVisible || !solution) return null;

  // Handle string solution (backward compatibility)
  if (typeof solution === 'string') {
    return (
      <div className="mt-4 p-4 bg-gray-900 rounded-md border-2 border-orange-500/40 animate-fade-in">
        <h4 className="font-bold mb-2 text-orange-300">Solution:</h4>
        <div className="text-gray-300">{solution}</div>
      </div>
    );
  }

  // Handle object solution
  if (!solution.code && !solution.explanation) return null;

  return (
    <div className="mt-4 p-4 bg-gray-900 rounded-md border-2 border-orange-500/40 mb-4 animate-fade-in">
      <h4 className="font-bold mb-2 text-orange-300 flex items-center gap-2">
        <Code className="h-4 w-4" />
        Solution:
      </h4>
      
      {/* Code Block */}
      {solution.code && (
        <div className="mb-4">
          <h5 className="text-sm font-semibold text-orange-200 mb-1">Code Changes:</h5>
          <pre className="bg-black p-3 rounded font-mono text-xs overflow-x-auto text-gray-300">
            {solution.code}
          </pre>
        </div>
      )}

      {/* Explanation */}
      {solution.explanation && (
        <div>
          <h5 className="text-sm font-semibold text-orange-200 mb-1">Explanation:</h5>
          <p className="text-gray-300">{solution.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default SolutionSection;
