import { ArrowDown, Calendar, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const baseUrl = import.meta.env.BASE_URL;
  
  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        minHeight: '120vh',
        backgroundImage: `url('${baseUrl}hero-background.webp') !important`,
        backgroundSize: 'cover !important',
        backgroundPosition: 'center !important',
        backgroundRepeat: 'no-repeat !important',
        backgroundColor: 'blue !important'
      }}
          >
        {/* Test Background */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: 'red !important',
            zIndex: -1
          }}
        ></div>
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${baseUrl}hero-background.webp')`,
            backgroundColor: 'blue',
            zIndex: 1,
            opacity: 0.3
          }}
        ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-24 h-24 bg-secondary/30 rounded-full blur-lg animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-full text-sm font-black mb-8">
          <Sparkles size={16} />
          <span>TRANSFORMACIÓN ESPIRITUAL</span>
          <Sparkles size={16} />
        </div>

        {/* Main Title */}
        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight mb-6 drop-shadow-sm">
          <span className="text-secondary">MASTERCLASS</span>
          <br />
          <span className="bg-gradient-primary bg-clip-text text-transparent drop-shadow-none">
            FRECUENCIA 44
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Fortalecimiento del campo áurico, manifestación con Llama Violeta y coherencia grupal 
          para la transformación de Argentina. Una experiencia de unidad, alegría y trascendencia.
        </p>

        {/* Key Info */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-foreground">
          <div className="flex items-center space-x-2">
            <Calendar className="text-accent" size={20} />
            <span className="font-medium">24 de Agosto 2025</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="text-accent" size={20} />
            <span className="font-medium">Virtual y Gratuito</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="text-accent" size={20} />
            <span className="font-medium">Grupo Diamante</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button variant="primary" size="lg" className="text-lg px-8">
            Regístrate Gratis
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8">
            Conoce Más
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom+12 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 mt-8" style={{ color: '#8FE5FF' }}>
            <span className="text-sm font-medium">CONOCE MÁS</span>
            <ArrowDown size={20} className="animate-bounce" />
          </div>
        </div>
      </div>

      {/* Artistic Overlays inspired by reference */}
      <div className="absolute top-1/4 right-10 w-64 h-64 opacity-20">
        <div className="w-full h-full bg-gradient-primary rounded-3xl rotate-12 transform"></div>
      </div>
      <div className="absolute bottom-1/4 left-10 w-48 h-48 opacity-15">
        <div className="w-full h-full bg-gradient-accent rounded-2xl -rotate-6 transform"></div>
      </div>
    </section>
  );
};

export default HeroSection;