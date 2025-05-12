
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Species } from './useSpeciesData';
import { Search, List, Info, Clock } from "lucide-react";

interface SpeciesHubControlsProps {
  onFetchAllSpecies: () => Promise<void>;
  onSearchSpecies: (searchTerm: string, searchType: 'name' | 'scientific_name') => Promise<void>;
  onGetSpeciesDetails: (speciesId: string) => Promise<void>;
  onGetFeedingSchedule: (speciesId: string, tankType?: string, customDiet?: string) => Promise<void>;
  loadSpeciesForDropdown: () => Promise<Species[]>;
  speciesList: Species[];
  speciesLoading: boolean;
  searchLoading: boolean;
  detailsLoading: boolean;
  scheduleLoading: boolean;
}

const SpeciesHubControls: React.FC<SpeciesHubControlsProps> = ({ 
  onFetchAllSpecies,
  onSearchSpecies,
  onGetSpeciesDetails,
  onGetFeedingSchedule,
  loadSpeciesForDropdown,
  speciesList,
  speciesLoading,
  searchLoading,
  detailsLoading,
  scheduleLoading
}) => {
  // Search controls
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<'name' | 'scientific_name'>('name');
  
  // Species details controls
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>('');
  
  // Feeding schedule controls
  const [feedingSpeciesId, setFeedingSpeciesId] = useState<string>('');
  const [tankType, setTankType] = useState<string>('default');
  const [customDiet, setCustomDiet] = useState<string>('');
  
  // Load species for dropdowns
  useEffect(() => {
    const initializeSpeciesList = async () => {
      await loadSpeciesForDropdown();
    };
    
    initializeSpeciesList();
  }, [loadSpeciesForDropdown]);

  // Handle search submission
  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearchSpecies(searchTerm, searchType);
    }
  };

  // Handle Get Species Details
  const handleGetDetails = () => {
    if (selectedSpeciesId) {
      onGetSpeciesDetails(selectedSpeciesId);
    }
  };

  // Handle Get Feeding Schedule
  const handleGetFeedingSchedule = () => {
    if (feedingSpeciesId) {
      onGetFeedingSchedule(
        feedingSpeciesId, 
        tankType !== 'default' ? tankType : undefined,
        customDiet.trim() ? customDiet : undefined
      );
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {/* List All Species */}
      <div>
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
      </div>

      {/* Search Species */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Search species..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-gray-800 border-orange-500/30 text-white"
          />
          <Select value={searchType} onValueChange={(value) => setSearchType(value as 'name' | 'scientific_name')}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-orange-500/30 text-white">
              <SelectValue placeholder="Search by..." />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-orange-500/30">
              <SelectItem value="name" className="text-white hover:bg-gray-700">Name</SelectItem>
              <SelectItem value="scientific_name" className="text-white hover:bg-gray-700">Scientific Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="w-full bg-gray-800 border-orange-500/30 text-orange-400 hover:bg-gray-700"
          onClick={handleSearch}
          disabled={searchLoading || !searchTerm.trim()}
        >
          <Search className="mr-2 h-4 w-4" />
          {searchLoading ? "Searching..." : "Search Species"}
        </Button>
      </div>

      {/* Get Species Details */}
      <div className="space-y-2">
        <Select value={selectedSpeciesId} onValueChange={setSelectedSpeciesId}>
          <SelectTrigger className="w-full bg-gray-800 border-orange-500/30 text-white">
            <SelectValue placeholder="Select species..." />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-orange-500/30 max-h-[200px]">
            {speciesList.map(species => (
              <SelectItem 
                key={species.id} 
                value={species.id} 
                className="text-white hover:bg-gray-700"
              >
                {species.id} - {species.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          variant="outline" 
          size="sm"
          className="w-full bg-gray-800 border-orange-500/30 text-orange-400 hover:bg-gray-700"
          onClick={handleGetDetails}
          disabled={detailsLoading || !selectedSpeciesId}
        >
          <Info className="mr-2 h-4 w-4" />
          {detailsLoading ? "Loading Details..." : "Get Species Details"}
        </Button>
      </div>

      {/* Get Feeding Schedule */}
      <div className="space-y-2">
        {/* Species Selection */}
        <Select value={feedingSpeciesId} onValueChange={setFeedingSpeciesId}>
          <SelectTrigger className="w-full bg-gray-800 border-orange-500/30 text-white">
            <SelectValue placeholder="Select species..." />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-orange-500/30 max-h-[200px]">
            {speciesList.map(species => (
              <SelectItem 
                key={species.id} 
                value={species.id} 
                className="text-white hover:bg-gray-700"
              >
                {species.id} - {species.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Tank Type Selection */}
        <Select value={tankType} onValueChange={setTankType}>
          <SelectTrigger className="w-full bg-gray-800 border-orange-500/30 text-white">
            <SelectValue placeholder="Select tank type..." />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-orange-500/30">
            <SelectItem value="default" className="text-white hover:bg-gray-700">Default</SelectItem>
            <SelectItem value="reef" className="text-white hover:bg-gray-700">Reef</SelectItem>
            <SelectItem value="nano" className="text-white hover:bg-gray-700">Nano</SelectItem>
            <SelectItem value="community" className="text-white hover:bg-gray-700">Community</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Custom Diet Input */}
        <Input
          placeholder="Custom diet (optional)"
          value={customDiet}
          onChange={(e) => setCustomDiet(e.target.value)}
          className="w-full bg-gray-800 border-orange-500/30 text-white"
        />
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full bg-gray-800 border-orange-500/30 text-orange-400 hover:bg-gray-700"
          onClick={handleGetFeedingSchedule}
          disabled={scheduleLoading || !feedingSpeciesId}
        >
          <Clock className="mr-2 h-4 w-4" />
          {scheduleLoading ? "Loading Schedule..." : "Get Feeding Schedule"}
        </Button>
      </div>
    </div>
  );
};

export default SpeciesHubControls;
