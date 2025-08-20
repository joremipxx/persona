import React from 'react';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  onRemove,
  className
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-800',
        className
      )}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 rounded-full p-0.5 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          aria-label={`Supprimer ${label}`}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};
