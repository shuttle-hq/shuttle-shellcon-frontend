
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Eye, Search, ThermometerSnowflake } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/sonner";

interface AquaMonitorControlsProps {
  onViewAllTanks: () => void;
  onFetchTankReadings: (tankId: string) => void;
  onCheckSensorStatus: () => void;
  tanksList: any[];
  tanksLoading: boolean;
  readingsLoading: boolean;
  sensorLoading: boolean;
}

const AquaMonitorControls: React.FC<AquaMonitorControlsProps> = ({
  onViewAllTanks,
  onFetchTankReadings,
  onCheckSensorStatus,
  tanksList,
  tanksLoading,
  readingsLoading,
  sensorLoading
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gray-800 border-orange-500/50 text-orange-400 hover:bg-gray-700 w-full justify-start"
        onClick={onViewAllTanks}
        disabled={tanksLoading}
      >
        <Eye className="mr-2 h-4 w-4" />
        View All Tanks
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-gray-800 border-orange-500/50 text-orange-400 hover:bg-gray-700 w-full justify-start"
            disabled={readingsLoading || !tanksList.length}
          >
            <Search className="mr-2 h-4 w-4" />
            Fetch Tank Readings
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-900 border-orange-500/40 text-white">
          {tanksList.length > 0 ? (
            tanksList.map((tankId) => (
              <DropdownMenuItem 
                key={tankId} 
                onClick={() => onFetchTankReadings(tankId)}
                className="hover:bg-gray-800 cursor-pointer"
              >
                {tankId}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem 
              onClick={onViewAllTanks} 
              className="hover:bg-gray-800 cursor-pointer"
            >
              Load tanks first
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gray-800 border-orange-500/50 text-orange-400 hover:bg-gray-700 w-full justify-start"
        onClick={onCheckSensorStatus}
        disabled={sensorLoading}
      >
        <ThermometerSnowflake className="mr-2 h-4 w-4" />
        Check Sensor Status
      </Button>
    </div>
  );
};

export default AquaMonitorControls;
