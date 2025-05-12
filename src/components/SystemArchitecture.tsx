
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Database, Monitor } from "lucide-react";
import ServiceCard from './system-architecture/ServiceCard';
import AquaMonitorControls from './system-architecture/AquaMonitorControls';
import ResultDialogs from './system-architecture/ResultDialogs';
import { useAquaData } from './system-architecture/useAquaData';

const SystemArchitecture: React.FC = () => {
  // Extract all data and handlers from custom hook
  const {
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
  } = useAquaData();

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
            {/* Aqua Monitor Service Card */}
            <ServiceCard 
              title="aqua-monitor" 
              description="Real-time environmental monitoring service that collects sensor data from tanks including temperature, pH, oxygen levels, and salinity."
              icon={Monitor}
            >
              <AquaMonitorControls
                onViewAllTanks={handleViewAllTanks}
                onFetchTankReadings={handleFetchTankReadings}
                onCheckSensorStatus={handleCheckSensorStatus}
                tanksList={tanksList}
                tanksLoading={tanksLoading}
                readingsLoading={readingsLoading}
                sensorLoading={sensorLoading}
              />
            </ServiceCard>
            
            {/* Species Hub Service Card */}
            <ServiceCard 
              title="species-hub" 
              description="Species and feeding information service that manages the database of crustacean species, their optimal environmental parameters, and feeding schedules."
              icon={Database}
            />
            
            {/* Aqua Brain Service Card */}
            <ServiceCard 
              title="aqua-brain" 
              description="Analysis and challenge tracking service that performs system-wide analysis, detecting patterns, making predictions, and coordinating responses."
              icon={Server}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dialogs for API Results */}
      <ResultDialogs
        showTanksDialog={showTanksDialog}
        setShowTanksDialog={setShowTanksDialog}
        tanksData={tanksData}
        tanksLoading={tanksLoading}
        tanksError={tanksError}
        
        showReadingsDialog={showReadingsDialog}
        setShowReadingsDialog={setShowReadingsDialog}
        tankReadings={tankReadings}
        readingsLoading={readingsLoading}
        readingsError={readingsError}
        
        showSensorDialog={showSensorDialog}
        setShowSensorDialog={setShowSensorDialog}
        sensorStatus={sensorStatus}
        sensorLoading={sensorLoading}
        sensorError={sensorError}
      />
    </>
  );
};

export default SystemArchitecture;
