import { CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { FormFieldComponent, FormRadioGroup, FormCheckbox } from '@/components/ui/form-field';
import { useRegistrationForm } from '@/hooks/use-registration-form';

const RegistrationSection = () => {
  const { form, handleSubmit, isSubmitting } = useRegistrationForm();



  const benefits = [
    "Experiencia transformadora única",
    "Conexión con el Grupo Diamante",
    "Activación energética colectiva",
    "Material exclusivo del evento",
    "Acceso a comunidad privada",
    "Participación en la transformación de Argentina"
  ];



  return (
    <section id="registro" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            Registro para la
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Master Class</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Al correo que registres recibirás el link de acceso por Zoom para conectarte a la MasterClass "Alquimia de Pactos y Lealtades" el Domingo 24 de agosto de 2025 a las 15:00 hrs (hora Argentina).<br />
            ⚡ Cupo virtual limitado a 1,000 personas. ¡Asegura tu lugar!
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Benefits */}
          <div className="mb-12">
            <h3 className="font-display font-bold text-2xl text-foreground mb-6 text-center">
              Lo que recibirás en la Masterclass del domingo 24 de Agosto a las 15 hrs
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-accent flex-shrink-0" size={20} />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <div className="max-w-md mx-auto">
            <Card className="p-8 bg-card border-card-border shadow-elegant">
              <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                Master Class
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
                    description="Te enviaremos el link de Zoom a esta dirección"
                  />

                  {/* País y Ciudad */}
                  <FormFieldComponent
                    name="location"
                    label="País y Ciudad"
                    placeholder="País, Ciudad"
                    required
                    description="Nos ayuda a mapear la red global de participantes"
                  />

                  {/* WhatsApp */}
                  <FormFieldComponent
                    name="whatsapp"
                    label="WhatsApp"
                    type="tel"
                    placeholder="+54 9 11 1234-5678"
                    description="Para recordatorios y envío rápido del enlace de acceso"
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
                        Registrarme a la Masterclass
                        <ArrowRight className="ml-2" size={20} />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 pt-6 border-t border-card-border">
                <p className="text-sm text-muted-foreground text-center">
                  Los campos marcados con * son obligatorios.<br />
                  Al enviar el formulario estás aceptando el tratamiento de mis datos personales para fines de organización y comunicación de este evento*
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