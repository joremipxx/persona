import React from 'react';
import { cn } from '@/utils/cn';

interface StepLayoutProps {
  stepNumber: number;
  stepTitle: string;
  philosophicalTitle: string;
  philosophicalContent: string;
  children: React.ReactNode;
  className?: string;
}

export const StepLayout: React.FC<StepLayoutProps> = ({
  stepNumber,
  stepTitle,
  philosophicalTitle,
  philosophicalContent,
  children,
  className
}) => {
  return (
    <div className={cn('min-h-screen bg-secondary-50', className)}>
      <div className="container mx-auto px-4 py-8">
        {/* Step Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-medium">
              {stepNumber}
            </span>
            <h1 className="text-2xl font-bold text-secondary-900">
              {stepTitle}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Philosophical Content */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">
                {philosophicalTitle}
              </h2>
              <p className="text-secondary-700 leading-relaxed">
                {philosophicalContent}
              </p>
            </div>
          </div>

          {/* Right Panel - Form Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-200">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
