import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowLeft, Plus, X, Phone, Mail, MessageSquare, Share2, Users } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { usePersonaStore } from '@/store/personaStore';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils/cn';

// Predefined tools
const PREDEFINED_TOOLS = [
  'Logiciels de comptabilité & gestion financière',
  'CRM (gestion de la relation client)',
  'Systèmes de gestion de contenu (CMS)',
  'Gestion de projet',
  'Stockage & partage de fichiers dans le cloud',
  'Email',
  'Logiciels de planification d\'employés',
  'Logiciels de facturation',
  'Traitement de texte',
  'Outils de reporting',
  'Tableaux de bord d\'intelligence décisionnelle'
];

// Communication preferences
const COMMUNICATION_PREFERENCES = [
  { id: 'phone', label: 'Téléphone', icon: Phone },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'sms', label: 'SMS / Messagerie instantanée', icon: MessageSquare },
  { id: 'social', label: 'Réseaux sociaux', icon: Share2 },
  { id: 'face-to-face', label: 'En face à face', icon: Users }
];

interface ToolsSelectorProps {
  selectedTools: string[];
  onToolsChange: (tools: string[]) => void;
}

const ToolsSelector: React.FC<ToolsSelectorProps> = ({
  selectedTools,
  onToolsChange
}) => {
  const [customTool, setCustomTool] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleToolToggle = (tool: string) => {
    if (selectedTools.includes(tool)) {
      onToolsChange(selectedTools.filter(t => t !== tool));
    } else {
      onToolsChange([...selectedTools, tool]);
    }
  };

  const handleAddCustomTool = () => {
    if (customTool.trim() && !selectedTools.includes(customTool.trim())) {
      // Check if there's already a custom tool (non-predefined)
      const hasCustomTool = selectedTools.some(tool => 
        !PREDEFINED_TOOLS.includes(tool)
      );
      
      if (!hasCustomTool) {
        onToolsChange([...selectedTools, customTool.trim()]);
        setCustomTool('');
        setShowCustomInput(false);
      }
    }
  };

  const handleRemoveTool = (tool: string) => {
    onToolsChange(selectedTools.filter(t => t !== tool));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-clash text-white font-semibold">
        Quels outils utilise-t-il ou dont il a besoin pour accomplir son travail ?
      </h3>
      
      {/* Predefined Tools Grid */}
      <div className="grid grid-cols-2 gap-4">
        {PREDEFINED_TOOLS.map((tool) => (
          <button
            key={tool}
            type="button"
            onClick={() => handleToolToggle(tool)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all duration-200 text-left min-h-[70px]",
              "hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20",
              selectedTools.includes(tool)
                ? "bg-[#8D2146] border-[#8D2146] text-white"
                : "bg-white/10 border-white/20 text-white/80 hover:bg-white/15 hover:border-white/30"
            )}
          >
            <span className="text-sm font-medium leading-tight block">{tool}</span>
          </button>
        ))}
      </div>

      {/* Custom Tool Input */}
      {showCustomInput ? (
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Décris ton outil personnalisé..."
            value={customTool}
            onChange={(e) => setCustomTool(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddCustomTool();
              }
            }}
          />
          <div className="flex items-center gap-3">
            <Button
              onClick={handleAddCustomTool}
              disabled={!customTool.trim()}
              className="h-14 px-6 bg-white text-secondary-900 hover:bg-white/90 font-semibold shadow-lg rounded-xl"
            >
              Ajouter
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowCustomInput(false);
                setCustomTool('');
              }}
              className="h-14 w-14 border-white/30 text-white hover:bg-white/10 rounded-xl flex items-center justify-center text-lg font-bold"
            >
              ✕
            </Button>
          </div>
        </div>
      ) : (
        !selectedTools.some(tool => !PREDEFINED_TOOLS.includes(tool)) && (
          <Button
            variant="outline"
            onClick={() => setShowCustomInput(true)}
            className="w-full h-14 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30 hover:text-white font-medium transition-all duration-300"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un outil personnalisé
          </Button>
        )
      )}

      {/* Selected Tools Display */}
      {selectedTools.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white">Outils sélectionnés :</h4>
          <div className="space-y-2">
            {selectedTools.map((tool) => (
              <div
                key={tool}
                className="flex items-center justify-between p-4 bg-white/10 rounded-lg border border-white/20"
              >
                <span className="text-white text-base font-medium leading-relaxed">{tool}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTool(tool)}
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

interface CommunicationSelectorProps {
  selectedCommunication: string;
  onCommunicationChange: (communication: string) => void;
}

const CommunicationSelector: React.FC<CommunicationSelectorProps> = ({
  selectedCommunication,
  onCommunicationChange
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-clash text-white font-semibold">
        Comment préfère-t-il communiquer avec ses partenaires ou d'autres entreprises ?
      </h3>
      
      <div className="grid grid-cols-5 gap-4">
        {COMMUNICATION_PREFERENCES.map((pref) => {
          const IconComponent = pref.icon;
          const isSelected = selectedCommunication === pref.id;
          
          return (
            <button
              key={pref.id}
              type="button"
              onClick={() => onCommunicationChange(pref.id)}
              className={cn(
                "flex flex-col items-center space-y-3 p-4 rounded-xl border-2 transition-all duration-200",
                "hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20",
                isSelected
                  ? "bg-[#8D2146] border-[#8D2146] text-white"
                  : "bg-white/10 border-white/20 text-white/80 hover:bg-white/15 hover:border-white/30"
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200",
                isSelected
                  ? "bg-white text-secondary-900"
                  : "bg-white/20 text-white"
              )}>
                <IconComponent className="w-8 h-8" />
              </div>
              <span className="text-sm font-medium text-center leading-tight">{pref.label}</span>
            </button>
          );
        })}
      </div>
      
      {/* Selected Communication Display */}
      {selectedCommunication && (
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
          <div className="text-center">
            <span className="text-lg font-semibold text-white">
              {COMMUNICATION_PREFERENCES.find(p => p.id === selectedCommunication)?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const Step6WorkStyle: React.FC = () => {
  const navigate = useNavigate();
  const { personaData, updatePersonaData } = usePersonaStore();
  const [selectedTools, setSelectedTools] = useState<string[]>(personaData.tools || []);
  const [selectedCommunication, setSelectedCommunication] = useState(personaData.communicationPreference || '');

  const handleGoBack = () => {
    navigate('/step-5-work-characteristics');
  };

  const handleNext = () => {
    updatePersonaData({
      tools: selectedTools,
      communicationPreference: selectedCommunication
    });
    navigate('/step-7-consumption-habits');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <ProgressBar currentStep={6} totalSteps={7} />
      
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
                Sa manière de travailler
              </h1>

              {/* Why this step is essential */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-4 text-shadow">
                  Pourquoi cette étape est essentielle ?
                </h2>
                <p className="text-lg text-white/90 leading-7 text-shadow">
                  Comprendre les outils que ton persona utilise, c'est percer son système d'opération quotidien.
                </p>
                <p className="text-lg text-white/90 leading-7 text-shadow mt-4">
                  Ces outils révèlent sa façon d'agir, d'organiser son monde, de collaborer et de créer.
                </p>
                <p className="text-lg text-white/90 leading-7 text-shadow mt-4">
                  En découvrant comment il travaille et communique, tu identifies les points de résonance possibles avec ce que tu proposes. Tu vois aussi ce qui peut le libérer de la complexité et lui redonner de la fluidité.
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
                      Sa manière de travailler
                    </h2>
                  </div>
                </div>
                
                {/* Tools Selector */}
                <ToolsSelector
                  selectedTools={selectedTools}
                  onToolsChange={setSelectedTools}
                />

                {/* Communication Selector */}
                <CommunicationSelector
                  selectedCommunication={selectedCommunication}
                  onCommunicationChange={setSelectedCommunication}
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
                    disabled={selectedTools.length === 0 || !selectedCommunication}
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
