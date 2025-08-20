import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo SVG */}
      <div className={`${sizeClasses[size]} flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl shadow-lg`}>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-6 h-6"
        >
          {/* Estrella central */}
          <path 
            d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
            fill="white"
          />
          {/* Círculo interno */}
          <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" fill="none"/>
          {/* Círculo externo */}
          <path 
            d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" 
            stroke="white" 
            strokeWidth="1.5" 
            fill="none"
          />
        </svg>
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
