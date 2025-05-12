
import React from 'react';
import { FeedingSchedule } from '../system-architecture/useSpeciesData';

interface FeedingScheduleDisplayProps {
  data: FeedingSchedule;
}

export const FeedingScheduleDisplay: React.FC<FeedingScheduleDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-800 p-4 rounded-md">
        <h3 className="text-lg font-bold text-orange-400 mb-2">
          Feeding Schedule for {data.species_name}
        </h3>
        
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-orange-400 uppercase bg-gray-900">
              <tr>
                <th scope="col" className="px-4 py-2">Time</th>
                <th scope="col" className="px-4 py-2">Food Type</th>
                <th scope="col" className="px-4 py-2">Amount</th>
                <th scope="col" className="px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.schedule.map((item, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-2">{item.time}</td>
                  <td className="px-4 py-2 font-medium">{item.food_type}</td>
                  <td className="px-4 py-2">{item.amount}</td>
                  <td className="px-4 py-2 text-gray-400">{item.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {data.recommendations && data.recommendations.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-orange-300 mb-2">Recommendations</h4>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {data.recommendations.map((rec, index) => (
                <li key={index} className="mb-1">{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
