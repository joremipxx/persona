import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PersonaData, PersonaFormData } from '@/types/persona';
import { PersonaService } from '@/services/personaService';

interface PersonaStore {
  // Current step
  currentStep: number;
  
  // Persona data
  personaData: Partial<PersonaData>;
  
  // UI state
  isOverviewMode: boolean;
  
  // Database state
  savedPersonaId: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentStep: (step: number) => void;
  updatePersonaData: (data: Partial<PersonaData>) => void;
  setOverviewMode: (isOverview: boolean) => void;
  resetPersona: () => void;
  exportPersona: () => PersonaFormData | null;
  
  // Database actions
  savePersonaToDatabase: (userId: string) => Promise<boolean>;
  loadPersonaFromDatabase: (personaId: string) => Promise<boolean>;
  loadUserPersonas: (userId: string) => Promise<any[]>;
  deletePersonaFromDatabase: (personaId: string) => Promise<boolean>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const STORAGE_KEY = 'persona-builder-data';

export const usePersonaStore = create<PersonaStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 1,
      personaData: {},
      isOverviewMode: false,
      savedPersonaId: null,
      isLoading: false,
      error: null,
      
      // Actions
      setCurrentStep: (step: number) => {
        set({ currentStep: Math.max(1, Math.min(7, step)) });
      },
      
      updatePersonaData: (data: Partial<PersonaData>) => {
        set((state) => ({
          personaData: { ...state.personaData, ...data }
        }));
      },
      
      setOverviewMode: (isOverview: boolean) => {
        set({ isOverviewMode: isOverview });
      },
      
      resetPersona: () => {
        set({
          currentStep: 1,
          personaData: {},
          isOverviewMode: false,
          savedPersonaId: null,
          error: null
        });
      },
      
      exportPersona: () => {
        const { personaData } = get();
        // Check if all required fields are present
        const requiredFields = [
          'personaName', 'avatarId', 'ageRange', 'educationLevel',
          'professionalSector', 'organizationSize', 'jobTitle', 'jobMeasuredBy',
          'reportsTo', 'goals', 'biggestChallenges', 'responsibilities',
          'tools', 'communicationPreference', 'informationGathering',
          'socialNetworks'
        ];
        
        const hasAllFields = requiredFields.every(field => {
          const value = personaData[field as keyof PersonaData];
          if (Array.isArray(value)) {
            return value.length > 0;
          }
          return value !== undefined && value !== '';
        });
        
        if (hasAllFields) {
          return personaData as PersonaFormData;
        }
        
        return null;
      },

      // Database actions
      savePersonaToDatabase: async (userId: string) => {
        const { personaData } = get();
        set({ isLoading: true, error: null });

        try {
          const savedPersona = await PersonaService.savePersona(personaData, userId);
          
          if (savedPersona) {
            set({ 
              savedPersonaId: savedPersona.id,
              isLoading: false,
              error: null
            });
            return true;
          } else {
            set({ 
              isLoading: false,
              error: 'Failed to save persona to database'
            });
            return false;
          }
        } catch (error) {
          set({ 
            isLoading: false,
            error: 'Error saving persona to database'
          });
          return false;
        }
      },

      loadPersonaFromDatabase: async (personaId: string) => {
        set({ isLoading: true, error: null });

        try {
          const persona = await PersonaService.getPersonaById(personaId);
          
          if (persona) {
            // Transform database data back to frontend format
            const transformedData = {
              personaName: persona.persona_name,
              avatarId: persona.avatar_id,
              ageRange: persona.age_range,
              educationLevel: persona.education_level,
              professionalSector: persona.professional_sector,
              organizationSize: persona.organization_size,
              jobTitle: persona.job_title,
              jobMeasuredBy: persona.job_measured_by,
              reportsTo: persona.reports_to,
              goals: persona.goals,
              biggestChallenges: persona.biggest_challenges,
              responsibilities: persona.responsibilities,
              tools: persona.tools,
              communicationPreference: persona.communication_preference,
              informationGathering: persona.information_gathering,
              socialNetworks: persona.social_networks
            };

            set({ 
              personaData: transformedData,
              savedPersonaId: persona.id,
              isLoading: false,
              error: null
            });
            return true;
          } else {
            set({ 
              isLoading: false,
              error: 'Persona not found'
            });
            return false;
          }
        } catch (error) {
          set({ 
            isLoading: false,
            error: 'Error loading persona from database'
          });
          return false;
        }
      },

      loadUserPersonas: async (userId: string) => {
        set({ isLoading: true, error: null });

        try {
          const personas = await PersonaService.getPersonasByUserId(userId);
          set({ isLoading: false, error: null });
          return personas;
        } catch (error) {
          set({ 
            isLoading: false,
            error: 'Error loading user personas'
          });
          return [];
        }
      },

      deletePersonaFromDatabase: async (personaId: string) => {
        set({ isLoading: true, error: null });

        try {
          const success = await PersonaService.deletePersona(personaId);
          
          if (success) {
            set({ 
              savedPersonaId: null,
              isLoading: false,
              error: null
            });
            return true;
          } else {
            set({ 
              isLoading: false,
              error: 'Failed to delete persona'
            });
            return false;
          }
        } catch (error) {
          set({ 
            isLoading: false,
            error: 'Error deleting persona'
          });
          return false;
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      }
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        currentStep: state.currentStep,
        personaData: state.personaData,
        isOverviewMode: state.isOverviewMode,
        savedPersonaId: state.savedPersonaId
      })
    }
  )
);

// Auto-save hook
export const useAutoSave = () => {
  const updatePersonaData = usePersonaStore((state) => state.updatePersonaData);
  
  return (data: Partial<PersonaData>) => {
    updatePersonaData(data);
  };
};
