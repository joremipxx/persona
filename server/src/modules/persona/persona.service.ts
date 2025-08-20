import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../../config/supabase.service';
import { CreatePersonaDto } from '../../common/dto/create-persona.dto';
import { UpdatePersonaDto } from '../../common/dto/update-persona.dto';
import { PersonaData, DatabasePersona } from '../../common/interfaces/persona.interface';

@Injectable()
export class PersonaService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createPersonaDto: CreatePersonaDto): Promise<DatabasePersona> {
    try {
      const supabase = this.supabaseService.getClient();
      
      // Transform frontend data to database format
      const dbData = this.transformToDatabase(createPersonaDto);
      
      const { data, error } = await supabase
        .from('personas')
        .insert(dbData)
        .select()
        .single();

      if (error) {
        throw new BadRequestException(`Failed to create persona: ${error.message}`);
      }

      return data;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create persona');
    }
  }

  async findAll(userId?: string): Promise<DatabasePersona[]> {
    try {
      const supabase = this.supabaseService.getClient();
      
      let query = supabase.from('personas').select('*');
      
      if (userId) {
        query = query.eq('user_id', userId);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        throw new BadRequestException(`Failed to fetch personas: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch personas');
    }
  }

  async findOne(id: string): Promise<DatabasePersona> {
    try {
      const supabase = this.supabaseService.getClient();
      
      const { data, error } = await supabase
        .from('personas')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundException(`Persona with ID ${id} not found`);
        }
        throw new BadRequestException(`Failed to fetch persona: ${error.message}`);
      }

      return data;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch persona');
    }
  }

  async update(id: string, updatePersonaDto: UpdatePersonaDto): Promise<DatabasePersona> {
    try {
      const supabase = this.supabaseService.getClient();
      
      // Transform frontend data to database format
      const dbData = this.transformToDatabase(updatePersonaDto);
      
      const { data, error } = await supabase
        .from('personas')
        .update(dbData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundException(`Persona with ID ${id} not found`);
        }
        throw new BadRequestException(`Failed to update persona: ${error.message}`);
      }

      return data;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update persona');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const supabase = this.supabaseService.getClient();
      
      const { error } = await supabase
        .from('personas')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException(`Failed to delete persona: ${error.message}`);
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete persona');
    }
  }

  /**
   * Transform frontend PersonaData format to database format
   */
  private transformToDatabase(personaData: Partial<PersonaData> & { userId?: string }): any {
    return {
      user_id: personaData.userId || null,
      name: personaData.name || null,
      age: personaData.age || null,
      gender: personaData.gender || null,
      location: personaData.location || null,
      profession: personaData.profession || null,
      industry: personaData.industry || null,
      company_size: personaData.companySize || null,
      experience_years: personaData.experienceYears || null,
      income: personaData.income || null,
      career_level: personaData.careerLevel || null,
      career_goals: personaData.careerGoals || null,
      challenges: personaData.challenges || null,
      preferred_tools: personaData.preferredTools || null,
      communication_preferences: personaData.communicationPreferences || null,
      social_networks: personaData.socialNetworks || null,
      content_interests: personaData.contentInterests || null,
      pain_points: personaData.painPoints || null,
      motivations: personaData.motivations || null,
    };
  }

  /**
   * Transform database format to frontend PersonaData format
   */
  transformFromDatabase(dbPersona: DatabasePersona): PersonaData {
    return {
      name: dbPersona.name || '',
      age: dbPersona.age || 0,
      gender: dbPersona.gender || '',
      location: dbPersona.location || '',
      profession: dbPersona.profession || '',
      industry: dbPersona.industry || '',
      companySize: dbPersona.company_size || '',
      experienceYears: dbPersona.experience_years || 0,
      income: dbPersona.income || '',
      careerLevel: dbPersona.career_level || '',
      careerGoals: dbPersona.career_goals || [],
      challenges: dbPersona.challenges || [],
      preferredTools: dbPersona.preferred_tools || [],
      communicationPreferences: dbPersona.communication_preferences || [],
      socialNetworks: dbPersona.social_networks || [],
      contentInterests: dbPersona.content_interests || [],
      painPoints: dbPersona.pain_points || '',
      motivations: dbPersona.motivations || '',
    };
  }
}
