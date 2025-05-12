import React, { useState, useEffect } from 'react';
import SystemArchitecture from '../components/SystemArchitecture';
import SystemStatus from '../components/SystemStatus';
import ChallengeList from '../components/ChallengeList';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FirstTimeModal from '../components/FirstTimeModal';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFirstTimeModal, setShowFirstTimeModal] = useState(false);

  useEffect(() => {
    // For testing purposes - uncomment to always show the modal
    localStorage.removeItem('hasVisitedBefore');
    
    // Check if this is the user's first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    console.log("hasVisitedBefore value:", hasVisitedBefore);
    
    if (!hasVisitedBefore) {
      console.log("Setting modal to show");
      setShowFirstTimeModal(true);
      toast({
        title: "Welcome to ShellCon!",
        description: "First time modal should appear now",
      });
    }
  }, []);

  const handleCloseFirstTimeModal = () => {
    console.log("Modal closed");
    localStorage.setItem('hasVisitedBefore', 'true');
    setShowFirstTimeModal(false);
  };

  const handleReadStory = () => {
    console.log("Read story button clicked");
    setIsOpen(true);
    handleCloseFirstTimeModal();
    // Scroll to the alert section
    setTimeout(() => {
      const alertElement = document.querySelector('.alert-story');
      if (alertElement) {
        alertElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  console.log("Render - Modal state:", showFirstTimeModal);

  return (
    <>
      <FirstTimeModal 
        isOpen={showFirstTimeModal} 
        onClose={handleCloseFirstTimeModal} 
        onReadStory={handleReadStory}
      />
      
      <div className="min-h-screen bg-gray-900">
        <header className="header-with-mascot bg-black text-white py-4 border-b-4 border-orange-500">
          <div className="container mx-auto px-4 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/05b270df-e4c2-4bb9-8616-c60df68d5506.png" 
                alt="Shuttle Logo" 
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-orange-400">ShellCon Smart Aquarium Dashboard</h1>
                <p className="text-gray-300 text-sm md:text-base">
                  Real-time monitoring and optimization challenges for the world's premier crustacean convention
                </p>
              </div>
            </div>
          </div>
          <div className="header-mascot w-32 h-32">
            <img 
              src="/lovable-uploads/4adfa2cc-cffd-4463-8069-939658c80853.png" 
              alt="Ferris the Crab" 
              className="w-full h-full object-contain animate-float"
            />
          </div>
        </header>

        <div className="container mx-auto px-4 py-3 mt-4">
          <Alert 
            variant="highlight" 
            className="border-orange-500 shadow-xl alert-story"
          >
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={`
                        relative overflow-hidden bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 
                        bg-size-200 animate-gradient text-white font-bold px-6 py-3 shadow-lg 
                        hover:shadow-orange-500/50 border-none
                        flex items-center gap-2 transition-all duration-300
                        hover:scale-105 animate-pulse
                      `}
                    >
                      <Sparkles className="h-4 w-4 animate-spin-slow" />
                      Read Story
                      <ArrowDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : 'animate-bounce'}`} />
                      <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-purple-500 opacity-50 blur-sm"></span>
                    </Button>
                  </CollapsibleTrigger>
                  <h2 className="text-lg font-semibold text-orange-300">
                    Welcome to the Shuttle onboarding adventure!
                  </h2>
                </div>
              </div>
              
              <p className="text-gray-300 mt-1">
                You are now a member of the emergency technical response team for ShellCon, where Rustaceans and crustaceans unite!
              </p>
              
              <CollapsibleContent className="text-sm mt-2 space-y-3 text-gray-300 animate-fade-in">
                <div>
                  <p className="font-semibold text-orange-300">The Situation</p>
                  <p>
                    This year's ShellCon features a revolutionary Smart Aquarium system built with Rust and deployed on Shuttle. 
                    The system uses advanced sensors and analytics to maintain perfect environments for rare and valuable crab, 
                    lobster, and shrimp specimens from around the world.
                  </p>
                </div>
                
                <p>
                  However, just hours before the convention opens, several performance issues have been detected in the backend services. 
                  As a newly recruited Rustacean engineer, you've been called in to optimize these systems before the doors open to 
                  the public. The organizers are in a pinch—quite literally, as the convention's mascot, a giant Coconut Crab 
                  named Ferris, is anxiously clicking his claws at the mounting technical issues!
                </p>
                
                <div>
                  <p className="font-semibold text-orange-300">The Smart Aquarium is powered by three microservices running on Shuttle:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><span className="font-medium text-orange-200">aqua-monitor:</span> Collects real-time environmental data from tank sensors (currently moving at a snail's pace instead of crab-like efficiency)</li>
                    <li><span className="font-medium text-orange-200">species-hub:</span> Manages the species database and feeding requirements (currently as disorganized as a lobster molting season)</li>
                    <li><span className="font-medium text-orange-200">aqua-brain:</span> Performs analysis and coordinates system responses (currently experiencing more bottlenecks than a hermit crab trying to fit into a new shell)</li>
                  </ul>
                </div>
                
                <p>
                  Your mission is to solve a series of challenges that will optimize these services, demonstrating your 
                  Rust backend expertise while learning valuable patterns for high-performance distributed systems. 
                  Each fix brings you one step closer to ensuring the safety of these incredible creatures and saving 
                  the reputation of ShellCon.
                </p>
                
                <p>
                  Examine each challenge, implement the suggested optimizations, and watch as the system's performance improves. 
                  The convention opens soon—the clock is ticking and the crustaceans are getting crabby! Remember, in the 
                  world of Rust performance optimization, you're not just a developer—you're a Rustacean on a mission!
                </p>
              </CollapsibleContent>
            </Collapsible>
          </Alert>
        </div>

        <main className="container mx-auto px-4 py-8 bg-gray-900 text-white">
          <SystemArchitecture />
          <SystemStatus />
          <ChallengeList />
        </main>
        
        <footer className="bg-black text-white py-4 border-t-2 border-orange-500 mt-8 relative">
          <div className="container mx-auto px-4 text-center text-sm">
            &copy; {new Date().getFullYear()} ShellCon Smart Aquarium System | Powered by 
            <a href="https://shuttle.dev" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 ml-1">
              Shuttle
            </a>
          </div>
          <div className="mascot-footer w-16 h-16 right-4 absolute top-1/2 transform -translate-y-1/2">
            <img 
              src="/lovable-uploads/4adfa2cc-cffd-4463-8069-939658c80853.png" 
              alt="Ferris the Crab" 
              className="w-full h-full object-contain"
            />
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
