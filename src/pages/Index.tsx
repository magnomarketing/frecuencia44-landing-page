import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import MethodologySection from '@/components/MethodologySection';
import RegistrationSection from '@/components/RegistrationSection';
import DonationSection from '@/components/DonationSection';
import BackgroundSection from '@/components/BackgroundSection';
import LogoWithText from '@/components/LogoWithText';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <MethodologySection />
        <RegistrationSection />
        <DonationSection />
        <BackgroundSection />
      </main>
      
      {/* Footer */}
      <footer className="py-12 bg-background-card border-t border-card-border">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <LogoWithText size="lg" />
            </div>
            <p className="text-muted-foreground mb-4">
              Transformación colectiva a través de la coherencia grupal
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025 Frecuencia 44. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;