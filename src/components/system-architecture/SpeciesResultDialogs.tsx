
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ApiResultDisplay } from "../ApiResultDisplay";
import { CustomDialogClose } from "./CustomDialogClose";

interface SpeciesResultDialogsProps {
  showSpeciesListDialog: boolean;
  setShowSpeciesListDialog: (show: boolean) => void;
  speciesListData: any;
  speciesListLoading: boolean;
  speciesListError: string | null;
  
  showSpeciesSearchDialog: boolean;
  setShowSpeciesSearchDialog: (show: boolean) => void;
  speciesSearchData: any;
  speciesSearchLoading: boolean;
  speciesSearchError: string | null;
  
  showSpeciesDetailsDialog: boolean;
  setShowSpeciesDetailsDialog: (show: boolean) => void;
  speciesDetailsData: any;
  speciesDetailsLoading: boolean;
  speciesDetailsError: string | null;
  
  showFeedingScheduleDialog: boolean;
  setShowFeedingScheduleDialog: (show: boolean) => void;
  feedingScheduleData: any;
  feedingScheduleLoading: boolean;
  feedingScheduleError: string | null;
}

const SpeciesResultDialogs: React.FC<SpeciesResultDialogsProps> = ({
  showSpeciesListDialog,
  setShowSpeciesListDialog,
  speciesListData,
  speciesListLoading,
  speciesListError,
  
  showSpeciesSearchDialog,
  setShowSpeciesSearchDialog,
  speciesSearchData,
  speciesSearchLoading,
  speciesSearchError,
  
  showSpeciesDetailsDialog,
  setShowSpeciesDetailsDialog,
  speciesDetailsData,
  speciesDetailsLoading,
  speciesDetailsError,
  
  showFeedingScheduleDialog,
  setShowFeedingScheduleDialog,
  feedingScheduleData,
  feedingScheduleLoading,
  feedingScheduleError
}) => {
  return (
    <>
      <Dialog open={showSpeciesListDialog} onOpenChange={setShowSpeciesListDialog}>
        <DialogContent className="bg-gray-900 border-2 border-purple-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()} hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-purple-400">Available Species</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          <ApiResultDisplay 
            data={speciesListData} 
            loading={speciesListLoading} 
            error={speciesListError}
            type="species-list" 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showSpeciesSearchDialog} onOpenChange={setShowSpeciesSearchDialog}>
        <DialogContent className="bg-gray-900 border-2 border-purple-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()} hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-purple-400">Species Search Results</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          <ApiResultDisplay 
            data={speciesSearchData} 
            loading={speciesSearchLoading} 
            error={speciesSearchError}
            type="species-list" 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showSpeciesDetailsDialog} onOpenChange={setShowSpeciesDetailsDialog}>
        <DialogContent className="bg-gray-900 border-2 border-purple-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()} hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-purple-400">Species Details</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          <ApiResultDisplay 
            data={speciesDetailsData} 
            loading={speciesDetailsLoading} 
            error={speciesDetailsError}
            type="species-details" 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showFeedingScheduleDialog} onOpenChange={setShowFeedingScheduleDialog}>
        <DialogContent className="bg-gray-900 border-2 border-purple-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()} hideCloseButton>
          <DialogHeader>
            <DialogTitle className="text-purple-400">Feeding Schedule</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          <ApiResultDisplay 
            data={feedingScheduleData} 
            loading={feedingScheduleLoading} 
            error={feedingScheduleError}
            type="feeding-schedule" 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpeciesResultDialogs;
