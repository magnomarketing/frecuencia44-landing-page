import { Calendar, Clock, Users, Gift, CheckCircle, ArrowRight, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormFieldComponent, FormRadioGroup, FormCheckbox } from '@/components/ui/form-field';
import { useRegistrationForm } from '@/hooks/use-registration-form';

const RegistrationSection = () => {
  const { form, handleSubmit, isSubmitting } = useRegistrationForm();

  const eventDetails = [
    {
      icon: <Calendar className="text-accent" size={24} />,
      title: "Fecha",
      value: "27 de Septiembre 2025"
    },
    {
      icon: <Clock className="text-accent" size={24} />,
      title: "Horario",
      value: "Por confirmar"
    },
    {
      icon: <MapPin className="text-accent" size={24} />,
      title: "Ubicación",
      value: "Tucumán, Argentina"
    },
    {
      icon: <Users className="text-accent" size={24} />,
      title: "Modalidad",
      value: "Presencial y Virtual"
    }
  ];

  const benefits = [
    "Experiencia transformadora única",
    "Conexión con el Grupo Diamante",
    "Activación energética colectiva",
    "Material exclusivo del evento",
    "Acceso a comunidad privada",
    "Participación en la transformación de Argentina"
  ];

  const attendanceOptions = [
    { value: "virtual", label: "Virtual" },
    { value: "presencial", label: "Presencial en Tucumán" }
  ];

  return (
    <section id="registro" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Registro para el
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Evento Tucumán</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Únete a esta experiencia única que se realizará el 27 de septiembre en Tucumán,
            con modalidad presencial y virtual. Forma parte de la transformación colectiva.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Event Details & Benefits */}
          <div className="space-y-8">
            {/* Event Details */}
            <div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                Detalles del Evento
              </h3>
              <div className="space-y-4">
                {eventDetails.map((detail, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    {detail.icon}
                    <div>
                      <p className="font-medium text-foreground">{detail.title}</p>
                      <p className="text-muted-foreground">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                Beneficios Incluidos
              </h3>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="text-accent flex-shrink-0" size={20} />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div>
            <Card className="p-8 bg-card border-card-border shadow-elegant">
              <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                Registro al Evento
              </h3>

              <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nombre Completo */}
                  <FormFieldComponent
                    name="fullName"
                    label="Nombre Completo"
                    placeholder="Ingresa tu nombre completo"
                    required
                  />

                  {/* Email */}
                  <FormFieldComponent
                    name="email"
                    label="Correo Electrónico"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    required
                    description="Te enviaremos el enlace de acceso a esta dirección"
                  />

                  {/* País y Ciudad */}
                  <FormFieldComponent
                    name="location"
                    label="País y Ciudad"
                    placeholder="País, Ciudad"
                    required
                    description="Nos ayuda a mapear la red de participantes"
                  />

                  {/* WhatsApp */}
                  <FormFieldComponent
                    name="whatsapp"
                    label="WhatsApp"
                    type="tel"
                    placeholder="+54 9 11 1234-5678"
                    description="Para recordatorios y envío rápido del enlace de acceso"
                  />

                  {/* Modalidad de Asistencia */}
                  <FormRadioGroup
                    name="attendance"
                    label="¿Cómo planeas asistir al evento del 27 de septiembre?"
                    options={attendanceOptions}
                    required
                  />

                  {/* Consentimiento de Datos */}
                  <FormCheckbox
                    name="dataConsent"
                    label="Consentimiento de Datos"
                    checkboxLabel="Autorizo el tratamiento de mis datos personales para fines de organización y comunicación de este evento"
                    required
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Procesando registro..."
                    ) : (
                      <>
                        Registrarme al Evento
                        <ArrowRight className="ml-2" size={20} />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 pt-6 border-t border-card-border">
                <p className="text-sm text-muted-foreground text-center">
                  Los campos marcados con * son obligatorios.
                  Tus datos serán tratados con confidencialidad y solo para fines del evento.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;