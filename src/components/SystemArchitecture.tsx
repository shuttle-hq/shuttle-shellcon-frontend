
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Database, Monitor } from "lucide-react";

const SystemArchitecture: React.FC = () => {
  return (
    <Card className="bg-gray-900 border-orange-500 mb-8">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Server className="h-6 w-6 text-orange-500" />
          ShellCon Smart Aquarium System Architecture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border border-orange-500/30 rounded-md p-4 bg-gray-800 text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-orange-500">aqua-monitor</h3>
              <Monitor className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-sm text-gray-300">
              Real-time environmental monitoring service that collects sensor data from tanks
              including temperature, pH, oxygen levels, and salinity.
            </p>
          </div>
          <div className="border border-orange-500/30 rounded-md p-4 bg-gray-800 text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-orange-500">species-hub</h3>
              <Database className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-sm text-gray-300">
              Species and feeding information service that manages the database of crustacean species,
              their optimal environmental parameters, and feeding schedules.
            </p>
          </div>
          <div className="border border-orange-500/30 rounded-md p-4 bg-gray-800 text-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-orange-500">aqua-brain</h3>
              <Server className="h-5 w-5 text-orange-500" />
            </div>
            <p className="text-sm text-gray-300">
              Analysis and challenge tracking service that performs system-wide analysis,
              detecting patterns, making predictions, and coordinating responses.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemArchitecture;
