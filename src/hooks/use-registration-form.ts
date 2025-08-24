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
        subject: 'Invitación: Masterclass Frecuencia 44 - ALQUIMIA DE PACTOS Y REALIDADES',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
            <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1e40af; margin: 0; font-size: 24px; font-weight: bold;">🎯 Masterclass Frecuencia 44</h1>
                <p style="color: #6b7280; margin: 10px 0 0 0; font-size: 16px;">ALQUIMIA DE PACTOS Y REALIDADES</p>
              </div>

              <!-- Invitation Header -->
              <div style="background: linear-gradient(135deg, #dbeafe, #e0e7ff); border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                <p style="color: #1e40af; font-size: 16px; margin: 0 0 15px 0;">
                  <strong>Equipo Samuel Valdivia</strong> le está invitando a una reunión de Zoom programada.
                </p>
                
                <h2 style="color: #1e40af; font-size: 20px; font-weight: bold; margin: 0 0 15px 0;">
                  Masterclass Frecuencia 44: ALQUIMIA DE PACTOS Y REALIDADES
                </h2>
                
                <p style="color: #1e40af; font-size: 16px; margin: 0;">
                  📅 <strong>Hora:</strong> 24 ago 2025 03:00 p. m. Buenos Aires, Georgetown
                </p>
              </div>

              <!-- Join Meeting Button -->
              <div style="text-align: center; margin: 25px 0;">
                <a href="https://us02web.zoom.us/j/82510738233?pwd=alt0W3fzEAUrmRyY8bZiTtcFQU3bDV.1" 
                   style="display: inline-block; background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                   🎥 Únase a la reunión de Zoom
                </a>
              </div>

              <!-- Meeting Details -->
              <div style="background: #f3f4f6; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <h3 style="color: #374151; font-size: 18px; margin: 0 0 15px 0;">📋 Información de la Reunión</h3>
                
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #6b7280; font-weight: 500;">ID de reunión:</span>
                  <span style="color: #111827; font-family: monospace; font-weight: bold;">825 1073 8233</span>
                </div>
                
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #6b7280; font-weight: 500;">Código de acceso:</span>
                  <span style="color: #111827; font-family: monospace; font-weight: bold;">507559</span>
                </div>
                
                <div style="text-align: center; margin-top: 15px;">
                  <a href="https://us02web.zoom.us/launch/edl?muid=a5c5a19d-8ef5-4267-9483-98ce289317ee" 
                     style="color: #2563eb; text-decoration: none; font-size: 14px;">
                     🔍 Ver información de la reunión con Zoom AI Companion
                  </a>
                </div>
              </div>

              <!-- Instructions -->
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                  💡 <strong>Instrucciones:</strong> Haz clic en "Únase a la reunión de Zoom" cuando sea la hora del evento. 
                  Te recomendamos conectarte 5 minutos antes para asegurar una experiencia fluida.
                </p>
              </div>

              <!-- Footer -->
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                  ¡Nos vemos en la transformación colectiva! 🌟
                </p>
                <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
                  Equipo Samuel Valdivia - Frecuencia 44
                </p>
              </div>
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
