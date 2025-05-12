
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
            <th scope="col" className="px-4 py-3">ID</th>
            <th scope="col" className="px-4 py-3">Name</th>
            <th scope="col" className="px-4 py-3">Scientific Name</th>
            <th scope="col" className="px-4 py-3">Temperature</th>
            <th scope="col" className="px-4 py-3">pH</th>
            <th scope="col" className="px-4 py-3">Salinity</th>
          </tr>
        </thead>
        <tbody>
          {data.map((species) => (
            <tr key={species.id} className="border-b border-gray-700 hover:bg-gray-800">
              <td className="px-4 py-3">{species.id}</td>
              <td className="px-4 py-3 font-medium">{species.name}</td>
              <td className="px-4 py-3 italic">{species.scientific_name}</td>
              <td className="px-4 py-3">{species.parameters?.temperature || 'N/A'}</td>
              <td className="px-4 py-3">{species.parameters?.ph || 'N/A'}</td>
              <td className="px-4 py-3">{species.parameters?.salinity || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
