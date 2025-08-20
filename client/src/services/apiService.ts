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
      name: personaData.personaName,
      age: 25, // Default age - could parse from ageRange string
      gender: '', // Not collected in current form
      location: '', // Not collected in current form
      profession: personaData.jobTitle,
      industry: personaData.professionalSector,
      companySize: personaData.organizationSize,
      experienceYears: 0, // Default value
      income: '', // Not collected in current form
      careerLevel: '', // Not collected in current form
      careerGoals: [personaData.goals], // Convert string to array
      challenges: personaData.biggestChallenges,
      preferredTools: personaData.tools,
      communicationPreferences: [personaData.communicationPreference], // Convert string to array
      socialNetworks: personaData.socialNetworks,
      contentInterests: [personaData.informationGathering], // Convert string to array
      painPoints: personaData.responsibilities, // Mapping responsibilities to pain points
      motivations: personaData.goals, // Using goals as motivations
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
    
    if (personaData.personaName !== undefined) requestData.name = personaData.personaName;
    if (personaData.ageRange !== undefined) requestData.age = 25; // Default age mapping
    if (personaData.jobTitle !== undefined) requestData.profession = personaData.jobTitle;
    if (personaData.professionalSector !== undefined) requestData.industry = personaData.professionalSector;
    if (personaData.organizationSize !== undefined) requestData.companySize = personaData.organizationSize;
    if (personaData.goals !== undefined) requestData.careerGoals = [personaData.goals];
    if (personaData.biggestChallenges !== undefined) requestData.challenges = personaData.biggestChallenges;
    if (personaData.tools !== undefined) requestData.preferredTools = personaData.tools;
    if (personaData.communicationPreference !== undefined) requestData.communicationPreferences = [personaData.communicationPreference];
    if (personaData.socialNetworks !== undefined) requestData.socialNetworks = personaData.socialNetworks;
    if (personaData.informationGathering !== undefined) requestData.contentInterests = [personaData.informationGathering];
    if (personaData.responsibilities !== undefined) requestData.painPoints = personaData.responsibilities;
    if (personaData.goals !== undefined) requestData.motivations = personaData.goals;

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
