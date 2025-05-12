
import React from 'react';
import { Species } from '../system-architecture/useSpeciesData';

interface SpeciesListDisplayProps {
  data: Species[];
}

export const SpeciesListDisplay: React.FC<SpeciesListDisplayProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs text-orange-400 uppercase bg-gray-800">
          <tr>
            <th scope="col" className="px-3 py-2">ID</th>
            <th scope="col" className="px-3 py-2">Name</th>
            <th scope="col" className="px-3 py-2">Scientific Name</th>
            <th scope="col" className="px-3 py-2">Parameters</th>
          </tr>
        </thead>
        <tbody>
          {data.map((species) => (
            <tr key={species.id} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="px-3 py-2">{species.id}</td>
              <td className="px-3 py-2 font-medium">{species.name}</td>
              <td className="px-3 py-2 italic">{species.scientific_name}</td>
              <td className="px-3 py-2">
                <div className="flex flex-wrap gap-1">
                  {species.parameters?.temperature && (
                    <span className="bg-gray-700 px-1 py-0.5 rounded text-xs">
                      Temp: {species.parameters.temperature}
                    </span>
                  )}
                  {species.parameters?.ph && (
                    <span className="bg-gray-700 px-1 py-0.5 rounded text-xs">
                      pH: {species.parameters.ph}
                    </span>
                  )}
                  {species.parameters?.salinity && (
                    <span className="bg-gray-700 px-1 py-0.5 rounded text-xs">
                      Sal: {species.parameters.salinity}
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
