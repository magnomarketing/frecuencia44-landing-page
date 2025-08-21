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

      // Enviar a Google Forms
      const formDataToSend = new FormData()
      
      // IDs del formulario de Google Forms
      formDataToSend.append('entry.2113807473', data.fullName)
      formDataToSend.append('entry.1807164578', data.email)
      formDataToSend.append('entry.316240725', data.location)
      formDataToSend.append('entry.588822403', data.whatsapp || '')
      formDataToSend.append('entry.1776417857', data.attendance)
      formDataToSend.append('entry.1174231297', data.dataConsent ? 'Sí' : 'No')
      
      const response = await fetch(
        'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse',
        {
          method: 'POST',
          body: formDataToSend,
          mode: 'no-cors'
        }
      )

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
