import { Heart, Sparkles, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import MercadoPagoButton from '@/components/MercadoPagoButton';

const DonationSection = () => {
  const impactAreas = [
    {
      icon: <Users className="text-accent" size={32} />,
      title: "Expansión del Grupo Diamante",
      description: "Facilitar el acceso a más personas y fortalecer la red de coherencia grupal."
    },
    {
      icon: <Globe className="text-accent" size={32} />,
      title: "Festival Argentina Libre",
      description: "Organizar el encuentro masivo del 27 de septiembre con 10,000+ personas."
    },
    {
      icon: <Sparkles className="text-accent" size={32} />,
      title: "Recursos Educativos",
      description: "Crear materiales, meditaciones guiadas y herramientas de transformación."
    }
  ];



  return (
    <section id="donativo" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full font-medium mb-6">
            <Heart size={20} />
            <span>DONATIVO VOLUNTARIO</span>
          </div>
          
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Apoya la
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Transformación</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Tu contribución voluntaria nos ayuda a expandir esta misión de transformación 
            y coherencia grupal. Cada aporte, sin importar el monto, es valioso y apreciado.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Impact Areas */}
          <div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-8">
              Tu Donativo Apoya:
            </h3>
            
            <div className="space-y-6">
              {impactAreas.map((area, index) => (
                <Card key={index} className="p-6 bg-card border-card-border hover:shadow-card transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-accent/10 rounded-xl flex-shrink-0">
                      {area.icon}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-lg text-foreground mb-2">
                        {area.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Gratitude Message */}
            <div className="mt-8 p-6 bg-gradient-primary/10 border border-primary/20 rounded-xl">
              <h4 className="font-display font-bold text-lg text-foreground mb-3">
                Gratitud Infinita
              </h4>
              <p className="text-muted-foreground">
                Cada contribución es recibida con profunda gratitud. Tu apoyo no solo 
                sostiene este movimiento, sino que también amplifica la energía colectiva 
                hacia la transformación de Argentina y el planeta.
              </p>
            </div>
          </div>

          {/* Donation Options */}
          <div className="lg:pt-20">
            <Card className="p-8 bg-card border-card-border shadow-elegant">
              <h3 className="font-display font-bold text-2xl text-foreground mb-8  text-center">
                Realiza tu Donativo
              </h3>
              
              {/* Donation Methods */}
              <div className="space-y-6">
                {/* Mercado Pago Button */}
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Donativo con Mercado Pago (ARS)
                    </p>
                  </div>
                  <MercadoPagoButton />
                </div>

                {/* Transferencia Bancaria */}
                <div className="space-y-3">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Transferencia Bancaria
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Alias:</span>
                        <span className="font-mono text-gray-900">copas.dado.pure.mp</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">CVU:</span>
                        <span className="font-mono text-gray-900">0000003100062666949819</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Nombre:</span>
                        <span className="text-gray-900">Karina Andrea Gomez Nader</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-card-border text-center">
                <p className="text-sm text-muted-foreground">
                  <strong>Recuerda:</strong> La masterclass es completamente gratuita. 
                  Tu donativo es opcional y va hacia la expansión de esta misión de transformación.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;