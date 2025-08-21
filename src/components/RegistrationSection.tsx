import { useForm } from 'react-hook-form';
import { Calendar, Clock, Users, Gift, CheckCircle, ArrowRight, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  fullName: string;
  email: string;
  location: string;
  whatsapp?: string;
  attendance: 'virtual' | 'presencial';
  dataConsent: boolean;
}

const RegistrationSection = () => {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      location: '',
      whatsapp: '',
      attendance: 'virtual',
      dataConsent: false
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Enviar a Google Forms (sin límites, gratis)
      const formDataToSend = new FormData();
      
      // IDs del formulario de Google Forms
      formDataToSend.append('entry.2113807473', data.fullName);        // Nombre Completo
      formDataToSend.append('entry.1807164578', data.email);           // Email
      formDataToSend.append('entry.316240725', data.location);         // País y Ciudad
      formDataToSend.append('entry.588822403', data.whatsapp || '');   // WhatsApp
      formDataToSend.append('entry.1776417857', data.attendance);      // Modalidad
      formDataToSend.append('entry.1174231297', data.dataConsent ? 'Sí' : 'No'); // Consentimiento
      
      const response = await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse', {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors' // Importante para evitar errores CORS
      });

      // Como usamos no-cors, siempre retorna status 0, pero funciona
      toast({
        title: "¡Registro exitoso!",
        description: "Revisa tu correo para el enlace de acceso",
      });

      // Reset form
      reset();

    } catch (error) {
      console.error('Error en el registro:', error);
      toast({
        title: "Error en el registro",
        description: "Por favor intenta nuevamente o contacta soporte",
        variant: "destructive",
      });
    }
  };

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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nombre Completo */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Nombre Completo *
                  </label>
                  <Input
                    id="fullName"
                    {...register('fullName', { 
                      required: 'El nombre completo es requerido',
                      minLength: { value: 2, message: 'El nombre debe tener al menos 2 caracteres' }
                    })}
                    placeholder="Ingresa tu nombre completo"
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Correo Electrónico *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email', { 
                      required: 'El correo electrónico es requerido',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Ingresa un correo electrónico válido'
                      }
                    })}
                    placeholder="ejemplo@correo.com"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  <p className="text-muted-foreground text-sm mt-1">
                    Te enviaremos el enlace de acceso a esta dirección
                  </p>
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* País y Ciudad */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                    País y Ciudad *
                  </label>
                  <Input
                    id="location"
                    {...register('location', { 
                      required: 'País y ciudad son requeridos',
                      minLength: { value: 2, message: 'Ingresa al menos 2 caracteres' }
                    })}
                    placeholder="País, Ciudad"
                    className={errors.location ? 'border-red-500' : ''}
                  />
                  <p className="text-muted-foreground text-sm mt-1">
                    Nos ayuda a mapear la red de participantes
                  </p>
                  {errors.location && (
                    <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground mb-2">
                    WhatsApp
                  </label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    {...register('whatsapp')}
                    placeholder="+54 9 11 1234-5678"
                  />
                  <p className="text-muted-foreground text-sm mt-1">
                    Para recordatorios y envío rápido del enlace de acceso
                  </p>
                </div>

                {/* Modalidad de Asistencia */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    ¿Cómo planeas asistir al evento del 27 de septiembre? *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="virtual"
                        {...register('attendance', { 
                          required: 'Selecciona una modalidad de asistencia' 
                        })}
                        className="text-accent focus:ring-accent"
                      />
                      <span className="text-foreground">Virtual</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="presencial"
                        {...register('attendance')}
                        className="text-accent focus:ring-accent"
                      />
                      <span className="text-foreground">Presencial en Tucumán</span>
                    </label>
                  </div>
                  {errors.attendance && (
                    <p className="text-red-600 text-sm mt-1">{errors.attendance.message}</p>
                  )}
                </div>

                {/* Consentimiento de Datos */}
                <div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('dataConsent', { 
                        required: 'Debes aceptar el tratamiento de datos para continuar' 
                      })}
                      className="text-accent focus:ring-accent mt-1"
                    />
                    <span className="text-sm text-foreground">
                      Autorizo el tratamiento de mis datos personales para fines de organización y comunicación de este evento *
                    </span>
                  </label>
                  {errors.dataConsent && (
                    <p className="text-red-600 text-sm mt-1">{errors.dataConsent.message}</p>
                  )}
                </div>

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