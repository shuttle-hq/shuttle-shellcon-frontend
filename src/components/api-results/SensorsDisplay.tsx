
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getBatteryColorClass } from '../utils/displayHelpers';

interface SensorsDisplayProps {
  data: any;
}

export const SensorsDisplay: React.FC<SensorsDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-gray-950/50">
            <TableRow>
              <TableHead className="text-orange-400">Sensor ID</TableHead>
              <TableHead className="text-orange-400">Type</TableHead>
              <TableHead className="text-orange-400">Status</TableHead>
              <TableHead className="text-orange-400">Last Report</TableHead>
              <TableHead className="text-orange-400">Battery</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.sensors && data.sensors.map((sensor: any) => (
              <TableRow key={sensor.id} className="hover:bg-gray-800">
                <TableCell className="font-mono">{sensor.id}</TableCell>
                <TableCell>{sensor.type || "Unknown"}</TableCell>
                <TableCell>
                  <Badge className={`
                    ${sensor.status === 'online' ? 'bg-green-600' : ''}
                    ${sensor.status === 'degraded' ? 'bg-amber-600' : ''}
                    ${sensor.status === 'offline' ? 'bg-red-600' : ''}
                    ${!sensor.status ? 'bg-gray-600' : ''}
                  `}>
                    {sensor.status || "Unknown"}
                  </Badge>
                </TableCell>
                <TableCell>{sensor.lastReport || "N/A"}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-2 w-16 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-2 ${getBatteryColorClass(sensor.battery)}`} 
                        style={{width: `${sensor.battery || 0}%`}}
                      />
                    </div>
                    <span className="ml-2 text-xs">{sensor.battery || 0}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {(!data.sensors || data.sensors.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-400">No sensors found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {data.networkStatus && (
        <div className="bg-gray-950/50 rounded-md p-3 mt-4">
          <p className="text-orange-400 font-medium">Network Status</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {Object.entries(data.networkStatus).map(([key, value]: [string, any]) => (
              <div key={key} className="border border-gray-700 rounded-md p-2 bg-gray-850">
                <div className="text-xs text-gray-400 capitalize">{key}</div>
                <div className="font-semibold">
                  {typeof value === 'boolean' 
                    ? (value ? '✅ Active' : '❌ Inactive') 
                    : value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
