import { useState } from 'react';
import { Calendar, Clock, Users, Gift, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { RegistrationService, RegistrationData } from '@/services/registrationService';

const RegistrationSection = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    countryCity: '',
    whatsapp: '',
    virtualAttendance: false,
    inPersonAttendance: false,
    dataConsent: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateField = (field: keyof RegistrationData, value: string | boolean) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'fullName':
        if (!value || (typeof value === 'string' && value.trim().length < 5)) {
          newErrors.fullName = 'El nombre completo debe tener al menos 5 caracteres';
        } else if (typeof value === 'string' && value.trim().split(/\s+/).length < 2) {
          newErrors.fullName = 'Debes ingresar nombre y apellido';
        } else {
          delete newErrors.fullName;
        }
        break;
        
      case 'email':
        if (!value || (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
          newErrors.email = 'Ingresa un email válido';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'countryCity':
        if (!value || (typeof value === 'string' && value.trim().length < 3)) {
          newErrors.countryCity = 'Ingresa tu país y ciudad';
        } else {
          delete newErrors.countryCity;
        }
        break;
        
      case 'whatsapp':
        if (value && typeof value === 'string' && !RegistrationService.validateWhatsApp(value)) {
          newErrors.whatsapp = 'Ingresa un número de WhatsApp válido';
        } else {
          delete newErrors.whatsapp;
        }
        break;
        
      case 'virtualAttendance':
      case 'inPersonAttendance':
        // Removida la validación obligatoria - ahora es opcional
        delete newErrors.virtualAttendance;
        delete newErrors.inPersonAttendance;
        break;
        
      case 'dataConsent':
        if (!value) {
          newErrors.dataConsent = 'Debes aceptar el consentimiento de datos';
        } else {
          delete newErrors.dataConsent;
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof RegistrationData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Validar en tiempo real
    validateField(field, value);
  };

  const validateForm = (): boolean => {
    const validations = [
      validateField('fullName', formData.fullName),
      validateField('email', formData.email),
      validateField('countryCity', formData.countryCity),
      validateField('whatsapp', formData.whatsapp),
      validateField('dataConsent', formData.dataConsent)
    ];
    
    return validations.every(valid => valid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Error de validación",
        description: "Por favor, corrige los errores en el formulario.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let response;
      
      // En desarrollo, usar simulación; en producción, usar el servicio real
      if (import.meta.env.DEV) {
        response = await RegistrationService.simulateRegistration(formData);
      } else {
        response = await RegistrationService.submitRegistration(formData);
      }
      
      if (response.success) {
        toast({
          title: "¡Registro Exitoso!",
          description: response.message,
        });
        
        // Limpiar formulario
        setFormData({
          fullName: '',
          email: '',
          countryCity: '',
          whatsapp: '',
          virtualAttendance: false,
          inPersonAttendance: false,
          dataConsent: false
        });
        setErrors({});
        
        // Scroll al top del formulario
        const formElement = document.getElementById('registro');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        toast({
          title: "Error en el registro",
          description: response.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error inesperado. Por favor, intenta nuevamente.",
        variant: "destructive"
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
      icon: <Users className="text-accent" size={24} />,
      title: "Modalidad",
      value: "Virtual y Presencial"
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
                {/* Nombre Completo */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Tu nombre completo"
                    className={`w-full ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Correo Electrónico */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Correo electrónico <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="tu@email.com"
                    className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Te enviaremos el enlace de acceso aquí.
                  </p>
                </div>

                {/* País / Ciudad */}
                <div>
                  <label htmlFor="countryCity" className="block text-sm font-medium text-foreground mb-2">
                    País / Ciudad <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="countryCity"
                    type="text"
                    value={formData.countryCity}
                    onChange={(e) => handleInputChange('countryCity', e.target.value)}
                    placeholder="Ej: Argentina, Buenos Aires"
                    className={`w-full ${errors.countryCity ? 'border-red-500' : ''}`}
                  />
                  {errors.countryCity && (
                    <p className="text-red-500 text-sm mt-1">{errors.countryCity}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Para mapear la red de participantes.
                  </p>
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-foreground mb-2">
                    WhatsApp <span className="text-muted-foreground">(opcional)</span>
                  </label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="+54 9 11 1234-5678"
                    className={`w-full ${errors.whatsapp ? 'border-red-500' : ''}`}
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Para recordatorio y envío rápido del acceso.
                  </p>
                </div>

                {/* Modalidad de Asistencia */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Modalidad de asistencia para el evento en Tucumán, 27 de septiembre <span className="text-muted-foreground">(opcional)</span>
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="virtualAttendance"
                        checked={formData.virtualAttendance}
                        onCheckedChange={(checked) => handleInputChange('virtualAttendance', checked as boolean)}
                      />
                      <Label htmlFor="virtualAttendance" className="text-sm font-normal">
                        Virtual
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="inPersonAttendance"
                        checked={formData.inPersonAttendance}
                        onCheckedChange={(checked) => handleInputChange('inPersonAttendance', checked as boolean)}
                      />
                      <Label htmlFor="inPersonAttendance" className="text-sm font-normal">
                        Presencial Tucumán
                      </Label>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Puedes seleccionar una, ambas o ninguna modalidad según tu preferencia.
                  </p>
                </div>

                {/* Consentimiento de Datos */}
                <div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="dataConsent"
                      checked={formData.dataConsent}
                      onCheckedChange={(checked) => handleInputChange('dataConsent', checked as boolean)}
                      className="mt-1"
                    />
                    <Label htmlFor="dataConsent" className="text-sm font-normal leading-relaxed">
                      <span className="text-red-500">*</span> Autorizo el tratamiento de mis datos para fines de organización y comunicación de este evento.
                    </Label>
                  </div>
                  {errors.dataConsent && (
                    <p className="text-red-500 text-sm mt-1">{errors.dataConsent}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registrando...
                    </>
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
                  Los campos marcados con <span className="text-red-500">*</span> son obligatorios.
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