
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useSystemStatus } from '../hooks/useAquariumData';
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'online':
      case 'ok':
      case 'operational':
        return 'bg-green-500 hover:bg-green-600';
      case 'degraded':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'critical':
      case 'offline':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Badge className={`${getStatusColor()} text-white font-medium`}>
      {status}
    </Badge>
  );
};

const SystemStatus: React.FC = () => {
  const { status, loading, error } = useSystemStatus();

  return (
    <Card className="mb-8 shadow-lg orange-glow">
      <CardHeader className="bg-orange-500 bg-opacity-90 text-white">
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {status && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-md border-2 border-orange-500/30 bg-gray-900 hover:border-orange-400 transition-all duration-300 shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white">Environmental Monitoring</h3>
                <StatusBadge status={status.environmental_monitoring} />
              </div>
            </div>
            <div className="p-4 rounded-md border-2 border-orange-500/30 bg-gray-900 hover:border-orange-400 transition-all duration-300 shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white">Species Database</h3>
                <StatusBadge status={status.species_database} />
              </div>
            </div>
            <div className="p-4 rounded-md border-2 border-orange-500/30 bg-gray-900 hover:border-orange-400 transition-all duration-300 shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white">Overall Status</h3>
                <StatusBadge status={status.overall_status} />
              </div>
            </div>
            <div className="col-span-1 md:col-span-3 text-xs text-gray-300 text-right">
              Last updated: {status.last_updated ? new Date(status.last_updated).toLocaleString() : 'N/A'}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
