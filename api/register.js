// Vercel Function para manejar registros del formulario
// Ubicación: api/register.js

// Google Forms - Opción más fácil y segura
// No requiere autenticación compleja, solo IDs de campos

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, email, location, whatsapp, attendance, dataConsent } = req.body;

    // Validación básica
    if (!fullName || !email || !location || !attendance || !dataConsent) {
      return res.status(400).json({ message: 'Campos requeridos faltantes' });
    }

    const registrationData = {
      fullName,
      email,
      location,
      whatsapp: whatsapp || '',
      attendance,
      dataConsent,
      timestamp: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    };

    // ===== GOOGLE FORMS - OPCIÓN MÁS FÁCIL =====
    async function saveToGoogleForms(data) {
      const formData = new FormData();
      
      // IMPORTANTE: Reemplaza estos IDs con los reales de tu Google Form
      // Para obtener los IDs: Inspecciona el formulario y busca "entry."
      formData.append('entry.1234567890', data.fullName);        // Nombre Completo
      formData.append('entry.0987654321', data.email);           // Email
      formData.append('entry.1111111111', data.location);        // País y Ciudad
      formData.append('entry.2222222222', data.whatsapp || '');  // WhatsApp
      formData.append('entry.3333333333', data.attendance);      // Modalidad
      formData.append('entry.4444444444', data.dataConsent ? 'Sí' : 'No'); // Consentimiento
      
      // URL del formulario (reemplaza con tu URL real)
      const formUrl = process.env.GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/TU_FORM_ID/formResponse';
      
      try {
        const response = await fetch(formUrl, {
          method: 'POST',
          body: formData,
          mode: 'no-cors', // Importante para evitar errores CORS
        });
        
        // Con mode: 'no-cors', siempre retorna status 0, pero funciona
        return { success: true };
      } catch (error) {
        console.error('Error enviando a Google Forms:', error);
        throw error;
      }
    }

    // ===== ENVIAR EMAIL DE NOTIFICACIÓN =====
    async function sendEmailNotification(data) {
      // Usando Resend (gratuito hasta 3,000 emails/mes)
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Frecuencia 44 <noreply@frecuencia44.com>',
          to: [process.env.ADMIN_EMAIL || 'tu@email.com'],
          subject: '🎉 Nuevo registro - Evento Frecuencia 44',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #2563eb;">🎉 Nuevo registro recibido</h2>
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>👤 Nombre:</strong> ${data.fullName}</p>
                <p><strong>📧 Email:</strong> ${data.email}</p>
                <p><strong>🌍 Ubicación:</strong> ${data.location}</p>
                <p><strong>📱 WhatsApp:</strong> ${data.whatsapp || 'No proporcionado'}</p>
                <p><strong>🎯 Modalidad:</strong> ${data.attendance === 'virtual' ? 'Virtual' : 'Presencial en Tucumán'}</p>
                <p><strong>✅ Consentimiento:</strong> ${data.dataConsent ? 'Sí' : 'No'}</p>
                <p><strong>📅 Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
              </div>
              <p style="color: #64748b; font-size: 14px;">
                Este es un registro automático del formulario de Frecuencia 44.
              </p>
            </div>
          `
        })
      });

      if (!resendResponse.ok) {
        console.error('Error enviando email:', await resendResponse.text());
      }
      
      return resendResponse;
    }

    // ===== EJECUTAR GUARDADO =====
    
    // 1. Guardar en Google Forms
    await saveToGoogleForms(registrationData);
    
    // 2. Enviar notificación por email (opcional)
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      try {
        await sendEmailNotification(registrationData);
      } catch (emailError) {
        console.error('Error enviando email:', emailError);
        // No fallar el registro si el email falla
      }
    }

    // Respuesta exitosa
    res.status(200).json({ 
      message: 'Registro exitoso',
      data: {
        fullName: registrationData.fullName,
        email: registrationData.email,
        attendance: registrationData.attendance
      }
    });

  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error desconocido'
    });
  }
}
