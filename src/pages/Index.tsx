
import React from 'react';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-100">
      <div className="text-center p-8 max-w-md rounded-xl shadow-sm bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Empty Project</h1>
        <p className="text-gray-600 mb-6">
          Ready to connect to your GitHub repository and start building!
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Visit GitHub
          </a>
          <a 
            href="https://docs.lovable.dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
