import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { usePersonaStore } from '@/store/personaStore';
import { Input } from '@/components/ui/Input';
import { SocialMediaIcon } from '@/components/ui/SocialMediaIcons';
import { cn } from '@/utils/cn';

// Social networks with custom icons
const SOCIAL_NETWORKS = [
  { id: 'Facebook' as const, name: 'Facebook', network: 'facebook' as const },
  { id: 'Instagram' as const, name: 'Instagram', network: 'instagram' as const },
  { id: 'X' as const, name: 'X (Twitter)', network: 'twitter' as const },
  { id: 'LinkedIn' as const, name: 'LinkedIn', network: 'linkedin' as const },
  { id: 'Pinterest' as const, name: 'Pinterest', network: 'pinterest' as const }
] as const;

interface SocialNetworksSelectorProps {
  selectedNetworks: string[];
  onNetworksChange: (networks: string[]) => void;
}

const SocialNetworksSelector: React.FC<SocialNetworksSelectorProps> = ({
  selectedNetworks,
  onNetworksChange
}) => {
  const handleNetworkToggle = (networkId: string) => {
    if (selectedNetworks.includes(networkId)) {
      onNetworksChange(selectedNetworks.filter(n => n !== networkId));
    } else {
      onNetworksChange([...selectedNetworks, networkId]);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-clash text-white font-semibold">
        Sur quels réseaux sociaux est-il présent ?
      </h3>
      
      <div className="grid grid-cols-5 gap-4">
        {SOCIAL_NETWORKS.map((network) => {
          const isSelected = selectedNetworks.includes(network.id);
          
          return (
            <button
              key={network.id}
              type="button"
              onClick={() => handleNetworkToggle(network.id)}
              className={cn(
                "flex flex-col items-center space-y-3 p-4 rounded-xl border-2 transition-all duration-200",
                "hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20",
                isSelected
                  ? "bg-[#8D2146] border-[#8D2146]"
                  : "bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30"
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-200",
                isSelected
                  ? "bg-white shadow-lg"
                  : "bg-white/20"
              )}>
                <SocialMediaIcon 
                  network={network.network} 
                  className="w-10 h-10 text-white"
                />
              </div>
              <span className={cn(
                "text-sm font-medium text-center leading-tight",
                isSelected ? "text-white" : "text-white/80"
              )}>
                {network.name}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Selected Networks Display */}
      {selectedNetworks.length > 0 && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="text-center">
            <span className="text-lg font-semibold text-white">
              {selectedNetworks.length} réseau{selectedNetworks.length > 1 ? 'x' : ''} sélectionné{selectedNetworks.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const Step7ConsumptionHabits: React.FC = () => {
  const navigate = useNavigate();
  const { personaData, updatePersonaData } = usePersonaStore();
  const [informationGathering, setInformationGathering] = useState(personaData.informationGathering || '');
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>(personaData.socialNetworks || []);

  const handleGoBack = () => {
    navigate('/step-6-work-style');
  };

  const handleNext = () => {
    updatePersonaData({
      informationGathering,
      socialNetworks: selectedNetworks as any
    });
    navigate('/persona-overview');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <ProgressBar currentStep={7} totalSteps={7} />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-full flex">
          {/* Left Sidebar */}
          <div className="w-1/4 h-full bg-white/10 backdrop-blur-sm rounded-3xl mx-8 my-8 border border-white/20 shadow-2xl">
            <div className="bg-transparent h-full flex flex-col justify-center p-8">
              {/* Logo */}
              <div className="mb-8">
                <img 
                  src="/logo.png" 
                  alt="Paradox Group Logo" 
                  className="h-16 mx-auto"
                />
              </div>

              {/* Title */}
              <h1 className="text-3xl font-anton font-normal text-white mb-6 leading-tight uppercase tracking-wider">
                Ses habitudes de consommation
              </h1>

              {/* Why this step is essential */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-4 text-shadow">
                  Pourquoi cette étape est essentielle ?
                </h2>
                <p className="text-lg text-white/90 leading-7 text-shadow">
                  Si tu veux vraiment toucher ton persona, tu dois comprendre comment il s'informe, où il se nourrit d'idées, et quels espaces façonnent sa vision du monde.
                </p>
                <p className="text-lg text-white/90 leading-7 text-shadow mt-4">
                  Connaître ses habitudes de consommation de contenu, c'est savoir où le rencontrer et comment parler son langage.
                </p>
                <p className="text-lg text-white/90 leading-7 text-shadow mt-4">
                  Ces détails ne sont pas seulement marketing : ils révèlent son écosystème d'apprentissage et d'inspiration.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-3/4 h-full bg-white/10 backdrop-blur-sm rounded-3xl mx-8 my-8 border border-white/20 shadow-2xl">
            <div className="h-full flex flex-col justify-center p-16">
              <div className="space-y-8">
                <div>
                  <div className="bg-[#8D2146] px-6 py-4 mb-2 inline-block">
                    <h2 className="text-6xl font-anton font-normal text-white uppercase tracking-wider">
                      Ses habitudes de consommation
                    </h2>
                  </div>
                </div>
                
                {/* Information Gathering Input */}
                <div className="space-y-4">
                  <Input
                    label="Comment s'informe-t-il pour son travail ?"
                    placeholder="ex : suit-il des cours en ligne, lit-il des livres spécialisés, écoute-t-il des podcasts, participe-t-il à des conférences ?"
                    value={informationGathering}
                    onChange={(e) => setInformationGathering(e.target.value)}
                    className="text-white"
                    helperText="Ses sources d'information et d'apprentissage professionnel"
                  />
                </div>

                {/* Social Networks Selector */}
                <SocialNetworksSelector
                  selectedNetworks={selectedNetworks}
                  onNetworksChange={setSelectedNetworks}
                />

                {/* Navigation Buttons */}
                <div className="pt-8 flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleGoBack}
                    className="text-xl px-16 py-6 border-white/30 text-white hover:bg-white/10 font-semibold transition-all duration-300"
                  >
                    <ArrowLeft className="mr-3 w-6 h-6" />
                    Retour
                  </Button>
                  
                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="text-xl px-16 py-6 bg-white text-secondary-900 hover:bg-white/90 font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                    disabled={!informationGathering || selectedNetworks.length === 0}
                  >
                    Terminer
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
