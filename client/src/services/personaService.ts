import { supabase, type Persona } from '@/lib/supabase';

export class PersonaService {
  // Demo user ID for testing without authentication
  private static readonly DEMO_USER_ID = 'demo-user-12345';

  // Create a new persona
  static async createPersona(personaData: Omit<Persona, 'id' | 'created_at' | 'updated_at' | 'user_id'>): Promise<Persona | null> {
    try {
      console.log('Attempting to create persona with data:', personaData);
      
      // For demo purposes, use a consistent demo user_id
      const personaWithUserId = {
        user_id: PersonaService.DEMO_USER_ID,
        persona_name: personaData.persona_name || 'Untitled Persona',
        avatar_id: personaData.avatar_id || 1,
        age_range: personaData.age_range || null,
        education_level: personaData.education_level || null,
        professional_sector: personaData.professional_sector || null,
        organization_size: personaData.organization_size || null,
        job_title: personaData.job_title || null,
        job_measured_by: personaData.job_measured_by || null,
        reports_to: personaData.reports_to || null,
        goals: personaData.goals || null,
        biggest_challenges: personaData.biggest_challenges || [],
        responsibilities: personaData.responsibilities || null,
        tools: personaData.tools || [],
        communication_preference: personaData.communication_preference || null,
        information_gathering: personaData.information_gathering || null,
        social_networks: personaData.social_networks || []
      };
      
      console.log('Creating persona with complete data:', personaWithUserId);
      
      const { data, error } = await supabase
        .from('personas')
        .insert(personaWithUserId)
        .select()
        .single();

      if (error) {
        console.error('Supabase error creating persona:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        return null;
      }

      console.log('Successfully created persona:', data);
      return data;
    } catch (error) {
      console.error('JavaScript error creating persona:', error);
      return null;
    }
  }

  // Get all personas for a user
  static async getPersonasByUserId(userId: string): Promise<Persona[]> {
    try {
      const { data, error } = await supabase
        .from('personas')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching personas:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching personas:', error);
      return [];
    }
  }

  // Get a single persona by ID
  static async getPersonaById(id: string): Promise<Persona | null> {
    try {
      const { data, error } = await supabase
        .from('personas')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching persona:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching persona:', error);
      return null;
    }
  }

  // Update a persona
  static async updatePersona(id: string, updates: Partial<Omit<Persona, 'id' | 'created_at' | 'updated_at'>>): Promise<Persona | null> {
    try {
      const { data, error } = await supabase
        .from('personas')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating persona:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error updating persona:', error);
      return null;
    }
  }

  // Delete a persona
  static async deletePersona(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('personas')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting persona:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting persona:', error);
      return false;
    }
  }

  // Save persona data (create or update)
  static async savePersona(personaData: any, userId?: string): Promise<Persona | null> {
    try {
      console.log('savePersona called with data:', personaData);
      console.log('savePersona called with userId:', userId);
      
      // Use demo user ID if no userId provided
      const finalUserId = userId || PersonaService.DEMO_USER_ID;
      
      // Transform the data to match database schema exactly
      const dbData = {
        user_id: finalUserId,
        persona_name: personaData.personaName || 'Untitled Persona',
        avatar_id: personaData.avatarId || 1,
        age_range: personaData.ageRange || null,
        education_level: personaData.educationLevel || null,
        professional_sector: personaData.professionalSector || null,
        organization_size: personaData.organizationSize || null,
        job_title: personaData.jobTitle || null,
        job_measured_by: personaData.jobMeasuredBy || null,
        reports_to: personaData.reportsTo || null,
        goals: personaData.goals || null,
        biggest_challenges: personaData.biggestChallenges || [],
        responsibilities: personaData.responsibilities || null,
        tools: personaData.tools || [],
        communication_preference: personaData.communicationPreference || null,
        information_gathering: personaData.informationGathering || null,
        social_networks: personaData.socialNetworks || []
      };

      console.log('Transformed data for database:', dbData);

      // Create the persona directly using Supabase
      const { data, error } = await supabase
        .from('personas')
        .insert(dbData)
        .select()
        .single();

      if (error) {
        console.error('Supabase error in savePersona:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        return null;
      }

      console.log('Successfully saved persona:', data);
      return data;
    } catch (error) {
      console.error('Error saving persona:', error);
      return null;
    }
  }

  // Get all demo personas (for demo mode without authentication)
  static async getDemoPersonas(): Promise<Persona[]> {
    return this.getPersonasByUserId(PersonaService.DEMO_USER_ID);
  }
}
