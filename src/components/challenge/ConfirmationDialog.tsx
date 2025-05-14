
import React from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

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
      <AlertDialogContent className="border-2 border-orange-500/40 bg-gray-900 max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center flex items-center justify-center gap-2 text-orange-400">
            <span className="text-2xl">🦀</span>
            <span className="text-xl futuristic-title">Ferris Says</span>
            <span className="text-2xl">🦀</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-300 mt-2">
            {pendingAction === 'solution' ? (
              <p>Are you sure you want to view the solution? Trying to solve it yourself first is the best way to learn!</p>
            ) : (
              <p>This additional information might contain hints about the solution. Are you sure you want to proceed?</p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center mt-4">
          <AlertDialogCancel className="text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white mr-2">
            I'll try again
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={onConfirm}
          >
            Show me anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
