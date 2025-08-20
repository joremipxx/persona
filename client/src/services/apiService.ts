import { PersonaData } from '../types/persona';

const API_BASE_URL = 'http://localhost:3001/api';

export interface ApiPersona {
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

export interface CreatePersonaRequest {
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
  userId?: string;
}

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return null as T;
    }

    return response.json();
  }

  async createPersona(personaData: PersonaData, userId?: string): Promise<ApiPersona> {
    const requestData: CreatePersonaRequest = {
      name: personaData.name,
      age: personaData.age,
      gender: personaData.gender,
      location: personaData.location,
      profession: personaData.profession,
      industry: personaData.industry,
      companySize: personaData.companySize,
      experienceYears: personaData.experienceYears,
      income: personaData.income,
      careerLevel: personaData.careerLevel,
      careerGoals: personaData.careerGoals,
      challenges: personaData.challenges,
      preferredTools: personaData.preferredTools,
      communicationPreferences: personaData.communicationPreferences,
      socialNetworks: personaData.socialNetworks,
      contentInterests: personaData.contentInterests,
      painPoints: personaData.painPoints,
      motivations: personaData.motivations,
      userId,
    };

    return this.makeRequest<ApiPersona>('/personas', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  }

  async getPersonas(userId?: string): Promise<ApiPersona[]> {
    const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
    return this.makeRequest<ApiPersona[]>(`/personas${query}`);
  }

  async getPersona(id: string): Promise<ApiPersona> {
    return this.makeRequest<ApiPersona>(`/personas/${id}`);
  }

  async getPersonaInFrontendFormat(id: string): Promise<PersonaData> {
    return this.makeRequest<PersonaData>(`/personas/${id}/frontend-format`);
  }

  async updatePersona(id: string, personaData: Partial<PersonaData>): Promise<ApiPersona> {
    const requestData: Partial<CreatePersonaRequest> = {};
    
    if (personaData.name !== undefined) requestData.name = personaData.name;
    if (personaData.age !== undefined) requestData.age = personaData.age;
    if (personaData.gender !== undefined) requestData.gender = personaData.gender;
    if (personaData.location !== undefined) requestData.location = personaData.location;
    if (personaData.profession !== undefined) requestData.profession = personaData.profession;
    if (personaData.industry !== undefined) requestData.industry = personaData.industry;
    if (personaData.companySize !== undefined) requestData.companySize = personaData.companySize;
    if (personaData.experienceYears !== undefined) requestData.experienceYears = personaData.experienceYears;
    if (personaData.income !== undefined) requestData.income = personaData.income;
    if (personaData.careerLevel !== undefined) requestData.careerLevel = personaData.careerLevel;
    if (personaData.careerGoals !== undefined) requestData.careerGoals = personaData.careerGoals;
    if (personaData.challenges !== undefined) requestData.challenges = personaData.challenges;
    if (personaData.preferredTools !== undefined) requestData.preferredTools = personaData.preferredTools;
    if (personaData.communicationPreferences !== undefined) requestData.communicationPreferences = personaData.communicationPreferences;
    if (personaData.socialNetworks !== undefined) requestData.socialNetworks = personaData.socialNetworks;
    if (personaData.contentInterests !== undefined) requestData.contentInterests = personaData.contentInterests;
    if (personaData.painPoints !== undefined) requestData.painPoints = personaData.painPoints;
    if (personaData.motivations !== undefined) requestData.motivations = personaData.motivations;

    return this.makeRequest<ApiPersona>(`/personas/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(requestData),
    });
  }

  async deletePersona(id: string): Promise<void> {
    return this.makeRequest<void>(`/personas/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
