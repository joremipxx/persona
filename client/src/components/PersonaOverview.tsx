import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { usePersonaStore } from '@/store/personaStore';
import { cn } from '@/utils/cn';
import { SocialMediaIcon } from '@/components/ui/SocialMediaIcons';
import { supabase } from '@/lib/supabase';
import { 
  Save, 
  Download, 
  Calendar,
  GraduationCap,
  Building,
  Users,
  ArrowLeft
} from 'lucide-react';

// Social network data
const SOCIAL_NETWORKS = [
  { id: 'Facebook' as const, name: 'Facebook', network: 'facebook' as const, color: '#1877F2' },
  { id: 'Instagram' as const, name: 'Instagram', network: 'instagram' as const, color: '#E4405F' },
  { id: 'X' as const, name: 'X (Twitter)', network: 'twitter' as const, color: '#000000' },
  { id: 'LinkedIn' as const, name: 'LinkedIn', network: 'linkedin' as const, color: '#0A66C2' },
  { id: 'Pinterest' as const, name: 'Pinterest', network: 'pinterest' as const, color: '#BD081C' }
] as const;

interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon, className }) => {
  return (
    <div className={cn(
      "bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 shadow-lg transition-all duration-200 hover:bg-white/15",
      className
    )}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <div className="text-white/90">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
            {title}
          </h3>
          <p className="text-white font-medium text-base leading-relaxed">
            {value || 'Non défini'}
          </p>
        </div>
      </div>
    </div>
  );
};

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children, className }) => {
  return (
    <div className={cn(
      "bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-lg",
      className
    )}>
      <h2 className="text-2xl font-clash text-white font-semibold mb-6 leading-tight">
        {title}
      </h2>
      {children}
    </div>
  );
};

interface DisplayFieldProps {
  label: string;
  value: string;
  className?: string;
}

const DisplayField: React.FC<DisplayFieldProps> = ({ label, value, className }) => {
  return (
    <div className={cn("space-y-3", className)}>
      <label className="text-sm font-semibold text-white/60 uppercase tracking-wider">
        {label}
      </label>
      <div className="text-white font-medium p-5 bg-white/10 border border-white/20 rounded-xl min-h-[3.5rem] flex items-center leading-relaxed text-base">
        {value || 'Non défini'}
      </div>
    </div>
  );
};

interface DisplayTextareaProps {
  label: string;
  value: string;
  className?: string;
}

const DisplayTextarea: React.FC<DisplayTextareaProps> = ({ label, value, className }) => {
  return (
    <div className={cn("space-y-3", className)}>
      <label className="text-sm font-semibold text-white/60 uppercase tracking-wider">
        {label}
      </label>
      <div className="text-white font-medium p-5 bg-white/10 border border-white/20 rounded-xl min-h-[9rem] whitespace-pre-wrap leading-relaxed text-base">
        {value || 'Non défini'}
      </div>
    </div>
  );
};

