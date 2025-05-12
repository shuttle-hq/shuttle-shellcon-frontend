
import React from 'react';
import { Button } from "@/components/ui/button";
import { Species } from './useSpeciesData';
import { List, Info, Clock } from "lucide-react";

interface SpeciesHubControlsProps {
  onFetchAllSpecies: () => Promise<void>;
  onGetSpeciesDetails: (speciesId: string) => Promise<void>;
  onGetFeedingSchedule: (speciesId: string, tankType?: string, customDiet?: string) => Promise<void>;
  loadSpeciesForDropdown: () => Promise<Species[]>;
  speciesList: Species[];
  speciesLoading: boolean;
  detailsLoading: boolean;
  scheduleLoading: boolean;
}

const SpeciesHubControls: React.FC<SpeciesHubControlsProps> = ({ 
  onFetchAllSpecies,
  onGetSpeciesDetails,
  onGetFeedingSchedule,
  speciesLoading,
  detailsLoading,
  scheduleLoading
}) => {
  return (
    <div className="space-y-3 mt-4">
      {/* List All Species */}
      <Button 
        variant="outline" 
        size="sm"
        className="w-full bg-gray-800 border-orange-500/30 text-orange-400 hover:bg-gray-700"
        onClick={onFetchAllSpecies}
        disabled={speciesLoading}
      >
        <List className="mr-2 h-4 w-4" />
        {speciesLoading ? "Loading..." : "List All Species"}
      </Button>

      {/* Get Species Details */}
      <Button 
        variant="outline" 
        size="sm"
        className="w-full bg-gray-800 border-orange-500/30 text-orange-400 hover:bg-gray-700"
        onClick={() => onGetSpeciesDetails("")}
        disabled={detailsLoading}
      >
        <Info className="mr-2 h-4 w-4" />
        {detailsLoading ? "Loading Details..." : "Get Species Details"}
      </Button>

      {/* Get Feeding Schedule */}
      <Button 
        variant="outline" 
        size="sm"
        className="w-full bg-gray-800 border-orange-500/30 text-orange-400 hover:bg-gray-700"
        onClick={() => onGetFeedingSchedule("")}
        disabled={scheduleLoading}
      >
        <Clock className="mr-2 h-4 w-4" />
        {scheduleLoading ? "Loading Schedule..." : "Get Feeding Schedule"}
      </Button>
    </div>
  );
};

export default SpeciesHubControls;
