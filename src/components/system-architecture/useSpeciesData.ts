
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { getSpecies, getFeedingSchedule } from '../../api/aquariumApi';

export const useSpeciesData = () => {
  const [speciesListData, setSpeciesListData] = useState<any>(null);
  const [speciesSearchData, setSpeciesSearchData] = useState<any>(null);
  const [speciesDetailsData, setSpeciesDetailsData] = useState<any>(null);
  const [feedingScheduleData, setFeedingScheduleData] = useState<any>(null);
  
  const [speciesListLoading, setSpeciesListLoading] = useState(false);
  const [speciesSearchLoading, setSpeciesSearchLoading] = useState(false);
  const [speciesDetailsLoading, setSpeciesDetailsLoading] = useState(false);
  const [feedingScheduleLoading, setFeedingScheduleLoading] = useState(false);
  
  const [speciesListError, setSpeciesListError] = useState<string | null>(null);
  const [speciesSearchError, setSpeciesSearchError] = useState<string | null>(null);
  const [speciesDetailsError, setSpeciesDetailsError] = useState<string | null>(null);
  const [feedingScheduleError, setFeedingScheduleError] = useState<string | null>(null);
  
  const [showSpeciesListDialog, setShowSpeciesListDialog] = useState(false);
  const [showSpeciesSearchDialog, setShowSpeciesSearchDialog] = useState(false);
  const [showSpeciesDetailsDialog, setShowSpeciesDetailsDialog] = useState(false);
  const [showFeedingScheduleDialog, setShowFeedingScheduleDialog] = useState(false);

  // Initialize with some default species for demonstration
  const [speciesList, setSpeciesList] = useState([
    { id: 1, name: 'American Lobster', scientific_name: 'Homarus americanus', type: 'Crustacean' },
    { id: 2, name: 'Blue Crab', scientific_name: 'Callinectes sapidus', type: 'Crustacean' },
    { id: 3, name: 'Coconut Crab', scientific_name: 'Birgus latro', type: 'Crustacean' },
    { id: 4, name: 'Mantis Shrimp', scientific_name: 'Odontodactylus scyllarus', type: 'Crustacean' }
  ]);

  const handleListAllSpecies = async () => {
    setSpeciesListLoading(true);
    setSpeciesListError(null);
    
    try {
      const data = await getSpecies();
      setSpeciesListData(data);
      // Update the species list for dropdowns
      if (Array.isArray(data)) {
        setSpeciesList(data);
      }
      setShowSpeciesListDialog(true);
    } catch (error) {
      console.error('Error fetching species list:', error);
      setSpeciesListError('Failed to fetch species list');
      toast({
        title: 'Error',
        description: 'Failed to fetch species list',
        variant: 'destructive'
      });
    } finally {
      setSpeciesListLoading(false);
    }
  };

  const handleSearchSpecies = async (searchTerm: string, searchType: "name" | "scientific_name") => {
    setSpeciesSearchLoading(true);
    setSpeciesSearchError(null);
    
    try {
      // Here we'd normally query with search parameters
      const params = new URLSearchParams();
      params.append(searchType, searchTerm);
      
      // For now, simulate a filtered response based on the mock data
      const filteredData = speciesList.filter(species => 
        species[searchType].toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSpeciesSearchData(filteredData);
      setShowSpeciesSearchDialog(true);
    } catch (error) {
      console.error('Error searching species:', error);
      setSpeciesSearchError('Failed to search species');
      toast({
        title: 'Error',
        description: 'Failed to search species',
        variant: 'destructive'
      });
    } finally {
      setSpeciesSearchLoading(false);
    }
  };

  const handleGetSpeciesDetails = async (speciesId: string) => {
    setSpeciesDetailsLoading(true);
    setSpeciesDetailsError(null);
    
    try {
      // Here we'd normally fetch by ID from the API
      // For now, find the species in our mock data
      const species = speciesList.find(s => s.id.toString() === speciesId);
      
      if (species) {
        // Enhance with mock detailed data
        const detailedData = {
          ...species,
          origin: 'Atlantic Ocean',
          max_size: '24 inches',
          lifespan: '20-30 years',
          diet: 'Omnivore',
          description: 'A large marine crustacean with robust claws',
          care_instructions: 'Maintain water temperature between 68-74°F',
          parameters: {
            'Temperature': '68-74°F',
            'pH': '8.0-8.4',
            'Salinity': '1.022-1.025'
          }
        };
        
        setSpeciesDetailsData(detailedData);
        setShowSpeciesDetailsDialog(true);
      } else {
        throw new Error('Species not found');
      }
    } catch (error) {
      console.error('Error fetching species details:', error);
      setSpeciesDetailsError('Failed to fetch species details');
      toast({
        title: 'Error',
        description: 'Failed to fetch species details',
        variant: 'destructive'
      });
    } finally {
      setSpeciesDetailsLoading(false);
    }
  };

  const handleGetFeedingSchedule = async (speciesId: string, tankType: string, customDiet?: string) => {
    setFeedingScheduleLoading(true);
    setFeedingScheduleError(null);
    
    try {
      // Here we'd normally fetch from the API with parameters
      // Mock response for now
      const species = speciesList.find(s => s.id.toString() === speciesId);
      
      if (!species) {
        throw new Error('Species not found');
      }
      
      const mockSchedule = {
        species_name: species.name,
        tank_type: tankType,
        custom_diet: customDiet || null,
        schedule: [
          {
            time: '08:00 AM',
            food_type: 'Pellets',
            amount: '2 tablespoons',
            notes: 'Morning feeding'
          },
          {
            time: '02:00 PM',
            food_type: 'Frozen shrimp',
            amount: '1 cube',
            notes: 'Afternoon feeding'
          },
          {
            time: '08:00 PM',
            food_type: 'Mixed diet',
            amount: '1-2 tablespoons',
            notes: 'Evening feeding'
          }
        ],
        tips: 'Ensure food is fully consumed within 5 minutes to maintain water quality.'
      };
      
      setFeedingScheduleData(mockSchedule);
      setShowFeedingScheduleDialog(true);
    } catch (error) {
      console.error('Error fetching feeding schedule:', error);
      setFeedingScheduleError('Failed to fetch feeding schedule');
      toast({
        title: 'Error',
        description: 'Failed to fetch feeding schedule',
        variant: 'destructive'
      });
    } finally {
      setFeedingScheduleLoading(false);
    }
  };

  return {
    // Data
    speciesList,
    speciesListData,
    speciesSearchData,
    speciesDetailsData,
    feedingScheduleData,
    
    // Loading states
    speciesListLoading,
    speciesSearchLoading,
    speciesDetailsLoading,
    feedingScheduleLoading,
    
    // Errors
    speciesListError,
    speciesSearchError,
    speciesDetailsError,
    feedingScheduleError,
    
    // Dialog visibility
    showSpeciesListDialog,
    setShowSpeciesListDialog,
    showSpeciesSearchDialog,
    setShowSpeciesSearchDialog,
    showSpeciesDetailsDialog,
    setShowSpeciesDetailsDialog,
    showFeedingScheduleDialog,
    setShowFeedingScheduleDialog,
    
    // Handlers
    handleListAllSpecies,
    handleSearchSpecies,
    handleGetSpeciesDetails,
    handleGetFeedingSchedule
  };
};
