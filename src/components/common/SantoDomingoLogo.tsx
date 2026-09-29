import React from 'react';

interface SantoDomingoLogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'emblem' | 'text-only' | 'image';
  theme?: 'dark' | 'light' | 'mono';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showEst?: boolean;
}

export const SantoDomingoLogo: React.FC<SantoDomingoLogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    xs: 'h-8 max-w-[120px]',
    sm: 'h-12 max-w-[160px]',
    md: 'h-16 max-w-[200px]',
    lg: 'h-24 max-w-[280px]',
    xl: 'h-32 max-w-[360px]',
    '2xl': 'h-44 max-w-[480px]'
  };

  return (
    <div className={`inline-flex items-center justify-center select-none bg-transparent ${className}`}>
      <img
        src="/logo.png"
        alt="Santo Domingo Country Club"
        className={`${sizeClasses[size]} w-auto object-contain drop-shadow-xs`}
        loading="eager"
      />
    </div>
  );
};
