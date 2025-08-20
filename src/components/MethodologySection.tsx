import { Shield, Music, Eye, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';

const MethodologySection = () => {
  const practices = [
    {
      icon: <Shield className="text-accent" size={40} />,
      title: "Fortalecimiento del Aura",
      subtitle: "Blindaje Energético Dorado",
      description: "Técnicas de fortalecimiento del campo emocional y áurico con blindaje dorado en cabeza y cintura. Protección y expansión de la energía personal.",
      steps: [
        "Visualización del blindaje dorado",
        "Activación de centros energéticos",
        "Expansión del campo áurico",
        "Consolidación de la protección"
      ]
    },
    {
      icon: <Music className="text-accent" size={40} />,
      title: "Manifestación con Llama Violeta",
      subtitle: "Melodías de Transformación",
      description: "Cada participante identifica su melodía individual para luego fusionarla en una melodía grupal que robustece al Grupo Diamante.",
      steps: [
        "Conexión con melodía personal",
        "Activación de Llama Violeta",
        "Fusión en melodía grupal",
        "Fortalecimiento colectivo"
      ]
    },
    {
      icon: <Eye className="text-accent" size={40} />,
      title: "Coherencia Grupal",
      subtitle: "Visualizaciones Colectivas",
      description: "Visualizaciones colectivas de una Argentina libre, soberana y expansiva. Creación de una matriz energética unificada.",
      steps: [
        "Visualización de Argentina libre",
        "Proyección de soberanía integral",
        "Creación de matriz colectiva",
        "Anclaje de la nueva realidad"
      ]
    },
    {
      icon: <Heart className="text-accent" size={40} />,
      title: "Liberación de Contratos",
      subtitle: "Sanación y Renovación",
      description: "Ejercicios de liberación de contratos limitantes: pobreza, lealtades obsoletas, relaciones tóxicas. Alineación con la nueva tierra.",
      steps: [
        "Identificación de contratos limitantes",
        "Proceso de liberación consciente",
        "Sanación de patrones ancestrales",
        "Alineación con nueva frecuencia"
      ]
    }
  ];

  return (
    <section id="metodologia" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Contenido de la
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Masterclass</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Un enfoque integral que combina técnicas ancestrales con metodologías modernas 
            para crear una experiencia de transformación profunda y duradera.
          </p>
        </div>

        {/* Practices Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {practices.map((practice, index) => (
            <Card key={index} className="p-8 bg-card border-card-border hover:shadow-elegant transition-all duration-500">
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-accent/10 rounded-xl">
                    {practice.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground">
                      {practice.title}
                    </h3>
                    <p className="text-accent font-medium">
                      {practice.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {practice.description}
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground mb-4">Proceso de Práctica:</h4>
                {practice.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {stepIndex + 1}
                    </div>
                    <span className="text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Important Note */}
        <div className="mt-16 text-center">
          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="font-display font-bold text-2xl text-foreground mb-4">
              Enfoque Universal y Accesible
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos un lenguaje accesible y universal, evitando confusiones. 
              Nos enfocamos en el <strong className="text-accent">fortalecimiento del campo emocional y áurico</strong>, 
              <strong className="text-accent"> prácticas de luz</strong> y <strong className="text-accent">unidad colectiva</strong> 
              para crear una experiencia comprensible y transformadora para todos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;