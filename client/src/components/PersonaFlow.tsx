import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { Input } from '@/components/ui/Input';
import { AvatarPicker } from '@/components/AvatarPicker';
import { usePersonaStore } from '@/store/personaStore';

export const PersonaFlow: React.FC = () => {
  const navigate = useNavigate();
  const { updatePersonaData } = usePersonaStore();
  const [personaName, setPersonaName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const handleGoBack = () => {
    navigate('/');
  };

  const handleNext = () => {
    updatePersonaData({
      personaName,
      avatarId: selectedAvatar
    });
    navigate('/step-2-demographics');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <ProgressBar currentStep={1} totalSteps={7} />
      
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
                Crée son identité
              </h1>

              {/* Why this step is essential */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-4 text-shadow">
                  Pourquoi cette étape est essentielle:
                </h2>
                <p className="text-lg text-white/90 leading-7 text-shadow">
                  Donne un nom et un visage à ton persona. Tu ne remplis pas un formulaire, tu crées une présence. En l'appelant par son nom et en choisissant son avatar, tu rends cette personne réelle, mémorable, et tu clarifies pour qui tu bâtis chaque message et chaque offre.
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
                      Donne un nom et un visage
                    </h2>
                  </div>
                  <p className="text-2xl font-clash text-white/90 mb-4">
                    à ton persona pour le rendre mémorable.
                  </p>
                </div>
                
                {/* Persona Name Input */}
                <div className="space-y-6">
                  <Input
                    label="Nom du persona"
                    placeholder="Entre le nom de ton persona"
                    value={personaName}
                    onChange={(e) => setPersonaName(e.target.value)}
                    className="text-white"
                  />
                </div>

                {/* Avatar Picker */}
                <div className="space-y-6">
                  <AvatarPicker
                    selectedAvatar={selectedAvatar}
                    onAvatarSelect={setSelectedAvatar}
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
                      className="text-xl px-16 py-6 bg-white text-secondary-900 hover:bg-white/90 font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      disabled={!personaName || selectedAvatar === 0}
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
