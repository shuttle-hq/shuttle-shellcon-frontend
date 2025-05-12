
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ApiResultDisplay } from "../ApiResultDisplay";
import { CustomDialogClose } from "./CustomDialogClose";
import { Species, FeedingSchedule } from './useSpeciesData';

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
  scheduleError
}) => {
  return (
    <>
      {/* Species List Dialog */}
      <Dialog open={showSpeciesListDialog} onOpenChange={setShowSpeciesListDialog}>
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()} hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-orange-400">All Species</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          <ApiResultDisplay 
            data={speciesList} 
            loading={speciesLoading} 
            error={speciesError}
            type="species-list" 
          />
        </DialogContent>
      </Dialog>

      {/* Search Results Dialog */}
      <Dialog open={showSearchResultsDialog} onOpenChange={setShowSearchResultsDialog}>
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()} hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-orange-400">Search Results</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          <ApiResultDisplay 
            data={searchResults} 
            loading={searchLoading} 
            error={searchError}
            type="species-search" 
          />
        </DialogContent>
      </Dialog>

      {/* Species Details Dialog */}
      <Dialog open={showSpeciesDetailsDialog} onOpenChange={setShowSpeciesDetailsDialog}>
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()} hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-orange-400">Species Details</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          <ApiResultDisplay 
            data={speciesDetails} 
            loading={detailsLoading} 
            error={detailsError}
            type="species-details" 
          />
        </DialogContent>
      </Dialog>

      {/* Feeding Schedule Dialog */}
      <Dialog open={showFeedingScheduleDialog} onOpenChange={setShowFeedingScheduleDialog}>
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()} hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-orange-400">Feeding Schedule</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          <ApiResultDisplay 
            data={feedingSchedule} 
            loading={scheduleLoading} 
            error={scheduleError}
            type="feeding-schedule" 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpeciesResultDialogs;
