
import React from 'react';
import ServiceCard from './system-architecture/ServiceCard';
import SpeciesHubCard from './system-architecture/SpeciesHubCard';

const SystemArchitecture = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-orange-400">System Architecture</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard serviceName="aqua-monitor" />
        <SpeciesHubCard />
        <ServiceCard serviceName="aqua-brain" />
      </div>
    </section>
  );
};

export default SystemArchitecture;
