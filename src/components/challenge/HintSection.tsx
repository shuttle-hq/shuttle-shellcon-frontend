
import React from 'react';
import { HelpCircle } from "lucide-react";

interface HintSectionProps {
  hint: string | undefined;
  isVisible: boolean;
}

const HintSection: React.FC<HintSectionProps> = ({ hint, isVisible }) => {
  if (!isVisible || !hint) return null;
  
  return (
    <div className="mt-4 p-4 bg-blue-900/20 rounded-md border-2 border-blue-500/40 mb-4">
      <h4 className="font-bold mb-2 text-blue-300 flex items-center gap-2">
        <HelpCircle className="h-4 w-4" />
        Hint:
      </h4>
      <div className="text-gray-300">
        {hint}
      </div>
    </div>
  );
};

export default HintSection;
