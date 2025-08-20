import { z } from 'zod';

// Age ranges
export const AGE_RANGES = [
  "Moins de 18 ans",
  "18 à 24 ans", 
  "25 à 34 ans",
  "35 à 44 ans",
  "45 à 54 ans",
  "55 à 64 ans",
  "65 ans et plus"
] as const;

// Education levels
export const EDUCATION_LEVELS = [
  "Aucun diplôme ou en cours",
  "Fin de collège ou lycée non terminé",
  "Baccalauréat ou équivalent",
  "Licence Bac plus 3",
  "Master Bac plus 5",
  "Doctorat ou équivalent"
] as const;

// Professional sectors
export const PROFESSIONAL_SECTORS = [
  "Ventes",
  "Finance",
  "Industrie",
  "Investissement",
  "Commerce de détail",
  "Technologie",
  "Publicité",
  "Banque",
  "Pharmaceutique",
  "Marketing",
  "Commerce / Négoce",
  "Transport",
  "Immobilier",
  "Santé",
  "Assurance",
  "Agriculture",
  "Construction",
  "Alimentation & Boissons"
] as const;

// Organization sizes
export const ORGANIZATION_SIZES = [
  "Indépendant / Auto-entrepreneur",
  "Petite équipe (1 à 10 personnes)",
  "Entreprise en croissance (11 à 50 personnes)",
  "Organisation établie (51 à 200 personnes)",
  "Grande entreprise (201 à 1000 personnes)",
  "Multinationale (1000+ personnes)"
] as const;

// Communication preferences
export const COMMUNICATION_PREFERENCES = [
  "Phone",
  "Email",
  "SMS",
  "Social",
  "Face to face"
] as const;

// Social networks
export const SOCIAL_NETWORKS = [
  "Facebook",
  "Instagram",
  "X",
  "LinkedIn",
  "Pinterest"
] as const;

// Predefined challenges
export const PREDEFINED_CHALLENGES = [
  "Gérer la relation client et la communication",
  "Ressources limitées",
  "Moral des équipes",
  "Gestion du changement",
  "Communication interne",
  "Collaboration et créativité",
  "Gestion de projets et désorganisation",
  "Développement professionnel",
  "Résolution de problèmes et décision"
] as const;

// Predefined tools
export const PREDEFINED_TOOLS = [
  "Comptabilité et gestion financière",
  "CRM",
  "CMS",
  "Gestion de projet",
  "Stockage et partage cloud",
  "Email",
  "Planification des équipes",
  "Facturation",
  "Traitement de texte",
  "Outils de reporting",
  "Tableaux de bord décisionnels"
] as const;

// Avatar options (1-12)
export const AVATAR_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

// Persona data structure
export interface PersonaData {
  // Step 1: Avatar
  personaName: string;
  avatarId: number;
  
  // Step 2: Demographics
  ageRange: typeof AGE_RANGES[number];
  educationLevel: typeof EDUCATION_LEVELS[number];
  
  // Step 3: Professional world
  professionalSector: typeof PROFESSIONAL_SECTORS[number];
  organizationSize: typeof ORGANIZATION_SIZES[number];
  
  // Step 4: Career
  jobTitle: string;
  jobMeasuredBy: string;
  reportsTo: string;
  
  // Step 5: Work characteristics
  goals: string;
  biggestChallenges: string[];
  responsibilities: string;
  
  // Step 6: Work style
  tools: string[];
  communicationPreference: typeof COMMUNICATION_PREFERENCES[number];
  
  // Step 7: Consumption habits
  informationGathering: string;
  socialNetworks: typeof SOCIAL_NETWORKS[number][];
}

// Validation schemas for each step
export const step1Schema = z.object({
  personaName: z.string().min(1, "Le nom du persona est requis"),
  avatarId: z.number().min(1).max(12, "Sélectionne un avatar")
});

export const step2Schema = z.object({
  ageRange: z.enum(AGE_RANGES),
  educationLevel: z.enum(EDUCATION_LEVELS)
});

export const step3Schema = z.object({
  professionalSector: z.enum(PROFESSIONAL_SECTORS),
  organizationSize: z.enum(ORGANIZATION_SIZES)
});

export const step4Schema = z.object({
  jobTitle: z.string().min(1, "Le titre du poste est requis"),
  jobMeasuredBy: z.string().min(1, "Comment mesurer le succès est requis"),
  reportsTo: z.string().min(1, "À qui rapporter est requis")
});

export const step5Schema = z.object({
  goals: z.string().min(1, "Les objectifs sont requis"),
  biggestChallenges: z.array(z.string()).min(1, "Au moins un défi est requis"),
  responsibilities: z.string().min(1, "Les responsabilités sont requises")
});

export const step6Schema = z.object({
  tools: z.array(z.string()).min(1, "Au moins un outil est requis"),
  communicationPreference: z.enum(COMMUNICATION_PREFERENCES)
});

export const step7Schema = z.object({
  informationGathering: z.string().min(1, "Comment recueillir l'information est requis"),
  socialNetworks: z.array(z.enum(SOCIAL_NETWORKS)).min(1, "Au moins un réseau social est requis")
});

// Complete persona schema
export const personaSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema);

export type PersonaFormData = z.infer<typeof personaSchema>;
