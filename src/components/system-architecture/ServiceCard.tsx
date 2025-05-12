
import React, { ReactNode } from 'react';
import { Card } from "@/components/ui/card";
import { ActivitySquare, BrainCircuit, MonitorSmartphone } from "lucide-react";

interface ServiceCardProps {
  title?: string;
  description?: string;
  icon?: React.ElementType;
  children?: ReactNode;
  serviceName?: string; // Add support for the serviceName prop
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon: IconComponent,
  children,
  serviceName
}) => {
  // Determine title, description, and icon based on serviceName if provided
  let finalTitle = title;
  let finalDescription = description;
  let FinalIcon = IconComponent;

  if (serviceName) {
    switch (serviceName) {
      case 'aqua-monitor':
        finalTitle = 'aqua-monitor';
        finalDescription = 'Real-time monitoring and sensor data collection';
        FinalIcon = MonitorSmartphone;
        break;
      case 'aqua-brain':
        finalTitle = 'aqua-brain';
        finalDescription = 'AI-driven analysis and recommendation engine';
        FinalIcon = BrainCircuit;
        break;
      default:
        finalTitle = serviceName;
        finalDescription = 'System service component';
        FinalIcon = ActivitySquare;
    }
  }

  return (
    <div className="border-2 border-orange-500/30 rounded-md p-4 bg-gray-900 text-white hover:border-orange-400 transition-all duration-300 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-orange-400">{finalTitle}</h3>
        {FinalIcon && <FinalIcon className="h-5 w-5 text-orange-400" />}
      </div>
      <p className="text-sm text-gray-300 mb-4">
        {finalDescription}
      </p>
      {children}
    </div>
  );
};

export default ServiceCard;
