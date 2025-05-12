
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { JsonView } from './CommonComponents';

export const SpeciesListDisplay = ({ data }) => {
  if (!Array.isArray(data)) {
    return <JsonView data={data} />;
  }
  
  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse w-full">
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead className="text-purple-400">ID</TableHead>
            <TableHead className="text-purple-400">Name</TableHead>
            <TableHead className="text-purple-400">Scientific Name</TableHead>
            <TableHead className="text-purple-400">Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((species) => (
            <TableRow key={species.id} className="border-t border-gray-700">
              <TableCell className="text-gray-300">{species.id}</TableCell>
              <TableCell className="text-gray-300">{species.name}</TableCell>
              <TableCell className="text-gray-300"><em>{species.scientific_name}</em></TableCell>
              <TableCell className="text-gray-300">{species.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export const SpeciesDetailsDisplay = ({ data }) => {
  if (!data || typeof data !== 'object') {
    return <JsonView data={data} />;
  }

  return (
    <div className="bg-gray-800 rounded-md p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-purple-400">{data.name}</h3>
          <p className="text-sm italic text-gray-400">{data.scientific_name}</p>
        </div>
        <div className="text-right">
          <span className="inline-block bg-purple-500/30 text-purple-300 px-2 py-1 rounded text-xs">
            {data.type}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <h4 className="text-purple-300 font-medium">Origin</h4>
          <p className="text-gray-300">{data.origin || 'Unknown'}</p>
        </div>
        <div>
          <h4 className="text-purple-300 font-medium">Size</h4>
          <p className="text-gray-300">{data.max_size || 'Unknown'}</p>
        </div>
        <div>
          <h4 className="text-purple-300 font-medium">Lifespan</h4>
          <p className="text-gray-300">{data.lifespan || 'Unknown'}</p>
        </div>
        <div>
          <h4 className="text-purple-300 font-medium">Diet</h4>
          <p className="text-gray-300">{data.diet || 'Varied'}</p>
        </div>
      </div>

      {data.description && (
        <div className="mt-2">
          <h4 className="text-purple-300 font-medium">Description</h4>
          <p className="text-gray-300 text-sm">{data.description}</p>
        </div>
      )}

      {data.care_instructions && (
        <div className="mt-2">
          <h4 className="text-purple-300 font-medium">Care Instructions</h4>
          <p className="text-gray-300 text-sm">{data.care_instructions}</p>
        </div>
      )}

      {data.parameters && (
        <div className="mt-2">
          <h4 className="text-purple-300 font-medium">Water Parameters</h4>
          <div className="grid grid-cols-3 gap-2 mt-1">
            {Object.entries(data.parameters).map(([key, value]) => (
              <div key={key} className="bg-gray-700/50 p-2 rounded">
                <div className="text-xs text-gray-400">{key}</div>
                <div className="text-sm text-white">{value as string}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const FeedingScheduleDisplay = ({ data }) => {
  if (!data || !data.schedule) {
    return <JsonView data={data} />;
  }

  return (
    <div className="bg-gray-800 rounded-md p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-purple-400">
          {data.species_name || 'Feeding Schedule'}
        </h3>
        {data.tank_type && (
          <p className="text-sm text-gray-400">
            Tank type: <span className="text-purple-300">{data.tank_type}</span>
          </p>
        )}
        {data.custom_diet && (
          <p className="text-sm text-gray-400">
            Custom diet: <span className="text-purple-300">{data.custom_diet}</span>
          </p>
        )}
      </div>

      <div className="overflow-x-auto">
        <Table className="border-collapse w-full">
          <TableHeader className="bg-gray-700">
            <TableRow>
              <TableHead className="text-purple-300">Time</TableHead>
              <TableHead className="text-purple-300">Food Type</TableHead>
              <TableHead className="text-purple-300">Amount</TableHead>
              <TableHead className="text-purple-300">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.schedule.map((item, index) => (
              <TableRow key={index} className="border-t border-gray-700">
                <TableCell className="text-gray-300">{item.time}</TableCell>
                <TableCell className="text-gray-300">{item.food_type}</TableCell>
                <TableCell className="text-gray-300">{item.amount}</TableCell>
                <TableCell className="text-gray-300">{item.notes || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data.tips && (
        <div className="mt-4 p-3 bg-purple-900/20 border border-purple-500/20 rounded">
          <h4 className="text-purple-300 text-sm font-medium">Feeding Tips</h4>
          <p className="text-gray-300 text-sm mt-1">{data.tips}</p>
        </div>
      )}
    </div>
  );
};
