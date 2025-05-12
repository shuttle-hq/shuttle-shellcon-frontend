
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { List, Search, FileText, Calendar } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface SpeciesHubControlsProps {
  onListAllSpecies: () => void;
  onSearchSpecies: (searchTerm: string, searchType: "name" | "scientific_name") => void;
  onGetSpeciesDetails: (speciesId: string) => void;
  onGetFeedingSchedule: (speciesId: string, tankType: string, customDiet?: string) => void;
  speciesList: any[];
  isListLoading: boolean;
  isSearchLoading: boolean;
  isDetailsLoading: boolean;
  isFeedingLoading: boolean;
}

const SpeciesHubControls: React.FC<SpeciesHubControlsProps> = ({
  onListAllSpecies,
  onSearchSpecies,
  onGetSpeciesDetails,
  onGetFeedingSchedule,
  speciesList,
  isListLoading,
  isSearchLoading,
  isDetailsLoading,
  isFeedingLoading
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"name" | "scientific_name">("name");
  const [selectedSpeciesId, setSelectedSpeciesId] = useState("");
  const [tankType, setTankType] = useState("default");
  const [customDiet, setCustomDiet] = useState("");
  
  const form = useForm();
  
  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearchSpecies(searchTerm, searchType);
    }
  };
  
  return (
    <div className="flex flex-col space-y-3">
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-gray-800 border-purple-500/50 text-purple-400 hover:bg-gray-700 w-full justify-start"
        onClick={onListAllSpecies}
        disabled={isListLoading}
      >
        <List className="mr-2 h-4 w-4" />
        List All Species
      </Button>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Search species..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-purple-500/30 text-white placeholder:text-gray-400"
          />
          <Select 
            value={searchType} 
            onValueChange={(value: "name" | "scientific_name") => setSearchType(value)}
          >
            <SelectTrigger className="w-[180px] bg-gray-800 border-purple-500/30 text-white">
              <SelectValue placeholder="Search by..." />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-purple-500/40 text-white">
              <SelectItem value="name">Search by Name</SelectItem>
              <SelectItem value="scientific_name">Search by Scientific</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gray-800 border-purple-500/50 text-purple-400 hover:bg-gray-700 w-full justify-start"
          onClick={handleSearch}
          disabled={isSearchLoading || !searchTerm.trim()}
        >
          <Search className="mr-2 h-4 w-4" />
          Search Species
        </Button>
      </div>
      
      <div className="space-y-2">
        <Select 
          value={selectedSpeciesId} 
          onValueChange={setSelectedSpeciesId}
        >
          <SelectTrigger className="w-full bg-gray-800 border-purple-500/30 text-white">
            <SelectValue placeholder="Select species..." />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-purple-500/40 text-white">
            {speciesList.map((species) => (
              <SelectItem key={species.id} value={species.id.toString()}>
                {species.id} - {species.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gray-800 border-purple-500/50 text-purple-400 hover:bg-gray-700 w-full justify-start"
          onClick={() => selectedSpeciesId && onGetSpeciesDetails(selectedSpeciesId)}
          disabled={isDetailsLoading || !selectedSpeciesId}
        >
          <FileText className="mr-2 h-4 w-4" />
          Get Species Details
        </Button>
      </div>
      
      <div className="space-y-2">
        <div className="flex gap-2">
          <Select value={tankType} onValueChange={setTankType}>
            <SelectTrigger className="bg-gray-800 border-purple-500/30 text-white">
              <SelectValue placeholder="Tank type..." />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-purple-500/40 text-white">
              <SelectItem value="reef">Reef</SelectItem>
              <SelectItem value="nano">Nano</SelectItem>
              <SelectItem value="community">Community</SelectItem>
              <SelectItem value="default">Default</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Input
          type="text"
          placeholder="Custom diet (optional)"
          value={customDiet}
          onChange={(e) => setCustomDiet(e.target.value)}
          className="mt-2 bg-gray-800 border-purple-500/30 text-white placeholder:text-gray-400"
        />
        
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gray-800 border-purple-500/50 text-purple-400 hover:bg-gray-700 w-full justify-start"
          onClick={() => selectedSpeciesId && onGetFeedingSchedule(selectedSpeciesId, tankType, customDiet)}
          disabled={isFeedingLoading || !selectedSpeciesId}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Get Feeding Schedule
        </Button>
      </div>
    </div>
  );
};

export default SpeciesHubControls;
