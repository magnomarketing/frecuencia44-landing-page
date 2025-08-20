import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-13 h-13',
    md: 'w-25 h-20',
    lg: 'w-25 h-25'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Image */}
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <img 
          src="/logotipo.png" 
          alt="Frecuencia 44 Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Texto "Frecuencia 44" */}
      {showText && (
        <span className={`font-display font-bold ${textSizes[size]} text-foreground`}>
          Frecuencia 44
        </span>
      )}
    </div>
  );
};

export default Logo;
