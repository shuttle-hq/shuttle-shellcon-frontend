
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

interface TanksTableProps {
  tanksArray: any[];
}

export const TanksTable: React.FC<TanksTableProps> = ({ tanksArray }) => {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader className="bg-gray-950/50">
          <TableRow>
            <TableHead className="text-orange-400">Tank ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tanksArray && tanksArray.length > 0 ? (
            tanksArray.map((tankId: string, index: number) => (
              <TableRow key={index} className="hover:bg-gray-800">
                <TableCell className="font-mono">{tankId}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center text-gray-400">No tanks found</TableCell>
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
