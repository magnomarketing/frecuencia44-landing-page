import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { registrationSchema, type RegistrationFormData } from '@/lib/validations'
import { currentFormIds, verifyFormIds, testFormSubmission, createTestForm, testWithCustomIds, updateFormIds, showQuickInstructions } from '@/utils/form-id-verifier'

export const useRegistrationForm = () => {
  const { toast } = useToast()

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      location: '',
      whatsapp: '',


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

      // Debug: Mostrar instrucciones rápidas
      showQuickInstructions();
      
      // Debug: Verificar IDs del formulario
      verifyFormIds();
      
      // Debug: Crear datos de prueba
      const testData = createTestForm();
      
      // Debug: Probar envío con datos de prueba
      testFormSubmission(testData);
      
      // Enviar a Google Forms usando método alternativo
      const params = new URLSearchParams({
        [currentFormIds.fullName]: data.fullName,
        [currentFormIds.email]: data.email,
        [currentFormIds.location]: data.location,
        [currentFormIds.whatsapp]: data.whatsapp || '',


      });

      // URL del formulario (confirmada por el usuario)
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse';

      // Debug: Mostrar URL de envío
      console.log('URL de envío real:', `${formUrl}?${params.toString()}`);

      // Enviar usando imagen invisible (método más confiable)
      const img = new Image();
      img.src = `${formUrl}?${params.toString()}`;

      // Como usamos no-cors, siempre retorna status 0, pero funciona
      toast({
        title: "🎉 ¡Registro Exitoso!",
        description: "Confirmamos tu registro. Estarás recibiendo en los próximos días el enlace de la masterclass en tu correo electrónico.",
        variant: "success",
        duration: 6000,
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
