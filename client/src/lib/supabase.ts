import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Persona {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  persona_name: string;
  avatar_id: number;
  age_range: string;
  education_level: string;
  professional_sector: string;
  organization_size: string;
  job_title: string;
  job_measured_by: string;
  reports_to: string;
  goals: string;
  biggest_challenges: string[];
  responsibilities: string;
  tools: string[];
  communication_preference: string;
  information_gathering: string;
  social_networks: string[];
}

export interface Database {
  public: {
    Tables: {
      personas: {
        Row: Persona;
        Insert: Omit<Persona, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Persona, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}
