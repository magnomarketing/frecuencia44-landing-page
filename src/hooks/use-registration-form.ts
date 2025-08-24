import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { registrationSchema, type RegistrationFormData } from '@/lib/validations'
import { currentFormIds, verifyFormIds, testFormSubmission, createTestForm, testWithCustomIds, updateFormIds, showQuickInstructions } from '@/utils/form-id-verifier'
import { useState } from 'react'

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

      // Enviar email de confirmación con enlace de Zoom
      try {
        // Usar Resend directamente desde el frontend
        const emailData = {
          from: 'Frecuencia 44 <info@argentinalibre.org>',
          to: data.email,
          subject: '🎯 ¡Confirmación de Registro - Masterclass Frecuencia 44!',
          html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Confirmación de Registro - Masterclass Frecuencia 44</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #00B9FE, #75AADB); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .zoom-section { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00B9FE; }
                .button { display: inline-block; background: #00B9FE; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
                .details { background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 style="margin: 0; font-size: 28px;">🎯 Masterclass Frecuencia 44</h1>
                  <p style="margin: 10px 0 0 0; font-size: 18px;">ALQUIMIA DE PACTOS Y REALIDADES</p>
                </div>
                
                <div class="content">
                  <h2 style="color: #00B9FE; margin-top: 0;">¡Hola ${data.fullName}!</h2>
                  
                  <p>Tu registro ha sido confirmado exitosamente para la <strong>Masterclass Frecuencia 44</strong>.</p>
                  
                  <div class="zoom-section">
                    <h3 style="color: #333; margin-top: 0;">📅 Detalles del Evento</h3>
                    <div class="details">
                      <p><strong>📅 Fecha:</strong> Domingo 24 de agosto de 2025</p>
                      <p><strong>🕐 Hora:</strong> 15:00 (hora Argentina)</p>
                      <p><strong>🌐 Plataforma:</strong> Zoom</p>
                      <p><strong>👥 Organizador:</strong> Samuel Valdivia</p>
                    </div>
                  </div>

                  <div class="zoom-section">
                    <h3 style="color: #333; margin-top: 0;">🔗 Enlace de Zoom</h3>
                    <p>Haz clic en el botón para unirte a la reunión:</p>
                    <a href="https://us02web.zoom.us/j/82510738233?pwd=alt0W3fzEAUrmRyY8bZiTtcFQU3bDV.1" class="button">🎯 Unirse a la Masterclass</a>
                    
                    <div class="details">
                      <p><strong>ID de reunión:</strong> 825 1073 8233</p>
                      <p><strong>Código de acceso:</strong> 507559</p>
                    </div>
                  </div>

                  <div class="zoom-section">
                    <h3 style="color: #333; margin-top: 0;">📋 Instrucciones</h3>
                    <ul>
                      <li>El enlace estará activo 15 minutos antes del evento</li>
                      <li>Te recomendamos conectarte 5 minutos antes</li>
                      <li>Ten tu cámara y micrófono listos</li>
                      <li>Encuentra un lugar tranquilo para la experiencia</li>
                    </ul>
                  </div>

                  <div class="zoom-section">
                    <h3 style="color: #333; margin-top: 0;">🌟 Lo que vivirás</h3>
                    <ul>
                      <li>Fortalecimiento del campo áurico</li>
                      <li>Manifestación con Llama Violeta</li>
                      <li>Coherencia grupal para la transformación</li>
                      <li>Experiencia de unidad, alegría y trascendencia</li>
                    </ul>
                  </div>

                  <p style="text-align: center; font-weight: bold; color: #00B9FE;">
                    ¡Nos vemos en la transformación colectiva!
                  </p>
                </div>
                
                <div class="footer">
                  <p>Frecuencia 44 - Transformación Colectiva hacia una Argentina Libre</p>
                  <p>Si tienes alguna pregunta, responde a este email</p>
                </div>
              </div>
            </body>
            </html>
          `
        };

        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer re_DZpy1oRE_8LoyiY3yJjYox2bUebp4UJdo`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData)
        });

        if (!emailResponse.ok) {
          console.error('Error sending confirmation email:', await emailResponse.text());
        } else {
          console.log('Email enviado exitosamente');
        }
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
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
