import React from 'react';
import { cn } from "@/lib/utils";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: string;
  type?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  type = '',
  className,
  ...props 
}) => {
  // Helper function to get status color that won't change on hover
  const getStatusColor = (status: string, type: string) => {
    if (status === 'normal' || status === 'online') {
      return 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/20 hover:text-green-400';
    }
    
    if (type === 'overall_health' || type === '') {
      switch (status) {
        case 'good':
          return 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/20 hover:text-green-400';
        case 'caution':
          return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20 hover:text-yellow-400';
        case 'at_risk':
          return 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/20 hover:text-red-400';
        case 'degraded':
          return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20 hover:text-yellow-400';
        case 'critical':
          return 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/20 hover:text-red-400';
        case 'offline':
          return 'bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/20 hover:text-gray-400';
        default:
          return 'bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/20 hover:text-gray-400';
      }
    }
    
    if (status === 'high' || status === 'excess') {
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/20 hover:text-orange-400';
    }
    
    if (status === 'low' || status === 'overdue') {
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/20 hover:text-blue-400';
    }
    
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/20 hover:text-gray-400';
  };

  const displayText = status.replace('_', ' ').toUpperCase();
  
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-none whitespace-nowrap",
        getStatusColor(status, type),
        className
      )}
      {...props}
    >
      {displayText}
    </div>
  );
};
