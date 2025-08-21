import { Heart, Target, Globe, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AboutSection = () => {
  const objectives = [
    {
      icon: <Users className="text-accent" size={52} />,
      title: "Grupo Diamante",
      description: "Consolidar energéticamente un grupo especial de máximo 1,000 personas como base sólida para el evento final."
    },
    {
      icon: <Globe className="text-accent" size={52} />,
      title: "Festival Argentina Libre",
      description: "Preparar el encuentro central del 27 de septiembre 2025 con 10,000-14,000 personas en una sola intención energética."
    },
    {
      icon: <Target className="text-accent" size={52} />,
      title: "Activación Planetaria",
      description: "Activar una esfera de luz que se inicie en Argentina y se expanda al planeta, con visión de soberanía integral."
    },
    {
      icon: <Heart className="text-accent" size={52} />,
      title: "Coherencia Colectiva",
      description: "Pasar de intenciones individuales a una coherencia grupal contundente que rompa la inercia del pensamiento colectivo."
    }
  ];

  return (
    <section id="masterclass" className="py-24 bg-background-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Una Experiencia de
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Transformación</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            La Masterclass Frecuencia 44 es más que un evento: es el inicio de una transformación 
            colectiva que busca activar la coherencia grupal y manifestar una Argentina libre, 
            soberana e independiente en todos los aspectos.
          </p>
        </div>

        {/* Video Section */}
        <div className="text-center mb-16">
          <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-8">
            Conoce Más Sobre
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Frecuencia 44</span>
          </h3>
          <div className="max-w-4xl mx-auto">
            <Card className="p-4 bg-card border-card-border shadow-elegant">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/0tBR2wflaHk"
                  title="Frecuencia 44 - Transformación Colectiva"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Objectives Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {objectives.map((objective, index) => (
            <Card key={index} className="p-8 bg-card border-card-border hover:shadow-card transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {objective.icon}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                    {objective.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {objective.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;