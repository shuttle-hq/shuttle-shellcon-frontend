
import { useState } from 'react';
import { getAllTanks, getTankReadings, getSensorStatus } from "@/api/aquariumApi";
import { toast } from "@/components/ui/sonner";

export const useAquaData = () => {
  const [tanksData, setTanksData] = useState<any>(null);
  const [tanksLoading, setTanksLoading] = useState(false);
  const [tanksError, setTanksError] = useState<string | null>(null);
  
  const [tankReadings, setTankReadings] = useState<any>(null);
  const [readingsLoading, setReadingsLoading] = useState(false);
  const [readingsError, setReadingsError] = useState<string | null>(null);
  
  const [sensorStatus, setSensorStatus] = useState<any>(null);
  const [sensorLoading, setSensorLoading] = useState(false);
  const [sensorError, setSensorError] = useState<string | null>(null);
  
  const [tanksList, setTanksList] = useState<any[]>([]);
  const [showTanksDialog, setShowTanksDialog] = useState(false);
  const [showReadingsDialog, setShowReadingsDialog] = useState(false);
  const [showSensorDialog, setShowSensorDialog] = useState(false);
  
  const handleViewAllTanks = async () => {
    setTanksLoading(true);
    setTanksError(null);
    try {
      const data = await getAllTanks();
      console.log("Raw tanks data received:", data);
      
      // Create a proper data structure if tanks data is not in expected format
      let formattedData: any = data;
      
      // Check if data is not in the expected format (with a tanks array)
      if (data && Array.isArray(data)) {
        // If data is an array directly, wrap it in an object with tanks property
        formattedData = { tanks: data };
        console.log("Restructured tanks data:", formattedData);
      } else if (data && !Array.isArray(data) && typeof data === 'object') {
        // If data is an object but doesn't have tanks property or tanks is not an array
        if (!data.tanks || !Array.isArray(data.tanks)) {
          formattedData = { tanks: [data] };
          console.log("Restructured single tank data:", formattedData);
        }
      }
      
      setTanksData(formattedData);
      setTanksList(formattedData.tanks || []);
      
      console.log("Final tanks data set in state:", formattedData);
      console.log("Tanks list set in state:", formattedData.tanks || []);
      
      setShowTanksDialog(true);
    } catch (error) {
      console.error("Error fetching tanks:", error);
      setTanksError("Failed to fetch tanks");
      toast.error("Failed to fetch tanks");
    } finally {
      setTanksLoading(false);
    }
  };
  
  const handleFetchTankReadings = async (tankId: string) => {
    if (!tankId) {
      toast.error("Please select a tank first");
      return;
    }
    
    setReadingsLoading(true);
    setReadingsError(null);
    try {
      const data = await getTankReadings(tankId);
      setTankReadings(data);
      setShowReadingsDialog(true);
      console.log("Tank readings:", data);
    } catch (error) {
      console.error("Error fetching tank readings:", error);
      setReadingsError("Failed to fetch tank readings");
      toast.error("Failed to fetch tank readings");
    } finally {
      setReadingsLoading(false);
    }
  };
  
  const handleCheckSensorStatus = async () => {
    setSensorLoading(true);
    setSensorError(null);
    try {
      const data = await getSensorStatus();
      setSensorStatus(data);
      setShowSensorDialog(true);
      console.log("Sensor status:", data);
    } catch (error) {
      console.error("Error fetching sensor status:", error);
      setSensorError("Failed to fetch sensor status");
      toast.error("Failed to fetch sensor status");
    } finally {
      setSensorLoading(false);
    }
  };

  return {
    tanksData,
    tanksLoading,
    tanksError,
    tankReadings,
    readingsLoading,
    readingsError,
    sensorStatus,
    sensorLoading,
    sensorError,
    tanksList,
    showTanksDialog,
    setShowTanksDialog,
    showReadingsDialog,
    setShowReadingsDialog,
    showSensorDialog,
    setShowSensorDialog,
    handleViewAllTanks,
    handleFetchTankReadings,
    handleCheckSensorStatus
  };
};
