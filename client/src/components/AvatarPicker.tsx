import React from 'react';
import { cn } from '@/utils/cn';

interface AvatarPickerProps {
  selectedAvatar: number;
  onAvatarSelect: (avatarId: number) => void;
}

// Simple SVG avatars - in a real app, these would be more sophisticated
const AvatarSVG: React.FC<{ id: number; className?: string }> = ({ id, className }) => {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899',
    '#06B6D4', '#84CC16', '#F97316', '#6366F1', '#14B8A6', '#F43F5E'
  ];
  
  const color = colors[(id - 1) % colors.length];
  
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn('w-full h-full', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" fill={color} />
      <circle cx="50" cy="35" r="15" fill="white" />
      <path
        d="M20 80 C20 60, 80 60, 80 80"
        fill="white"
      />
    </svg>
  );
};

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  selectedAvatar,
  onAvatarSelect
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-2xl font-clash text-white font-semibold">
        Choisis ton avatar
      </label>
      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((avatarId) => (
          <button
            key={avatarId}
            type="button"
            onClick={() => onAvatarSelect(avatarId)}
            className={cn(
              'relative w-20 h-20 transition-all duration-300',
              'hover:scale-110 focus:outline-none',
              'shadow-lg hover:shadow-xl',
              selectedAvatar === avatarId
                ? 'ring-4 ring-white/30 shadow-2xl'
                : ''
            )}
            aria-label={`Avatar ${avatarId}`}
          >
            <AvatarSVG id={avatarId} />
            {selectedAvatar === avatarId && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-secondary-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
