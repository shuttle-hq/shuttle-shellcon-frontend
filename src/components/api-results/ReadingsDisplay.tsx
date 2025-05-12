
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface ReadingsDisplayProps {
  data: any;
}

export const ReadingsDisplay: React.FC<ReadingsDisplayProps> = ({ data }) => {
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
};
