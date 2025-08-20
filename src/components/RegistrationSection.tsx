import { useState } from 'react';
import { Calendar, Clock, Users, Gift, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const RegistrationSection = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "¡Registro Exitoso!",
        description: "Te has registrado correctamente. Recibirás más información por email.",
      });
      setName('');
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  const eventDetails = [
    {
      icon: <Calendar className="text-accent" size={24} />,
      title: "Fecha",
      value: "24 de Agosto 2025"
    },
    {
      icon: <Clock className="text-accent" size={24} />,
      title: "Horario",
      value: "19:00 hrs (ARG/CHI)"
    },
    {
      icon: <Users className="text-accent" size={24} />,
      title: "Modalidad",
      value: "Virtual y Gratuita"
    },
    {
      icon: <Gift className="text-accent" size={24} />,
      title: "Grupo",
      value: "Diamante (máx. 1,000)"
    }
  ];

  const benefits = [
    "Fortalecimiento del campo áurico personal",
    "Técnicas de manifestación con Llama Violeta",
    "Liberación de contratos limitantes",
    "Coherencia grupal y unidad colectiva",
    "Material de apoyo exclusivo",
    "Acceso a comunidad privada"
  ];

  return (
    <section id="registro" className="py-24 bg-background-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Únete al
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Grupo Diamante</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Regístrate ahora y forma parte de esta experiencia transformadora. 
            El acceso es completamente gratuito y está limitado a 1,000 participantes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Registration Form */}
          <div>
            <Card className="p-8 bg-card border-card-border shadow-elegant">
              <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                Registro Gratuito
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Nombre Completo
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Registrando..."
                  ) : (
                    <>
                      Regístrate Gratis
                      <ArrowRight className="ml-2" size={20} />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-card-border">
                <p className="text-sm text-muted-foreground text-center">
                  Al registrarte, aceptas recibir información sobre la Masterclass Frecuencia 44 
                  y eventos relacionados. Puedes cancelar tu suscripción en cualquier momento.
                </p>
              </div>
            </Card>
          </div>

          {/* Event Details & Benefits */}
          <div className="space-y-8">
            {/* Event Details */}
            <Card className="p-8 bg-card border-card-border">
              <h3 className="font-display font-bold text-xl text-foreground mb-6">
                Detalles del Evento
              </h3>
              <div className="space-y-4">
                {eventDetails.map((detail, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {detail.icon}
                    <div>
                      <span className="text-muted-foreground text-sm">{detail.title}:</span>
                      <span className="text-foreground font-medium ml-2">{detail.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Benefits */}
            <Card className="p-8 bg-card border-card-border">
              <h3 className="font-display font-bold text-xl text-foreground mb-6">
                Lo que Recibirás
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;