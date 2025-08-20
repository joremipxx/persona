import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/create-persona');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto animate-fade-in-simple">
          {/* Transparent Box Container */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-2xl transition-all duration-500 ease-out">
            {/* Logo */}
            <div className="mb-8 transition-all duration-500 ease-out">
              <img 
                src="/logo.png" 
                alt="Paradox Group Logo" 
                className="h-16 mx-auto"
              />
            </div>

            {/* Title */}
            <h1 className="text-7xl font-anton font-normal text-white mb-6 leading-tight uppercase tracking-wider transition-all duration-500 ease-out">
              Crée ton Persona
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-lg mx-auto text-shadow transition-all duration-500 ease-out">
              Un parcours guidé en 7 étapes pour clarifier <br />
              qui tu sers et comment l'inspirer.
            </p>

            {/* Main CTA Button */}
            <div className="mb-8 transition-all duration-500 ease-out">
              <Button
                size="lg"
                onClick={handleStartJourney}
                className="text-lg px-12 py-4 bg-white text-secondary-900 hover:bg-white/90 font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                Construis ton Persona
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-8 transition-all duration-500 ease-out">
        <p className="text-white/70 text-sm">
          © 2025 Paradox Group. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};
