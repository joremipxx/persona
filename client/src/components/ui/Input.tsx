import React from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-3">
      {label && (
        <label htmlFor={inputId} className="block text-2xl font-clash text-white font-semibold">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'flex h-14 w-full rounded-xl border-2 bg-white/10 backdrop-blur-sm px-6 py-4 text-lg',
          'placeholder:text-white/50 text-white',
          'focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/30',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-all duration-200',
          error && 'border-red-400 focus:ring-red-400/20 focus:border-red-400',
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-300 font-medium">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-white/60 font-medium">{helperText}</p>
      )}
    </div>
  );
};
