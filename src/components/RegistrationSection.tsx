import { useState } from 'react';
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

interface FormErrors {
  fullName?: string;
  email?: string;
  location?: string;
  attendance?: string;
  dataConsent?: string;
}

const RegistrationSection = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    location: '',
    whatsapp: '',
    attendance: 'virtual',
    dataConsent: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case 'fullName':
        return !value.trim() ? 'El nombre completo es requerido' : undefined;
      case 'email':
        if (!value.trim()) return 'El correo electrónico es requerido';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Ingresa un correo electrónico válido';
        return undefined;
      case 'location':
        return !value.trim() ? 'País y ciudad son requeridos' : undefined;
      case 'attendance':
        return !value ? 'Selecciona una modalidad de asistencia' : undefined;
      case 'dataConsent':
        return !value ? 'Debes aceptar el tratamiento de datos para continuar' : undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof FormData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    return formData.fullName.trim() && 
           formData.email.trim() && 
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
           formData.location.trim() && 
           formData.attendance && 
           formData.dataConsent;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar a Google Forms (sin límites, gratis)
      const formDataToSend = new FormData();
      
      // IDs del formulario de Google Forms
      formDataToSend.append('entry.2113807473', formData.fullName);        // Nombre Completo
      formDataToSend.append('entry.1807164578', formData.email);           // Email
      formDataToSend.append('entry.316240725', formData.location);         // País y Ciudad
      formDataToSend.append('entry.588822403', formData.whatsapp || '');   // WhatsApp
      formDataToSend.append('entry.1776417857', formData.attendance);      // Modalidad
      formDataToSend.append('entry.1174231297', formData.dataConsent ? 'Sí' : 'No'); // Consentimiento
      
      const response = await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse', {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors' // Importante para evitar errores CORS
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Respuesta exitosa:', result);
        
        toast({
          title: "¡Registro exitoso!",
          description: "Revisa tu correo para el enlace de acceso",
        });
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          location: '',
          whatsapp: '',
          attendance: 'virtual',
          dataConsent: false
        });
        setErrors({});
        setTouched({});
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error en respuesta:', response.status, errorData);
        throw new Error(`Error ${response.status}: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error completo:', error);
      toast({
        title: "Error en el registro",
        description: error.message || "Por favor intenta nuevamente o contacta soporte",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
    <section id="registro" className="py-24 bg-background-light">
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
          {/* Registration Form */}
          <div>
            <Card className="p-8 bg-card border-card-border shadow-elegant">
              <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                Registro al Evento
              </h3>
              
                             <form onSubmit={handleSubmit} className="space-y-6">
                

                {/* Nombre Completo */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Nombre Completo *
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="Ingresa tu nombre completo"
                    className={`w-full ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Correo Electrónico *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    placeholder="ejemplo@correo.com"
                    className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  <p className="text-muted-foreground text-sm mt-1">
                    Te enviaremos el enlace de acceso a esta dirección
                  </p>
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* País y Ciudad */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-2">
                    País y Ciudad *
                  </label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    onBlur={() => handleBlur('location')}
                    placeholder="País, Ciudad"
                    className={`w-full ${errors.location ? 'border-red-500' : ''}`}
                  />
                  <p className="text-muted-foreground text-sm mt-1">
                    Nos ayuda a mapear la red de participantes
                  </p>
                  {errors.location && (
                    <p className="text-red-600 text-sm mt-1">{errors.location}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground mb-2">
                    WhatsApp
                  </label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    placeholder="+54 9 11 1234-5678"
                    className="w-full"
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
                        name="attendance"
                        value="virtual"
                        checked={formData.attendance === 'virtual'}
                        onChange={(e) => handleChange('attendance', e.target.value)}
                        onBlur={() => handleBlur('attendance')}
                        className="text-accent focus:ring-accent"
                      />
                      <span className="text-foreground">Virtual</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="attendance"
                        value="presencial"
                        checked={formData.attendance === 'presencial'}
                        onChange={(e) => handleChange('attendance', e.target.value)}
                        onBlur={() => handleBlur('attendance')}
                        className="text-accent focus:ring-accent"
                      />
                      <span className="text-foreground">Presencial en Tucumán</span>
                    </label>
                  </div>
                  {errors.attendance && (
                    <p className="text-red-600 text-sm mt-1">{errors.attendance}</p>
                  )}
                </div>

                {/* Consentimiento de Datos */}
                <div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="dataConsent"
                      checked={formData.dataConsent}
                      onChange={(e) => handleChange('dataConsent', e.target.checked)}
                      onBlur={() => handleBlur('dataConsent')}
                      className="text-accent focus:ring-accent mt-1"
                    />
                    <span className="text-sm text-foreground">
                      Autorizo el tratamiento de mis datos personales para fines de organización y comunicación de este evento *
                    </span>
                  </label>
                  {errors.dataConsent && (
                    <p className="text-red-600 text-sm mt-1">{errors.dataConsent}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting || !isFormValid()}
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