
import React, { useEffect } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ApiResultDisplayProps {
  data: any;
  loading: boolean;
  error: string | null;
  type: 'tanks' | 'readings' | 'sensors';
}

export const ApiResultDisplay: React.FC<ApiResultDisplayProps> = ({ 
  data, 
  loading, 
  error, 
  type 
}) => {
  // Add debugging on component mount and when data changes
  useEffect(() => {
    console.log(`ApiResultDisplay received data for ${type}:`, data);
  }, [data, type]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-10 bg-orange-500/20 rounded-full mb-2"></div>
          <div className="text-orange-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border-2 border-red-500/30 rounded-md bg-red-900/20">
        <h3 className="text-red-400 font-medium mb-1">Error</h3>
        <p className="text-sm text-gray-300">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 border-2 border-gray-500/30 rounded-md bg-gray-800">
        <p className="text-gray-400 text-center">No data available</p>
      </div>
    );
  }

  // Format each data type differently
  switch (type) {
    case 'tanks':
      // Check for various data structures that might be returned
      console.log("Processing tanks data:", data);
      
      let tanksArray = [];
      
      // Handle different possible data structures
      if (data.tanks && Array.isArray(data.tanks)) {
        tanksArray = data.tanks;
      } else if (Array.isArray(data)) {
        tanksArray = data;
      } else if (data && typeof data === 'object' && !data.tanks) {
        // If data is a single tank object
        tanksArray = [data];
      }
      
      console.log("Processed tanks array:", tanksArray);
      
      return (
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-gray-950/50">
              <TableRow>
                <TableHead className="text-orange-400">ID</TableHead>
                <TableHead className="text-orange-400">Name</TableHead>
                <TableHead className="text-orange-400">Capacity</TableHead>
                <TableHead className="text-orange-400">Status</TableHead>
                <TableHead className="text-orange-400">Species</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tanksArray && tanksArray.length > 0 ? (
                tanksArray.map((tank: any, index: number) => (
                  <TableRow key={tank.id || index} className="hover:bg-gray-800">
                    <TableCell className="font-mono">{tank.id || `tank-${index}`}</TableCell>
                    <TableCell>{tank.name || "Unnamed"}</TableCell>
                    <TableCell>{tank.capacity || "N/A"} L</TableCell>
                    <TableCell>
                      <Badge className={`
                        ${tank.status === 'operational' ? 'bg-green-600' : ''}
                        ${tank.status === 'maintenance' ? 'bg-amber-600' : ''}
                        ${tank.status === 'offline' ? 'bg-red-600' : ''}
                        ${!tank.status ? 'bg-gray-600' : ''}
                      `}>
                        {tank.status || "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell>{Array.isArray(tank.species) ? tank.species.join(", ") : (tank.species || "None")}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400">No tanks found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-4 p-2 bg-gray-850 rounded text-xs text-gray-400">
            <p>Total tanks: {tanksArray ? tanksArray.length : 0}</p>
          </div>
        </div>
      );
      
    case 'readings':
      return (
        <div className="space-y-4">
          <div className="bg-gray-950/50 rounded-md p-3">
            <p className="text-orange-400 font-medium">Tank ID: <span className="text-white font-mono">{data.tankId || "Unknown"}</span></p>
            <p className="text-orange-400 text-sm mt-1">Last Updated: <span className="text-white">{data.timestamp || "Unknown"}</span></p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.readings && Object.entries(data.readings).map(([key, value]: [string, any]) => (
              <div key={key} className="border border-gray-700 rounded-md p-3 bg-gray-850">
                <div className="text-sm text-gray-400 mb-1 capitalize">{key}</div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">
                    {value.value} 
                    <span className="text-xs text-gray-400 ml-1">{value.unit || ''}</span>
                  </span>
                  <Badge className={`
                    ${value.status === 'normal' ? 'bg-green-600' : ''}
                    ${value.status === 'warning' ? 'bg-amber-600' : ''}
                    ${value.status === 'critical' ? 'bg-red-600' : ''}
                    ${!value.status ? 'bg-gray-600' : ''}
                  `}>
                    {value.status || "Unknown"}
                  </Badge>
                </div>
              </div>
            ))}
            
            {(!data.readings || Object.keys(data.readings).length === 0) && (
              <div className="col-span-2 border border-gray-700 rounded-md p-4 text-center text-gray-400">
                No readings available
              </div>
            )}
          </div>
        </div>
      );
      
    case 'sensors':
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
      
    default:
      return (
        <pre className="bg-gray-950 p-4 rounded-md overflow-x-auto text-sm text-gray-300">
          {JSON.stringify(data, null, 2)}
        </pre>
      );
  }
};

// Helper function for battery level color
function getBatteryColorClass(level: number | undefined): string {
  if (!level && level !== 0) return "bg-gray-600";
  if (level < 20) return "bg-red-600";
  if (level < 50) return "bg-amber-600";
  return "bg-green-600";
}