export const PersonaOverview: React.FC = () => {
  const navigate = useNavigate();
  const { personaData, exportPersona, savePersonaToDatabase } = usePersonaStore();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleGoBack = () => {
    navigate('/step-7-consumption-habits');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      // Get current user from Supabase auth or use mock user
      const { data: { user } } = await supabase.auth.getUser();
      let userId = user?.id;
      
      if (!userId) {
        // If no authenticated user, create a guest session or use service role
        console.warn('No authenticated user found, using mock user ID');
        userId = '00000000-0000-0000-0000-000000000000';
      }
      
      const success = await savePersonaToDatabase(userId);
      
      if (success) {
        setSaveMessage('Sauvegardé dans la base de données');
      } else {
        setSaveMessage('Échec de la sauvegarde - Vérifiez la console pour plus de détails');
      }
      
      setTimeout(() => setSaveMessage(''), 5000);
    } catch (error) {
      console.error('Save error:', error);
      setSaveMessage('Erreur lors de la sauvegarde - Vérifiez la console');
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    const data = exportPersona();
    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'persona.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <img 
                src="/logo.png" 
                alt="Paradox Group Logo" 
                className="h-14"
              />
              <div>
                <h1 className="text-4xl font-anton text-white uppercase tracking-wider mb-2">
                  Vue d'ensemble
                </h1>
                <p className="text-white/70 font-clash text-lg">
                  Ton persona en un coup d'œil
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="px-8 py-4 border-white/30 text-white hover:bg-white/10 transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-3" />
                Retour
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-4 bg-white text-secondary-900 hover:bg-white/90 font-semibold transition-all duration-200"
              >
                <Save className="w-5 h-5 mr-3" />
                Sauvegarder
              </Button>
              
              <Button
                onClick={handleExport}
                variant="outline"
                className="px-8 py-4 border-white/30 text-white hover:bg-white/10 transition-all duration-200"
              >
                <Download className="w-5 h-5 mr-3" />
                Exporter
              </Button>
            </div>
          </div>
          
          {saveMessage && (
            <div className="mt-6">
              <p className="text-sm text-white/80 font-medium">{saveMessage}</p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Identity */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Persona Identity Card */}
            <SectionCard title="Identité du Persona">
              <div className="space-y-8">
                {/* Avatar and Name */}
                <div className="flex items-start space-x-6">
                  <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">👤</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <DisplayField
                      label="Nom du persona"
                      value={personaData.personaName || ''}
                    />
                  </div>
                </div>

                {/* Job Title */}
                <DisplayField
                  label="Poste actuel"
                  value={personaData.jobTitle || ''}
                />
              </div>
            </SectionCard>

            {/* Demographics Info */}
            <SectionCard title="Démographie">
              <div className="space-y-6">
                <InfoCard
                  title="Âge"
                  value={personaData.ageRange || ''}
                  icon={<Calendar className="w-6 h-6" />}
                />
                <InfoCard
                  title="Éducation"
                  value={personaData.educationLevel || ''}
                  icon={<GraduationCap className="w-6 h-6" />}
                />
              </div>
            </SectionCard>

            {/* Professional Context */}
            <SectionCard title="Contexte Professionnel">
              <div className="space-y-6">
                <InfoCard
                  title="Secteur"
                  value={personaData.professionalSector || ''}
                  icon={<Building className="w-6 h-6" />}
                />
                <InfoCard
                  title="Taille d'organisation"
                  value={personaData.organizationSize || ''}
                  icon={<Users className="w-6 h-6" />}
                />
              </div>
            </SectionCard>

            {/* Social Networks */}
            <SectionCard title="Réseaux Sociaux">
              {personaData.socialNetworks && personaData.socialNetworks.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {SOCIAL_NETWORKS.filter(network => 
                    personaData.socialNetworks?.includes(network.id)
                  ).map((network) => (
                    <div
                      key={network.id}
                      className="p-4 rounded-xl border-2 bg-white/20 border-white/40 flex flex-col items-center space-y-2 transition-all duration-200 hover:bg-white/25"
                    >
                      <SocialMediaIcon network={network.network} className="w-6 h-6 text-white" />
                      <span className="text-xs text-white font-semibold text-center leading-tight">
                        {network.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/60 text-sm font-medium">Aucun réseau social sélectionné</p>
                </div>
              )}
            </SectionCard>
          </div>

          {/* Right Column - Work Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Role and Responsibilities */}
            <SectionCard title="Rôle et Responsabilités">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DisplayTextarea
                  label="Responsabilités principales"
                  value={personaData.responsibilities || ''}
                />
                
                <DisplayTextarea
                  label="Comment son rôle est mesuré"
                  value={personaData.jobMeasuredBy || ''}
                />
                
                <div className="md:col-span-2">
                  <DisplayField
                    label="À qui il rend des comptes"
                    value={personaData.reportsTo || ''}
                  />
                </div>
              </div>
            </SectionCard>

            {/* Goals and Challenges */}
            <SectionCard title="Objectifs et Défis">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DisplayTextarea
                  label="Objectifs clés"
                  value={personaData.goals || ''}
                />
                
                <DisplayTextarea
                  label="Ses plus grands défis"
                  value={personaData.biggestChallenges?.join(', ') || ''}
                />
              </div>
            </SectionCard>

            {/* Tools and Communication */}
            <SectionCard title="Outils et Communication">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DisplayTextarea
                  label="Outils de travail"
                  value={personaData.tools?.join(', ') || ''}
                />
                
                <DisplayField
                  label="Méthode de communication préférée"
                  value={personaData.communicationPreference || ''}
                />
                
                <div className="md:col-span-2">
                  <DisplayTextarea
                    label="Comment il s'informe"
                    value={personaData.informationGathering || ''}
                  />
                </div>
              </div>
            </SectionCard>

          </div>
        </div>
      </main>
    </div>
  );
};
