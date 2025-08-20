import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/utils/cn';

interface SliderProps {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export const Slider: React.FC<SliderProps> = ({
  options,
  value,
  onChange,
  label
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragValue, setDragValue] = useState(value);
  const [hasDragged, setHasDragged] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const currentIndex = options.findIndex(option => option === value);
  const dragIndex = options.findIndex(option => option === dragValue);

  // Ensure we have valid options
  if (options.length === 0) return null;

  const calculateValueFromPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return value;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const index = Math.round(percentage * (options.length - 1));
    const clampedIndex = Math.max(0, Math.min(options.length - 1, index));
    
    return options[clampedIndex];
  }, [options, value]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasDragged(false);
    const newValue = calculateValueFromPosition(e.clientX);
    setDragValue(newValue);
  }, [calculateValueFromPosition]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    setHasDragged(true);
    const newValue = calculateValueFromPosition(e.clientX);
    setDragValue(newValue);
  }, [isDragging, calculateValueFromPosition]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      if (hasDragged) {
        onChange(dragValue);
      }
    }
  }, [isDragging, hasDragged, dragValue, onChange]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Only handle click if we haven't dragged
    if (hasDragged) return;
    
    const newValue = calculateValueFromPosition(e.clientX);
    onChange(newValue);
  }, [hasDragged, calculateValueFromPosition, onChange]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Reset drag state when value changes externally
  useEffect(() => {
    setDragValue(value);
    setHasDragged(false);
  }, [value]);

  const activeIndex = isDragging ? dragIndex : currentIndex;
  const progressPercentage = ((activeIndex + 0.5) / options.length) * 100;
  const thumbPosition = ((activeIndex + 0.5) / options.length) * 100;

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-clash text-white font-semibold">
        {label}
      </h3>
      
      {/* Slider Container */}
      <div className="space-y-6">
        {/* Slider Track */}
        <div 
          ref={sliderRef}
          className="relative h-3 bg-white/10 rounded-full cursor-pointer select-none"
          onMouseDown={handleMouseDown}
          onClick={handleClick}
        >
          {/* Progress Fill */}
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-white/40 to-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
          
          {/* Slider Thumb */}
          <div 
            className={cn(
              "absolute top-1/2 w-8 h-8 bg-white rounded-full shadow-2xl transform -translate-y-1/2 -translate-x-1/2 transition-all duration-300 ease-out cursor-grab select-none",
              isDragging && "cursor-grabbing scale-110 shadow-3xl"
            )}
            style={{ left: `${thumbPosition}%` }}
          >
            {/* Thumb Inner Glow */}
            <div className="absolute inset-1 bg-gradient-to-br from-white to-white/80 rounded-full" />
          </div>
          

        </div>
        
        {/* Option Labels */}
        <div className="flex justify-between items-start">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className={cn(
                "text-sm font-medium transition-all duration-300 text-center group select-none flex flex-col items-center",
                index === activeIndex 
                  ? "text-white" 
                  : "text-white/60 hover:text-white/80"
              )}
              style={{ width: `${100 / options.length}%` }}
            >
              <div className={cn(
                "w-2 h-2 mb-2 rounded-full transition-all duration-300 group-hover:scale-125",
                index === activeIndex 
                  ? "bg-white shadow-lg" 
                  : "bg-white/30 group-hover:bg-white/50"
              )} />
              <span className="block text-xs leading-tight break-words hyphens-auto text-center px-1">{option}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Current Selection Display */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg">
        <div className="text-center">
          <span className="text-lg font-semibold text-white">
            {isDragging ? dragValue : value}
          </span>
        </div>
      </div>
    </div>
  );
};
