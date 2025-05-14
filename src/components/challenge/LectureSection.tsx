
import React from 'react';
import { BookOpen } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface LectureSectionProps {
  lecture: string | undefined;
  isVisible: boolean;
}

const LectureSection: React.FC<LectureSectionProps> = ({ lecture, isVisible }) => {
  if (!isVisible || !lecture) return null;
  
  return (
    <div className="mt-4 p-4 bg-green-900/20 rounded-md border-2 border-green-500/40 animate-fade-in">
      <h4 className="font-bold mb-2 text-green-300 flex items-center gap-2">
        <BookOpen className="h-4 w-4" />
        More Information:
      </h4>
      <div className="text-gray-300 markdown-content prose prose-invert prose-sm max-w-none">
        <ReactMarkdown className="md-content">
          {lecture}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default LectureSection;
