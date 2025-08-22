import React from 'react';

const FloatingDonationButton: React.FC = () => {
  const handleDonationClick = () => {
    window.open('https://link.mercadopago.com.ar/argentina44', '_blank');
  };

  return (
    <button
      onClick={handleDonationClick}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
      style={{
        backgroundColor: '#00B9FE', // Color azul especificado
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#0098D4'; // Versión más oscura
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#00B9FE'; // Volver al color original
      }}
    >
      <img 
        src="/favicon.ico" 
        alt="Frecuencia 44" 
        className="w-5 h-5"
        onError={(e) => {
          // Fallback si no carga el favicon
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="font-semibold text-sm">Donativo</span>
    </button>
  );
};

export default FloatingDonationButton;
