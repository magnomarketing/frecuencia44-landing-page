import heroImage from '@/assets/hero-telecom.jpg';

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center gradient-subtle">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-gradient">25+ Años</span> Entregando{' '}
            <br className="hidden sm:block" />
            Soluciones{' '}
            <span className="text-gradient">Inteligentes</span>{' '}
            <br className="hidden sm:block" />
            de Telecomunicaciones
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Tecnología avanzada con IA para optimizar redes de telecomunicaciones
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="#contacto"
              className="btn-warning px-8 py-4 rounded-lg font-semibold text-lg w-full sm:w-auto"
            >
              Contacta un Asesor
            </a>
            <a
              href="#servicios"
              className="btn-outline px-8 py-4 rounded-lg font-semibold text-lg w-full sm:w-auto"
            >
              Ver Servicios
            </a>
          </div>

          {/* Key Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">300+</div>
              <div className="text-muted-foreground">Proveedores en Red</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">AI</div>
              <div className="text-muted-foreground">Tecnología Avanzada</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;