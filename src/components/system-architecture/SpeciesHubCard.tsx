
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Database } from "lucide-react";
import SpeciesHubControls from "./SpeciesHubControls";
import SpeciesResultDialogs from "./SpeciesResultDialogs";
import { useSpeciesData } from "./useSpeciesData";

const SpeciesHubCard: React.FC = () => {
  const speciesData = useSpeciesData();
  
  return (
    <>
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-purple-400 font-medium group flex items-center">
              <Database className="h-5 w-5 mr-2 text-purple-500" />
              species-hub
              <span className="ml-2 px-1.5 py-0.5 rounded text-xs bg-purple-500/20 text-purple-300">
                API
              </span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-gray-400 mb-4">
            Species database and feeding schedule management
          </div>
          
          <SpeciesHubControls 
            onListAllSpecies={speciesData.handleListAllSpecies}
            onSearchSpecies={speciesData.handleSearchSpecies}
            onGetSpeciesDetails={speciesData.handleGetSpeciesDetails}
            onGetFeedingSchedule={speciesData.handleGetFeedingSchedule}
            speciesList={speciesData.speciesList}
            isListLoading={speciesData.speciesListLoading}
            isSearchLoading={speciesData.speciesSearchLoading}
            isDetailsLoading={speciesData.speciesDetailsLoading}
            isFeedingLoading={speciesData.feedingScheduleLoading}
          />
        </CardContent>
      </Card>
      
      <SpeciesResultDialogs 
        showSpeciesListDialog={speciesData.showSpeciesListDialog}
        setShowSpeciesListDialog={speciesData.setShowSpeciesListDialog}
        speciesListData={speciesData.speciesListData}
        speciesListLoading={speciesData.speciesListLoading}
        speciesListError={speciesData.speciesListError}
        
        showSpeciesSearchDialog={speciesData.showSpeciesSearchDialog}
        setShowSpeciesSearchDialog={speciesData.setShowSpeciesSearchDialog}
        speciesSearchData={speciesData.speciesSearchData}
        speciesSearchLoading={speciesData.speciesSearchLoading}
        speciesSearchError={speciesData.speciesSearchError}
        
        showSpeciesDetailsDialog={speciesData.showSpeciesDetailsDialog}
        setShowSpeciesDetailsDialog={speciesData.setShowSpeciesDetailsDialog}
        speciesDetailsData={speciesData.speciesDetailsData}
        speciesDetailsLoading={speciesData.speciesDetailsLoading}
        speciesDetailsError={speciesData.speciesDetailsError}
        
        showFeedingScheduleDialog={speciesData.showFeedingScheduleDialog}
        setShowFeedingScheduleDialog={speciesData.setShowFeedingScheduleDialog}
        feedingScheduleData={speciesData.feedingScheduleData}
        feedingScheduleLoading={speciesData.feedingScheduleLoading}
        feedingScheduleError={speciesData.feedingScheduleError}
      />
    </>
  );
};

export default SpeciesHubCard;
