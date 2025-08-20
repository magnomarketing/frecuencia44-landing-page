import React from 'react';

const BackgroundSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-background.jpg')",
        }}
      >
        {/* Overlay para mejorar la legibilidad del texto */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Contenido centrado */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h2 className="font-display font-bold text-4xl md:text-6xl mb-6">
          Argentina Libre
        </h2>
        <p className="text-xl md:text-2xl mb-8 font-light">
        Unidos para potenciar el mundo, desde Argentina y su grandioso corazon construyendo con amor una iniciativa de Samuel Valdivia 1122 
        </p>


        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs">AR</span>
            </div>
            <span className="text-lg font-medium">Soberanía Nacional</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs">★</span>
            </div>
            <span className="text-lg font-medium">Independencia</span>
          </div>
        </div>
      </div>
      
      {/* Efecto de partículas o elementos decorativos */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default BackgroundSection;
