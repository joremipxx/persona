import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { usePersonaStore } from '@/store/personaStore';
import { cn } from '@/utils/cn';
import { PROFESSIONAL_SECTORS, ORGANIZATION_SIZES } from '@/types/persona';

interface DropdownProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  label,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="space-y-6">
      <h3 id={`${label.toLowerCase().replace(/\s+/g, '-')}-label`} className="text-2xl font-clash text-white font-semibold">
        {label}
      </h3>
      
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={`${label.toLowerCase().replace(/\s+/g, '-')}-label`}
          className={cn(
            "w-full h-16 rounded-xl border-2 bg-white/10 backdrop-blur-sm px-6 py-4 text-lg text-left",
            "placeholder:text-white/50 text-white",
            "focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/30",
            "transition-all duration-200 flex items-center justify-between",
            value ? "border-white/30" : "border-white/20"
          )}
        >
          <span className={value ? "text-white" : "text-white/50"}>
            {value || placeholder}
          </span>
          <ChevronDown 
            className={cn(
              "w-6 h-6 text-white/60 transition-transform duration-200",
              isOpen && "rotate-180"
            )} 
          />
        </button>
        
        {isOpen && (
          <div 
            role="listbox"
            className="absolute top-full left-0 right-0 mt-2 bg-[#222222] rounded-xl border border-white/20 shadow-2xl z-10 max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={value === option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onChange(option);
                    setIsOpen(false);
                  }
                }}
                className={cn(
                  "w-full px-6 py-4 text-left text-white hover:bg-white/10 transition-colors duration-200",
                  "first:rounded-t-xl last:rounded-b-xl",
                  value === option && "bg-white/20"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Selected Value Display */}
      {value && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="text-center">
            <span className="text-lg font-semibold text-white">
              {value}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const Step3Professional: React.FC = () => {
  const navigate = useNavigate();
  const { personaData, updatePersonaData } = usePersonaStore();
  const [selectedSector, setSelectedSector] = useState(personaData.professionalSector || PROFESSIONAL_SECTORS[0]);
  const [selectedOrganizationSize, setSelectedOrganizationSize] = useState(personaData.organizationSize || ORGANIZATION_SIZES[0]);

  const handleGoBack = () => {
    navigate('/step-2-demographics');
  };

  const handleNext = () => {
    updatePersonaData({
      professionalSector: selectedSector as typeof PROFESSIONAL_SECTORS[number],
      organizationSize: selectedOrganizationSize as typeof ORGANIZATION_SIZES[number]
    });
    navigate('/step-4-career');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <ProgressBar currentStep={3} totalSteps={7} />
      
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
                Son monde professionnel
              </h1>

              {/* Why this step is essential */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-4 text-shadow">
                  Pourquoi cette étape est essentielle ?
                </h2>
                <p className="text-lg text-white/90 leading-7 text-shadow">
                  Si tu veux attirer les personnes les plus alignées avec ton message, il est crucial de comprendre leur univers professionnel. Savoir dans quel domaine ton persona évolue, la taille de son organisation et le rôle qu'il y incarne, te permet de visualiser ses responsabilités, ses défis quotidiens et le terrain de jeu dans lequel il avance.
                </p>
                <p className="text-lg text-white/90 leading-7 text-shadow mt-4">
                  Ces détails ne sont pas que techniques : ils t'aident à saisir le poids de son monde, et donc à ajuster ton accompagnement ou ton message pour qu'il résonne avec plus de justesse.
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
                      Son monde professionnel
                    </h2>
                  </div>
                </div>
                
                {/* Professional Sector Dropdown */}
                <Dropdown
                  options={PROFESSIONAL_SECTORS}
                  value={selectedSector}
                  onChange={(value) => setSelectedSector(value as typeof selectedSector)}
                  label="Dans quel secteur évolue-t-il ?"
                  placeholder="Sélectionne un secteur"
                />

                {/* Organization Size Dropdown */}
                <Dropdown
                  options={ORGANIZATION_SIZES}
                  value={selectedOrganizationSize}
                  onChange={(value) => setSelectedOrganizationSize(value as typeof selectedOrganizationSize)}
                  label="Quelle est la taille de son organisation ?"
                  placeholder="Sélectionne une taille d'organisation"
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
                    disabled={!selectedSector || !selectedOrganizationSize}
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
