import { Heart, Sparkles, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

  const donationAmounts = [
    { amount: "$1", description: "Contribución Básica desde 1 dolar" },
    { amount: "Personalizado", description: "Tu Aporte Único" }
  ];

  return (
    <section id="donativo" className="py-24 bg-background">
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
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
          <div>
            <Card className="p-8 bg-card border-card-border shadow-elegant">
              <h3 className="font-display font-bold text-2xl text-foreground mb-6 text-center">
                Realiza tu Donativo
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {donationAmounts.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto py-4 px-4 flex flex-col items-center space-y-1 hover:bg-primary/10 hover:border-primary transition-all duration-200"
                  >
                    <span className="font-bold text-lg text-foreground">
                      {option.amount}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {option.description}
                    </span>
                  </Button>
                ))}
              </div>

              {/* Donation Methods */}
              <div className="space-y-4">
                <Button variant="primary" size="lg" className="w-full">
                  <Heart className="mr-2" size={20} />
                  Donar con MercadoPago
                </Button>
                
                <Button variant="outline" size="lg" className="w-full">
                  Transferencia Bancaria
                </Button>
                
                <Button variant="outline" size="lg" className="w-full">
                  Otros Métodos
                </Button>
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