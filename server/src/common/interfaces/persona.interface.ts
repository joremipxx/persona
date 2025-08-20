export interface PersonaData {
  name: string;
  age: number;
  gender: string;
  location: string;
  profession: string;
  industry: string;
  companySize: string;
  experienceYears: number;
  income: string;
  careerLevel: string;
  careerGoals: string[];
  challenges: string[];
  preferredTools: string[];
  communicationPreferences: string[];
  socialNetworks: string[];
  contentInterests: string[];
  painPoints: string;
  motivations: string;
}

export interface DatabasePersona {
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
}
