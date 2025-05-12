
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ApiResultDisplay } from "../ApiResultDisplay";
import { CustomDialogClose } from "./CustomDialogClose";
import { Species, FeedingSchedule } from './useSpeciesData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SpeciesResultDialogsProps {
  // Species List
  showSpeciesListDialog: boolean;
  setShowSpeciesListDialog: (show: boolean) => void;
  speciesList: Species[];
  speciesLoading: boolean;
  speciesError: string | null;
  
  // Search Results
  showSearchResultsDialog: boolean;
  setShowSearchResultsDialog: (show: boolean) => void;
  searchResults: Species[];
  searchLoading: boolean;
  searchError: string | null;
  
  // Species Details
  showSpeciesDetailsDialog: boolean;
  setShowSpeciesDetailsDialog: (show: boolean) => void;
  speciesDetails: Species | null;
  detailsLoading: boolean;
  detailsError: string | null;
  
  // Feeding Schedule
  showFeedingScheduleDialog: boolean;
  setShowFeedingScheduleDialog: (show: boolean) => void;
  feedingSchedule: FeedingSchedule | null;
  scheduleLoading: boolean;
  scheduleError: string | null;
  
  // Handlers
  onSearchSpecies: (searchTerm: string, searchType: 'name' | 'scientific_name') => Promise<void>;
  onGetSpeciesDetails: (speciesId: string) => Promise<void>;
  onGetFeedingSchedule: (speciesId: string, tankType?: string, customDiet?: string) => Promise<void>;
}

const SpeciesResultDialogs: React.FC<SpeciesResultDialogsProps> = ({
  // Species List
  showSpeciesListDialog,
  setShowSpeciesListDialog,
  speciesList,
  speciesLoading,
  speciesError,
  
  // Search Results
  showSearchResultsDialog,
  setShowSearchResultsDialog,
  searchResults,
  searchLoading,
  searchError,
  
  // Species Details
  showSpeciesDetailsDialog,
  setShowSpeciesDetailsDialog,
  speciesDetails,
  detailsLoading,
  detailsError,
  
  // Feeding Schedule
  showFeedingScheduleDialog,
  setShowFeedingScheduleDialog,
  feedingSchedule,
  scheduleLoading,
  scheduleError,
  
  // Handlers
  onSearchSpecies,
  onGetSpeciesDetails,
  onGetFeedingSchedule
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

  // Handle search submission
  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearchSpecies(searchTerm, searchType);
    }
  };

  // Handle species details selection
  const handleSelectSpecies = () => {
    if (selectedSpeciesId) {
      onGetSpeciesDetails(selectedSpeciesId);
    }
  };

  // Handle feeding schedule selection
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
    <>
      {/* Species List Dialog with Search Tab */}
      <Dialog open={showSpeciesListDialog} onOpenChange={setShowSpeciesListDialog}>
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()} hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-orange-400">Species Database</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          
          <Tabs defaultValue="all-species" className="w-full">
            <TabsList className="w-full bg-gray-800">
              <TabsTrigger value="all-species" className="flex-1 text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                All Species
              </TabsTrigger>
              <TabsTrigger value="search" className="flex-1 text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                Search
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all-species">
              <ApiResultDisplay 
                data={speciesList} 
                loading={speciesLoading} 
                error={speciesError}
                type="species-list" 
              />
            </TabsContent>
            
            <TabsContent value="search" className="space-y-4">
              <div className="space-y-2 p-2">
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
              
              <ApiResultDisplay 
                data={searchResults} 
                loading={searchLoading} 
                error={searchError}
                type="species-list" 
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Species Details Dialog */}
      <Dialog open={showSpeciesDetailsDialog} onOpenChange={setShowSpeciesDetailsDialog}>
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()} hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-orange-400">Species Details</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          
          {!speciesDetails && (
            <div className="space-y-4 bg-gray-800 p-4 rounded-md">
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
                className="w-full bg-gray-800 border-orange-500/30 text-orange-400 hover:bg-gray-700"
                onClick={handleSelectSpecies}
                disabled={detailsLoading || !selectedSpeciesId}
              >
                <Info className="mr-2 h-4 w-4" />
                {detailsLoading ? "Loading Details..." : "Get Species Details"}
              </Button>
            </div>
          )}
          
          {speciesDetails && (
            <ApiResultDisplay 
              data={speciesDetails} 
              loading={detailsLoading} 
              error={detailsError}
              type="species-details" 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Feeding Schedule Dialog */}
      <Dialog open={showFeedingScheduleDialog} onOpenChange={setShowFeedingScheduleDialog}>
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()} hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-orange-400">Feeding Schedule</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          
          {!feedingSchedule && (
            <div className="space-y-4 bg-gray-800 p-4 rounded-md">
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
              
              <Input
                placeholder="Custom diet (optional)"
                value={customDiet}
                onChange={(e) => setCustomDiet(e.target.value)}
                className="w-full bg-gray-800 border-orange-500/30 text-white"
              />
              
              <Button 
                variant="outline" 
                className="w-full bg-gray-800 border-orange-500/30 text-orange-400 hover:bg-gray-700"
                onClick={handleGetFeedingSchedule}
                disabled={scheduleLoading || !feedingSpeciesId}
              >
                <Clock className="mr-2 h-4 w-4" />
                {scheduleLoading ? "Loading Schedule..." : "Get Feeding Schedule"}
              </Button>
            </div>
          )}
          
          {feedingSchedule && (
            <ApiResultDisplay 
              data={feedingSchedule} 
              loading={scheduleLoading} 
              error={scheduleError}
              type="feeding-schedule" 
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpeciesResultDialogs;
