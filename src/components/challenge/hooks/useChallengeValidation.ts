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
      // Debug the entire API response
      console.log(`Challenge ${challenge.id} validation response:`, JSON.stringify(data, null, 2));
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
      if (onSystemStatusUpdate) {
        const mappedSystemComponent = mapChallengeIdToSystemComponent(challenge.id);
        console.log(`Challenge ${challenge.id} maps to component: ${mappedSystemComponent}`);
        
        // Check if API provided system_component info
        if (data.system_component) {
          console.log(`API provided system_component info:`, data.system_component);
          
          // Handle the specific format from the API
          if (data.system_component.status) {
            // API returns { name, status, description } format
            console.log(`API returned status: ${data.system_component.status} for component ${data.system_component.name}`);
            console.log(`Mapped component name: ${mappedSystemComponent}`);
            
            // Debug the exact object structure we're creating
            systemStatus = { [mappedSystemComponent]: data.system_component.status };
            console.log(`Created system status object:`, JSON.stringify(systemStatus));
          } else {
            // Fallback to the old format
            systemStatus = { [mappedSystemComponent]: data.valid ? 'normal' : (challenge.id === 3 ? 'error' : 'degraded') };
          }
        } else {
          console.warn(`API response missing system_component field for challenge ${challenge.id}`);
          // Create a warning toast to notify the user
          if (data.valid) {
            toast({
              title: "System Status Warning",
              description: `The API response is missing system status information. The system status may not update correctly.`,
              variant: "warning"
            });
          }
          systemStatus = { [mappedSystemComponent]: data.valid ? 'normal' : (challenge.id === 3 ? 'error' : 'degraded') };
        }
        
        console.log(`Updating system status for challenge ${challenge.id}:`, systemStatus);
        onSystemStatusUpdate(systemStatus);
      } else {
        console.warn(`No onSystemStatusUpdate callback provided for challenge ${challenge.id}`);
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
      if (onSystemStatusUpdate) {
        if (data.systemStatus) {
          console.log(`Old API format provided systemStatus:`, data.systemStatus);
          systemStatus = data.systemStatus;
        } else {
          console.warn(`API response (old format) missing systemStatus field for challenge ${challenge.id}`);
          // Create a warning toast to notify the user
          if (data.success) {
            toast({
              title: "System Status Warning",
              description: `The API response is missing system status information. The system status may not update correctly.`,
              variant: "warning"
            });
          }
          
          const mappedSystemComponent = mapChallengeIdToSystemComponent(challenge.id);
          systemStatus = { [mappedSystemComponent]: data.success ? 'normal' : (challenge.id === 3 ? 'error' : 'degraded') };
        }
        
        console.log(`Updating system status for challenge ${challenge.id}:`, systemStatus);
        onSystemStatusUpdate(systemStatus);
      } else {
        console.warn(`No onSystemStatusUpdate callback provided for challenge ${challenge.id}`);
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
  
  // Add detailed logging
  console.log(`Mapping challenge ID ${id} to system component`);
  
  let componentName = '';
  switch (id) {
    case 1: componentName = 'environmental_monitoring'; break;
    case 2: componentName = 'species_database'; break;
    case 3: componentName = 'feeding_system'; break;
    case 4: componentName = 'remote_monitoring'; break;
    case 5: componentName = 'analysis_engine'; break;
    default: componentName = '';
  }
  
  console.log(`Mapped challenge ID ${id} to component: ${componentName}`);
  return componentName;
};
