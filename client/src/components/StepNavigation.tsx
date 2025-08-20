import React from 'react';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  showSkipWalkthrough?: boolean;
  onSkipWalkthrough?: () => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  isNextDisabled = false,
  showSkipWalkthrough = false,
  onSkipWalkthrough
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Step Indicators */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <button
              key={step}
              type="button"
              className={`w-3 h-3 rounded-full transition-colors ${
                step === currentStep
                  ? 'bg-primary-600'
                  : step < currentStep
                  ? 'bg-primary-300'
                  : 'bg-secondary-300'
              }`}
              aria-label={`Étape ${step}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4">
          {showSkipWalkthrough && onSkipWalkthrough && (
            <Button
              variant="ghost"
              onClick={onSkipWalkthrough}
              className="text-secondary-600"
            >
              Passer le guide
            </Button>
          )}
          
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={onPrevious}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </Button>
            )}
            
            <Button
              onClick={onNext}
              disabled={isNextDisabled}
              className="flex items-center gap-2"
            >
              {currentStep === totalSteps ? 'Terminer' : 'Suivant'}
              {currentStep < totalSteps && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
