import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface Database {
  public: {
    Tables: {
      personas: {
        Row: {
          id: string;
          user_id: string | null;
          name: string | null;
          age: number | null;
          gender: string | null;
          location: string | null;
          profession: string | null;
          industry: string | null;
          company_size: string | null;
          experience_years: number | null;
          income: string | null;
          career_level: string | null;
          career_goals: string[] | null;
          challenges: string[] | null;
          preferred_tools: string[] | null;
          communication_preferences: string[] | null;
          social_networks: string[] | null;
          content_interests: string[] | null;
          pain_points: string | null;
          motivations: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name?: string | null;
          age?: number | null;
          gender?: string | null;
          location?: string | null;
          profession?: string | null;
          industry?: string | null;
          company_size?: string | null;
          experience_years?: number | null;
          income?: string | null;
          career_level?: string | null;
          career_goals?: string[] | null;
          challenges?: string[] | null;
          preferred_tools?: string[] | null;
          communication_preferences?: string[] | null;
          social_networks?: string[] | null;
          content_interests?: string[] | null;
          pain_points?: string | null;
          motivations?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string | null;
          age?: number | null;
          gender?: string | null;
          location?: string | null;
          profession?: string | null;
          industry?: string | null;
          company_size?: string | null;
          experience_years?: number | null;
          income?: string | null;
          career_level?: string | null;
          career_goals?: string[] | null;
          challenges?: string[] | null;
          preferred_tools?: string[] | null;
          communication_preferences?: string[] | null;
          social_networks?: string[] | null;
          content_interests?: string[] | null;
          pain_points?: string | null;
          motivations?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient<Database>;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration. Please check your environment variables.');
    }

    this.supabase = createClient<Database>(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient<Database> {
    return this.supabase;
  }
}
