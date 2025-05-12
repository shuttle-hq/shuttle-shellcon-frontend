
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Book, Sparkles } from "lucide-react";

interface FirstTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReadStory: () => void;
}

const FirstTimeModal = ({ isOpen, onClose, onReadStory }: FirstTimeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-orange-500 bg-gradient-to-b from-gray-900 to-black max-w-md relative overflow-hidden">
        <div className="mascot-background w-24 h-24 absolute right-0 -bottom-4">
          <img 
            src="/lovable-uploads/4adfa2cc-cffd-4463-8069-939658c80853.png" 
            alt="Ferris the Crab" 
            className="w-full h-full object-contain"
          />
        </div>
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-purple-400 flex items-center gap-2 font-mono">
            <Book className="h-5 w-5 text-orange-400" />
            Welcome to ShellCon!
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-sm tracking-wide font-light">
            You've been called in to help with the Smart Aquarium system at the world's premier crustacean convention!
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 text-gray-200 text-sm tracking-wide font-light relative z-10">
          <p className="mb-4">
            Before diving into the challenges, you'll need to understand the situation at ShellCon and what's expected of you.
          </p>
          <p>
            Would you like to read the story to get started with your mission?
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 relative z-10">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-600 hover:bg-gray-800 hover:text-gray-100 font-mono tracking-wide"
          >
            I'll check later
          </Button>
          <Button
            onClick={onReadStory}
            className="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-size-200 animate-gradient text-white font-mono tracking-wider hover:shadow-orange-500/50 border-none flex items-center gap-2 transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="h-4 w-4" />
            Read Story Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FirstTimeModal;
