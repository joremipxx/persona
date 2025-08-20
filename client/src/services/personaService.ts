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
        ...personaData,
        user_id: PersonaService.DEMO_USER_ID
      };
      
      console.log('Creating persona with user_id:', personaWithUserId);
      
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
  static async savePersona(personaData: any, userId: string): Promise<Persona | null> {
    try {
      // Transform the data to match database schema
      const dbData = {
        user_id: userId,
        persona_name: personaData.personaName || '',
        avatar_id: personaData.avatarId || 1,
        age_range: personaData.ageRange || '',
        education_level: personaData.educationLevel || '',
        professional_sector: personaData.professionalSector || '',
        organization_size: personaData.organizationSize || '',
        job_title: personaData.jobTitle || '',
        job_measured_by: personaData.jobMeasuredBy || '',
        reports_to: personaData.reportsTo || '',
        goals: personaData.goals || '',
        biggest_challenges: personaData.biggestChallenges || [],
        responsibilities: personaData.responsibilities || '',
        tools: personaData.tools || [],
        communication_preference: personaData.communicationPreference || '',
        information_gathering: personaData.informationGathering || '',
        social_networks: personaData.socialNetworks || []
      };

      // For now, always create a new persona
      // In the future, you might want to check if one exists and update it
      return await this.createPersona(dbData);
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
