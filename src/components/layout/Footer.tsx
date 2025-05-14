
import React from 'react';
import { FerrisWheel } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-4 border-t-2 border-orange-500 mt-8 relative">
      <div className="container mx-auto px-4 text-center text-sm">
        &copy; {new Date().getFullYear()} ShellCon Smart Aquarium System | Powered by 
        <a href="https://shuttle.dev" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 ml-1">
          Shuttle
        </a>
      </div>
      <div className="mascot-footer w-16 h-16 right-4 absolute top-1/2 transform -translate-y-1/2">
        <FerrisWheel className="h-full w-full text-orange-400" />
      </div>
    </footer>
  );
}

export default Footer;
