import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Database, Monitor, Eye, Search, ThermometerSnowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { getAllTanks, getTankReadings, getSensorStatus } from "@/api/aquariumApi";
import { ApiResultDisplay } from "./ApiResultDisplay";

const SystemArchitecture: React.FC = () => {
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
  const [selectedTankId, setSelectedTankId] = useState<string>("");
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
      let formattedData = data;
      
      // Check if data is not in the expected format (with a tanks array)
      if (data && Array.isArray(data) && !data.tanks) {
        // If data is an array directly, wrap it in an object with tanks property
        formattedData = { tanks: data };
        console.log("Restructured tanks data:", formattedData);
      } else if (data && !Array.isArray(data.tanks) && !data.tanks) {
        // If data is an object but doesn't have tanks property
        formattedData = { tanks: [data] };
        console.log("Restructured single tank data:", formattedData);
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

  return (
    <>
      <Card className="bg-gray-800 border-orange-500/40 mb-8 shadow-lg orange-glow">
        <CardHeader className="bg-gray-900 border-b-2 border-orange-500/40">
          <CardTitle className="text-white flex items-center gap-2">
            <Server className="h-6 w-6 text-orange-400" />
            ShellCon Smart Aquarium System Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border-2 border-orange-500/30 rounded-md p-4 bg-gray-900 text-white hover:border-orange-400 transition-all duration-300 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-orange-400">aqua-monitor</h3>
                <Monitor className="h-5 w-5 text-orange-400" />
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Real-time environmental monitoring service that collects sensor data from tanks
                including temperature, pH, oxygen levels, and salinity.
              </p>
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gray-800 border-orange-500/50 text-orange-400 hover:bg-gray-700 w-full justify-start"
                  onClick={handleViewAllTanks}
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
                      tanksList.map((tank) => (
                        <DropdownMenuItem 
                          key={tank.id} 
                          onClick={() => handleFetchTankReadings(tank.id)}
                          className="hover:bg-gray-800 cursor-pointer"
                        >
                          {tank.name || tank.id}
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem 
                        onClick={handleViewAllTanks} 
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
                  onClick={handleCheckSensorStatus}
                  disabled={sensorLoading}
                >
                  <ThermometerSnowflake className="mr-2 h-4 w-4" />
                  Check Sensor Status
                </Button>
              </div>
            </div>
            <div className="border-2 border-orange-500/30 rounded-md p-4 bg-gray-900 text-white hover:border-orange-400 transition-all duration-300 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-orange-400">species-hub</h3>
                <Database className="h-5 w-5 text-orange-400" />
              </div>
              <p className="text-sm text-gray-300">
                Species and feeding information service that manages the database of crustacean species,
                their optimal environmental parameters, and feeding schedules.
              </p>
            </div>
            <div className="border-2 border-orange-500/30 rounded-md p-4 bg-gray-900 text-white hover:border-orange-400 transition-all duration-300 shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-orange-400">aqua-brain</h3>
                <Server className="h-5 w-5 text-orange-400" />
              </div>
              <p className="text-sm text-gray-300">
                Analysis and challenge tracking service that performs system-wide analysis,
                detecting patterns, making predictions, and coordinating responses.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs for API Results */}
      <Dialog open={showTanksDialog} onOpenChange={setShowTanksDialog}>
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-orange-400">Available Tanks</DialogTitle>
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
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-orange-400">Tank Readings</DialogTitle>
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
        <DialogContent className="bg-gray-900 border-2 border-orange-500/40 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-orange-400">Sensor Status</DialogTitle>
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

export default SystemArchitecture;
