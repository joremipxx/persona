import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { usePersonaStore } from '@/store/personaStore';
import { AGE_RANGES, EDUCATION_LEVELS } from '@/types/persona';
import { Slider } from '@/components/ui/Slider';

export const Step2Demographics: React.FC = () => {
  const navigate = useNavigate();
  const { personaData, updatePersonaData } = usePersonaStore();
  const [selectedAge, setSelectedAge] = useState(personaData.ageRange || AGE_RANGES[2]); // Default to 25-34
  const [selectedEducation, setSelectedEducation] = useState(personaData.educationLevel || EDUCATION_LEVELS[2]); // Default to Baccalauréat

  const handleGoBack = () => {
    navigate('/create-persona');
  };

  const handleNext = () => {
    updatePersonaData({
      ageRange: selectedAge,
      educationLevel: selectedEducation
    });
    navigate('/step-3-professional');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <ProgressBar currentStep={2} totalSteps={7} />
      
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
                Ses traits démographiques
              </h1>

              {/* Why this step is essential */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-4 text-shadow">
                  Pourquoi cette étape est essentielle ?
                </h2>
                <p className="text-lg text-white/90 leading-7 text-shadow">
                  En découvrant les traits démographiques de ton persona, tu lui donnes des contours plus nets et plus humains. L'âge, le niveau d'éducation et d'autres repères concrets te permettent de peindre un portrait plus profond et plus incarné.
                </p>
                <p className="text-lg text-white/90 leading-7 text-shadow mt-4">
                  Ces éléments ne sont pas de simples chiffres : ils sont les clés qui t'aident à ajuster ton message pour qu'il touche le cœur et l'esprit de la personne que tu veux inspirer.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-3/4 h-full bg-white/10 backdrop-blur-sm rounded-3xl mx-8 my-8 border border-white/20 shadow-2xl">
            <div className="h-full flex flex-col justify-center p-16">
              <div className="space-y-12">
                <div>
                  <div className="bg-[#8D2146] px-6 py-4 mb-2 inline-block">
                    <h2 className="text-6xl font-anton font-normal text-white uppercase tracking-wider">
                      Ses traits démographiques
                    </h2>
                  </div>
                </div>
                
                {/* Age Slider */}
                <Slider
                  options={AGE_RANGES}
                  value={selectedAge}
                  onChange={setSelectedAge}
                  label="Quel âge a-t-il ?"
                />

                {/* Education Slider */}
                <Slider
                  options={EDUCATION_LEVELS}
                  value={selectedEducation}
                  onChange={setSelectedEducation}
                  label="Quel est le plus haut niveau d'étude ou de formation qu'il a atteint ?"
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
