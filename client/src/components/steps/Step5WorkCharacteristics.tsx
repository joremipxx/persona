import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowLeft, Plus, X, XCircle } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { usePersonaStore } from '@/store/personaStore';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';

// Predefined challenges
const PREDEFINED_CHALLENGES = [
  'Gérer les relations et la communication avec les clients',
  'Ressources limitées',
  'Moral et motivation des équipes',
  'Gestion du changement',
  'Communication interne',
  'Collaboration & créativité',
  'Gestion de projets & désorganisation',
  'Développement professionnel',
  'Résolution de problèmes & prise de décision'
];

interface ChallengeSelectorProps {
  selectedChallenges: string[];
  onChallengesChange: (challenges: string[]) => void;
}

const ChallengeSelector: React.FC<ChallengeSelectorProps> = ({
  selectedChallenges,
  onChallengesChange
}) => {
  const [customChallenge, setCustomChallenge] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleChallengeToggle = (challenge: string) => {
    if (selectedChallenges.includes(challenge)) {
      onChallengesChange(selectedChallenges.filter(c => c !== challenge));
    } else {
      onChallengesChange([...selectedChallenges, challenge]);
    }
  };

  const handleAddCustomChallenge = () => {
    if (customChallenge.trim() && !selectedChallenges.includes(customChallenge.trim())) {
      // Check if there's already a custom challenge (non-predefined)
      const hasCustomChallenge = selectedChallenges.some(challenge => 
        !PREDEFINED_CHALLENGES.includes(challenge)
      );
      
      if (!hasCustomChallenge) {
        onChallengesChange([...selectedChallenges, customChallenge.trim()]);
        setCustomChallenge('');
        setShowCustomInput(false);
      }
    }
  };

  const handleRemoveChallenge = (challenge: string) => {
    onChallengesChange(selectedChallenges.filter(c => c !== challenge));
  };

      return (
      <div className="space-y-4">
      <h3 className="text-2xl font-clash text-white font-semibold">
        Quels sont ses plus grands défis ?
      </h3>
      
      {/* Predefined Challenges Grid */}
      <div className="grid grid-cols-2 gap-4">
        {PREDEFINED_CHALLENGES.map((challenge) => (
          <button
            key={challenge}
            type="button"
            onClick={() => handleChallengeToggle(challenge)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-200 text-left min-h-[70px]",
              "hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20",
              selectedChallenges.includes(challenge)
                ? "bg-[#8D2146] border-[#8D2146] text-white"
                : "bg-white/10 border-white/20 text-white/80 hover:bg-white/15 hover:border-white/30"
            )}
          >
            <span className="text-sm font-medium leading-tight block">{challenge}</span>
          </button>
        ))}
      </div>

      {/* Custom Challenge Input */}
      {showCustomInput ? (
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Décris ton défi personnalisé..."
            value={customChallenge}
            onChange={(e) => setCustomChallenge(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddCustomChallenge();
              }
            }}
          />
          <div className="flex items-center gap-3">
            <Button
              onClick={handleAddCustomChallenge}
              disabled={!customChallenge.trim()}
              className="h-14 px-6 bg-white text-secondary-900 hover:bg-white/90 font-semibold shadow-lg rounded-xl"
            >
              Ajouter
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowCustomInput(false);
                setCustomChallenge('');
              }}
              className="h-14 w-14 border-white/30 text-white hover:bg-white/10 rounded-xl flex items-center justify-center text-lg font-bold"
            >
              ✕
            </Button>
          </div>
        </div>
      ) : (
        !selectedChallenges.some(challenge => !PREDEFINED_CHALLENGES.includes(challenge)) && (
          <Button
            variant="outline"
            onClick={() => setShowCustomInput(true)}
            className="w-full h-14 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30 hover:text-white font-medium transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un défi personnalisé
          </Button>
        )
      )}

      {/* Selected Challenges Display */}
      {selectedChallenges.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white">Défis sélectionnés :</h4>
          <div className="space-y-2">
            {selectedChallenges.map((challenge) => (
              <div
                key={challenge}
                className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20"
              >
                <span className="text-white text-base font-medium leading-relaxed">{challenge}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveChallenge(challenge)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Step5WorkCharacteristics: React.FC = () => {
  const navigate = useNavigate();
  const { personaData, updatePersonaData } = usePersonaStore();
  const [goals, setGoals] = useState(personaData.goals || '');
  const [biggestChallenges, setBiggestChallenges] = useState<string[]>(personaData.biggestChallenges || []);
  const [responsibilities, setResponsibilities] = useState(personaData.responsibilities || '');

  const handleGoBack = () => {
    navigate('/step-4-career');
  };

  const handleNext = () => {
    updatePersonaData({
      goals,
      biggestChallenges,
      responsibilities
    });
    navigate('/step-6-work-style');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <ProgressBar currentStep={5} totalSteps={7} />
      
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
                Les caractéristiques de son travail
              </h1>

              {/* Why this step is essential */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-4 text-shadow">
                  Pourquoi cette étape est essentielle ?
                </h2>
                <p className="text-lg text-white/90 leading-7 text-shadow">
                  Comprendre les objectifs, les défis et les responsabilités quotidiennes de ton persona, c'est accéder à son champ de bataille intérieur.
                </p>
                <p className="text-lg text-white/90 leading-7 text-shadow mt-4">
                  Tu découvres ce qui l'anime, ce qui l'alourdit et ce qui l'empêche parfois d'avancer.
                </p>
                <p className="text-lg text-white/90 leading-7 text-shadow mt-4">
                  En identifiant ses obstacles, tu développes une empathie véritable, et l'empathie est une force puissante pour l'inspirer, l'accompagner et l'aider à transformer ses difficultés en opportunités.
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
                      Les caractéristiques de son travail
                    </h2>
                  </div>
                </div>
                
                {/* Goals Input */}
                <div className="space-y-4">
                  <Input
                    label="Quels sont ses objectifs ou ses buts ?"
                    placeholder="ex : nombre de prospects générés, revenus, croissance, etc."
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    className="text-white"
                    helperText="Ses objectifs professionnels et métriques de succès"
                  />
                </div>

                {/* Challenges Selector */}
                <ChallengeSelector
                  selectedChallenges={biggestChallenges}
                  onChallengesChange={setBiggestChallenges}
                />

                {/* Responsibilities Input */}
                <div className="space-y-4">
                  <Input
                    label="Quelles sont ses responsabilités principales ?"
                    placeholder="ex : management d'équipe, création de contenu, gestion de projet, etc."
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    className="text-white"
                    helperText="Ses responsabilités quotidiennes et principales"
                  />
                </div>

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
                    disabled={!goals || biggestChallenges.length === 0 || !responsibilities}
                  >
                    Suivant
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
