
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ApiResultDisplay } from "../ApiResultDisplay";
import { CustomDialogClose } from "./CustomDialogClose";

interface ResultDialogsProps {
  showTanksDialog: boolean;
  setShowTanksDialog: (show: boolean) => void;
  tanksData: any;
  tanksLoading: boolean;
  tanksError: string | null;
  
  showReadingsDialog: boolean;
  setShowReadingsDialog: (show: boolean) => void;
  tankReadings: any;
  readingsLoading: boolean;
  readingsError: string | null;
  
  showSensorDialog: boolean;
  setShowSensorDialog: (show: boolean) => void;
  sensorStatus: any;
  sensorLoading: boolean;
  sensorError: string | null;
}

const ResultDialogs: React.FC<ResultDialogsProps> = ({
  showTanksDialog,
  setShowTanksDialog,
  tanksData,
  tanksLoading,
  tanksError,
  
  showReadingsDialog,
  setShowReadingsDialog,
  tankReadings,
  readingsLoading,
  readingsError,
  
  showSensorDialog,
  setShowSensorDialog,
  sensorStatus,
  sensorLoading,
  sensorError
}) => {
  return (
    <>
      <Dialog open={showTanksDialog} onOpenChange={setShowTanksDialog}>
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-orange-400">Available Tanks</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          <ApiResultDisplay 
            data={tanksData} 
            loading={tanksLoading} 
            error={tanksError}
            type="tanks" 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showReadingsDialog} onOpenChange={setShowReadingsDialog}>
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-orange-400">Tank Readings</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          <ApiResultDisplay 
            data={tankReadings} 
            loading={readingsLoading} 
            error={readingsError}
            type="readings" 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showSensorDialog} onOpenChange={setShowSensorDialog}>
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl" onInteractOutside={e => e.preventDefault()} onEscapeKeyDown={e => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-orange-400">Sensor Status</DialogTitle>
            <CustomDialogClose />
          </DialogHeader>
          <ApiResultDisplay 
            data={sensorStatus} 
            loading={sensorLoading} 
            error={sensorError}
            type="sensors" 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResultDialogs;
