import React from 'react';
import { cn } from '@/utils/cn';
import { Check } from 'lucide-react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className,
  id,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            id={checkboxId}
            type="checkbox"
            className="sr-only"
            {...props}
          />
          <label
            htmlFor={checkboxId}
            className={cn(
              'flex h-4 w-4 cursor-pointer items-center justify-center rounded border border-secondary-300',
              'hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus:ring-red-500',
              className
            )}
          >
            <Check className="h-3 w-3 text-white opacity-0 transition-opacity" />
          </label>
        </div>
        {label && (
          <label htmlFor={checkboxId} className="text-sm text-secondary-700 cursor-pointer">
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
