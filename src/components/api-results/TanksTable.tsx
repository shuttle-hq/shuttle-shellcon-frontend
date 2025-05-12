
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TanksTableProps {
  tanksArray: any[];
}

export const TanksTable: React.FC<TanksTableProps> = ({ tanksArray }) => {
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
};
