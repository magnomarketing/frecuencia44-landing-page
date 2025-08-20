import { Monitor, Cpu, Key, Bell } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Monitor,
      title: "Panel Único",
      description: "Todo centralizado en una interfaz"
    },
    {
      icon: Cpu,
      title: "Microservicios",
      description: "Soluciones modulares y escalables"
    },
    {
      icon: Key,
      title: "Llave en Mano",
      description: "Implementación completa sin complicaciones"
    },
    {
      icon: Bell,
      title: "Alertas Inteligentes",
      description: "Notificaciones proactivas"
    }
  ];

  return (
    <section id="nosotros" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            ¿Por Qué Elegir <span className="text-gradient">Lucky Intelligence?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            25+ años de experiencia respaldando nuestras soluciones innovadoras
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;