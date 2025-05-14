
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from 'lucide-react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  pendingAction: 'solution' | 'lecture' | null;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  pendingAction
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gray-900 border border-gray-700 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-orange-500 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            {pendingAction === 'solution' ? 'View Solution?' : 'View Information?'}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            {pendingAction === 'solution' ? (
              <div>
                Looking at the solution will prevent you from experiencing the challenge of solving this problem yourself. Are you sure you want to continue?
              </div>
            ) : (
              <div>
                This section contains educational information about the concepts involved in this challenge. It may contain hints or explanations that could make the challenge easier.
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center gap-2">
          <AlertDialogCancel className="text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white">
            I'll try again
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm} 
            className="bg-orange-600 text-white hover:bg-orange-700"
          >
            {pendingAction === 'solution' ? "Show me the solution" : "Show me the information"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
