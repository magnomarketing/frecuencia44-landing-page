import React from 'react';

interface LogoWithTextProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LogoWithText: React.FC<LogoWithTextProps> = ({ className = "", size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-32 h-8',
    md: 'w-40 h-10',
    lg: 'w-48 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg 
        viewBox="0 0 160 40" 
        fill="none" 
        className="w-full h-full"
      >
        {/* Fondo del logo */}
        <rect x="2" y="2" width="36" height="36" rx="8" fill="url(#logoGradient)" stroke="white" strokeWidth="1"/>
        
        {/* Ícono central */}
        <g transform="translate(8, 8)">
          <path 
            d="M10 2L10.5 4.5L13 5L10.5 5.5L10 8L9.5 5.5L7 5L9.5 4.5L10 2Z" 
            fill="white"
          />
          <circle cx="10" cy="10" r="2" stroke="white" strokeWidth="1.2" fill="none"/>
          <path 
            d="M10 16C13.3 16 16 13.3 16 10C16 6.7 13.3 4 10 4C6.7 4 4 6.7 4 10C4 13.3 6.7 16 10 16Z" 
            stroke="white" 
            strokeWidth="1.2" 
            fill="none"
          />
        </g>
        
        {/* Texto "Frecuencia 44" */}
        <text x="50" y="16" className="text-white font-bold text-lg fill-white">
          <tspan x="50" dy="0" className="font-display font-bold">Frecuencia</tspan>
        </text>
        <text x="50" y="32" className="text-blue-200 font-bold text-lg fill-blue-200">
          <tspan x="50" dy="0" className="font-display font-bold">44</tspan>
        </text>
        
        {/* Gradiente */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6"/>
            <stop offset="50%" stopColor="#8B5CF6"/>
            <stop offset="100%" stopColor="#4338CA"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default LogoWithText;
