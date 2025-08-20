import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/20 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-white text-secondary-900 hover:bg-white/90 active:bg-white/80 shadow-2xl hover:shadow-3xl',
    secondary: 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 active:bg-white/30',
    outline: 'border-2 border-white/30 bg-transparent text-white hover:bg-white/10 active:bg-white/20',
    ghost: 'bg-transparent text-white hover:bg-white/10 active:bg-white/20'
  };
  
  const sizes = {
    sm: 'h-10 px-6 text-sm',
    md: 'h-12 px-8 text-base',
    lg: 'h-16 px-12 text-lg'
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
