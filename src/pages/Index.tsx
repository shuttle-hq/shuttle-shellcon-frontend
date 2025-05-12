
import React from 'react';
import SystemArchitecture from '../components/SystemArchitecture';
import SystemStatus from '../components/SystemStatus';
import ChallengeList from '../components/ChallengeList';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white py-4 border-b-4 border-orange-500">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">ShellCon Smart Aquarium Dashboard</h1>
          <p className="text-gray-300 text-sm md:text-base">
            Real-time monitoring and optimization challenges for the world's premier crustacean convention
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <SystemArchitecture />
        <SystemStatus />
        <ChallengeList />
      </main>
      
      <footer className="bg-gray-900 text-white py-4 border-t-2 border-orange-500 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          &copy; {new Date().getFullYear()} ShellCon Smart Aquarium System | Powered by Shuttle.dev
        </div>
      </footer>
    </div>
  );
};

export default Index;
