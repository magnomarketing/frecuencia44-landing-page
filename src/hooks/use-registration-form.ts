import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { registrationSchema, type RegistrationFormData } from '@/lib/validations'
import { currentFormIds, verifyFormIds, testFormSubmission, createTestForm, testWithCustomIds, updateFormIds, showQuickInstructions } from '@/utils/form-id-verifier'
import { useState } from 'react'

// Función simple para enviar email con Resend desde el frontend
const sendEmailWithResend = async (email: string, fullName: string) => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_DZpy1oRE_8LoyiY3yJjYox2bUebp4...', // Tu API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Frecuencia 44 <noreply@resend.dev>',
        to: email,
        subject: '🎯 Confirmación - Masterclass Frecuencia 44',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #00B9FE, #75AADB); color: white; padding: 30px; text-align: center; border-radius: 10px;">
              <h1>🎯 Masterclass Frecuencia 44</h1>
              <p>ALQUIMIA DE PACTOS Y REALIDADES</p>
            </div>
            
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #00B9FE;">¡Hola ${fullName}!</h2>
              <p>Tu registro ha sido confirmado exitosamente.</p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>📅 Detalles del Evento</h3>
                <p><strong>Fecha:</strong> Domingo 24 de agosto de 2025</p>
                <p><strong>Hora:</strong> 15:00 (hora Argentina)</p>
                <p><strong>Plataforma:</strong> Zoom</p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>🔗 Enlace de Zoom</h3>
                <a href="https://us02web.zoom.us/j/82510738233?pwd=alt0W3fzEAUrmRyY8bZiTtcFQU3bDV.1" 
                   style="display: inline-block; background: #00B9FE; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px;">
                   🎯 Unirse a la Masterclass
                </a>
                <p><strong>ID:</strong> 825 1073 8233</p>
                <p><strong>Código:</strong> 507559</p>
              </div>

              <p style="text-align: center; font-weight: bold; color: #00B9FE;">
                ¡Nos vemos en la transformación colectiva!
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export const useRegistrationForm = () => {
  const { toast } = useToast()
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [registeredUserName, setRegisteredUserName] = useState('')

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      location: '',
      whatsapp: ''
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
        [currentFormIds.whatsapp]: data.whatsapp || ''
      });

      // URL del formulario (confirmada por el usuario)
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse';

      // Debug: Mostrar URL de envío
      console.log('URL de envío real:', `${formUrl}?${params.toString()}`);

      // Enviar usando imagen invisible (método más confiable)
      const img = new Image();
      img.src = `${formUrl}?${params.toString()}`;

      // Enviar email de confirmación usando Resend desde el frontend
      try {
        console.log('📧 Enviando email con Resend desde frontend...');
        const emailResult = await sendEmailWithResend(data.email, data.fullName);
        
        if (emailResult.success) {
          console.log('✅ Email enviado exitosamente con Resend');
        } else {
          console.error('❌ Error enviando email con Resend:', emailResult.error);
        }
      } catch (emailError) {
        console.error('❌ Error enviando email con Resend:', emailError);
      }

      // Guardar el nombre del usuario registrado
      setRegisteredUserName(data.fullName)
      
      // Mostrar modal de éxito
      setShowSuccessModal(true)

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
    getValues: form.getValues,
    showSuccessModal,
    setShowSuccessModal,
    registeredUserName
  }
}
