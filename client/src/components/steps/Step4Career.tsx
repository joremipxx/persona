import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { usePersonaStore } from '@/store/personaStore';
import { Input } from '@/components/ui/Input';

export const Step4Career: React.FC = () => {
  const navigate = useNavigate();
  const { personaData, updatePersonaData } = usePersonaStore();
  const [jobTitle, setJobTitle] = useState(personaData.jobTitle || '');
  const [jobMeasuredBy, setJobMeasuredBy] = useState(personaData.jobMeasuredBy || '');
  const [reportsTo, setReportsTo] = useState(personaData.reportsTo || '');

  const handleGoBack = () => {
    navigate('/step-3-professional');
  };

  const handleNext = () => {
    updatePersonaData({
      jobTitle,
      jobMeasuredBy,
      reportsTo
    });
    navigate('/step-5-work-characteristics');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <ProgressBar currentStep={4} totalSteps={7} />
      
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
                Sa carrière
              </h1>

              {/* Why this step is essential */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-4 text-shadow">
                  Pourquoi cette étape est essentielle ?
                </h2>
                <p className="text-lg text-white/90 leading-7 text-shadow">
                  Se concentrer sur la carrière de ton persona, c'est comprendre ce qui nourrit son sentiment de réussite… et ce qui peut être source d'inquiétude.
                </p>
                <p className="text-lg text-white/90 leading-7 text-shadow mt-4">
                  En découvrant son rôle, ses responsabilités et à qui il rend des comptes, tu accèdes à la carte de ses ambitions et à la nature des défis qui jalonnent son parcours.
                </p>
                <p className="text-lg text-white/90 leading-7 text-shadow mt-4">
                  Ces informations te permettent d'offrir des solutions qui résonnent profondément avec ses véritables enjeux.
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
                      Sa carrière
                    </h2>
                  </div>
                </div>
                
                {/* Job Title Input */}
                <div className="space-y-6">
                  <Input
                    label="Quel est son poste ?"
                    placeholder="ex : Commercial, Responsable Marketing, Conseiller, etc."
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="text-white"
                    helperText="Le titre exact de son poste actuel"
                  />
                </div>

                {/* Job Performance Metrics Input */}
                <div className="space-y-6">
                  <Input
                    label="Comment son rôle est-il mesuré ?"
                    placeholder="ex : nombre de prospects générés, chiffre d'affaires, productivité de l'équipe, etc."
                    value={jobMeasuredBy}
                    onChange={(e) => setJobMeasuredBy(e.target.value)}
                    className="text-white"
                    helperText="Les KPIs et métriques qui définissent son succès"
                  />
                </div>

                {/* Reporting Structure Input */}
                <div className="space-y-6">
                  <Input
                    label="À qui rend-il des comptes ?"
                    placeholder="ex : PDG, Président, Directeur, Responsable hiérarchique, etc."
                    value={reportsTo}
                    onChange={(e) => setReportsTo(e.target.value)}
                    className="text-white"
                    helperText="Son supérieur hiérarchique direct"
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
                    disabled={!jobTitle || !jobMeasuredBy || !reportsTo}
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
