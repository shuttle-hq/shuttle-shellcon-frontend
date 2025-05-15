import { Challenge } from '../../../hooks/useAquariumData';
import { API_BASE_URL } from '../../../config/api';
import { toast } from '../../../hooks/use-toast';

interface ValidationResult {
  isValid: boolean;
  message: string | null;
  systemStatus?: any;
}

export const validateChallengeSolution = async (
  challenge: Challenge,
  onSystemStatusUpdate?: (status: any) => void
): Promise<ValidationResult> => {
  try {
    // Get the correct validation endpoint from the challenge object
    let validationEndpoint = `/api/challenges/${challenge.id}/validate`;
    
    // Use the validation_endpoint from the challenge if available
    if (challenge.validation_endpoint && challenge.validation_endpoint.url) {
      // If the URL starts with '/', it's a relative path
      if (challenge.validation_endpoint.url.startsWith('/')) {
        validationEndpoint = challenge.validation_endpoint.url;
      } else {
        // Otherwise, prepend the API base URL
        validationEndpoint = `${API_BASE_URL}/${challenge.validation_endpoint.url}`;
      }
    }
    
    console.log(`Validating challenge ${challenge.id} using endpoint: ${validationEndpoint}`);
    
    // Call the validation endpoint
    const response = await fetch(validationEndpoint);
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Validation error (${response.status}):`, errorText);
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    // Safely parse the JSON response
    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error('Error parsing JSON response:', jsonError);
      throw new Error('Invalid response format from server');
    }

    let isValid = false;
    let message = null;
    let systemStatus = null;

    // Check if the response has the expected format
    if (data.valid !== undefined) {
      // New API format
      isValid = data.valid;
      message = data.message || (data.valid ? "Great job! Challenge successfully solved!" : "Validation failed. Please check your implementation.");
      
      // Only show success toast, not failure toast
      if (data.valid) {
        toast({
          title: "Challenge Completed!",
          description: `You've successfully solved: ${challenge.title}`,
          variant: "default"
        });
      }
      
      // Update system status if provided
      if (onSystemStatusUpdate && data.system_component) {
        const mappedSystemComponent = mapChallengeIdToSystemComponent(challenge.id);
        systemStatus = { [mappedSystemComponent]: data.valid ? 'normal' : (challenge.id === 3 ? 'error' : 'degraded') };
        onSystemStatusUpdate(systemStatus);
      }
    } else if (data.success !== undefined) {
      // Old API format
      isValid = data.success;
      message = data.message || (data.success ? "Great job! Challenge successfully solved!" : "Validation failed. Please check your implementation.");
      
      // Only show success toast, not failure toast
      if (data.success) {
        toast({
          title: "Challenge Completed!",
          description: `You've successfully solved: ${challenge.title}`,
          variant: "default"
        });
      }
      
      // Update system status if provided
      if (onSystemStatusUpdate && data.systemStatus) {
        systemStatus = data.systemStatus;
        onSystemStatusUpdate(systemStatus);
      }
    } else {
      // Unknown response format
      console.warn('Unknown validation response format:', data);
      message = "Received an unexpected response format from the server.";
      
      toast({
        title: "Validation Error",
        description: "Received an unexpected response format from the server.",
        variant: "destructive"
      });
    }

    return { isValid, message, systemStatus };
  } catch (error) {
    console.error('Error validating solution:', error);
    
    // Show error toast
    toast({
      title: "Validation Error",
      description: "We encountered a technical issue checking your solution.",
      variant: "destructive"
    });

    return { 
      isValid: false, 
      message: "Error validating solution. Please try again later."
    };
  }
};

// Helper function to map challenge ID to system component
const mapChallengeIdToSystemComponent = (challengeId: number | string): string => {
  const id = typeof challengeId === 'string' ? parseInt(challengeId, 10) : challengeId;
  
  switch (id) {
    case 1: return 'environmental_monitoring';
    case 2: return 'species_database';
    case 3: return 'feeding_system';
    case 4: return 'remote_monitoring';
    case 5: return 'analysis_engine';
    default: return '';
  }
};
