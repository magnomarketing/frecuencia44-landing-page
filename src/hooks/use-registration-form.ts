import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { registrationSchema, type RegistrationFormData } from '@/lib/validations'

export const useRegistrationForm = () => {
  const { toast } = useToast()

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      location: '',
      whatsapp: '',
      attendance: 'virtual',
      dataConsent: false
    },
    mode: 'onBlur', // Validar al perder el foco
    reValidateMode: 'onChange' // Re-validar al cambiar
  })

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      // Mostrar toast de carga
      toast({
        title: "Procesando registro...",
        description: "Por favor espera un momento",
      })

      // Enviar a Google Forms usando método alternativo
      const params = new URLSearchParams({
        'entry.2113807473': data.fullName,
        'entry.1807164578': data.email,
        'entry.316240725': data.location,
        'entry.588822403': data.whatsapp || '',
        'entry.1776417857': data.attendance,
        'entry.1174231297': data.dataConsent ? 'Sí' : 'No'
      });

      // URL del formulario (sin /u/0/ para evitar error 401)
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse';

      // Enviar usando imagen invisible (método más confiable)
      const img = new Image();
      img.src = `${formUrl}?${params.toString()}`;

      // Como usamos no-cors, siempre retorna status 0, pero funciona
      toast({
        title: "¡Registro exitoso! 🎉",
        description: "Revisa tu correo para el enlace de acceso",
      })

      // Reset form
      form.reset()

    } catch (error) {
      console.error('Error en el registro:', error)
      toast({
        title: "Error en el registro",
        description: "Por favor intenta nuevamente o contacta soporte",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = form.handleSubmit(onSubmit)

  return {
    form,
    handleSubmit,
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
    isDirty: form.formState.isDirty,
    watch: form.watch,
    reset: form.reset,
    setValue: form.setValue,
    getValues: form.getValues
  }
}
