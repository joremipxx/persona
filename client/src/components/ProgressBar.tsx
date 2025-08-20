import React from 'react';
import { cn } from '@/utils/cn';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  className
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn('fixed top-0 left-0 right-0 z-50', className)}>
      <div className="h-2 bg-white/20">
        <div 
          className="h-full transition-all duration-500 ease-out"
          style={{ 
            width: `${progress}%`,
            backgroundColor: '#8D2146'
          }}
        />
      </div>
    </div>
  );
};
