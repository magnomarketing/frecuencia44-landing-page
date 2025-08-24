import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  try {
    console.log('🔍 Verificando configuración de Resend...');
    console.log('API Key configurada:', process.env.RESEND_API_KEY ? 'SÍ' : 'NO');
    console.log('From Email:', process.env.RESEND_FROM_EMAIL);
    console.log('From Name:', process.env.RESEND_FROM_NAME);

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ 
        error: 'RESEND_API_KEY no está configurada',
        message: 'Verifica las variables de entorno en Vercel'
      });
    }

    // Intentar enviar un email de prueba
    const { data, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME || 'Test'} <${process.env.RESEND_FROM_EMAIL || 'info@argentinalibre.org'}>`,
      to: ['test@example.com'], // Email de prueba
      subject: '🧪 Verificación de Resend',
      html: '<h1>Prueba de configuración</h1><p>Si ves este email, la configuración está correcta.</p>',
    });

    if (error) {
      console.error('❌ Error de Resend:', error);
      return res.status(500).json({ 
        error: 'Error de Resend',
        details: error.message,
        code: error.statusCode
      });
    }

    console.log('✅ Configuración correcta:', data);
    return res.status(200).json({ 
      success: true,
      message: 'Configuración de Resend correcta',
      data: data
    });

  } catch (error) {
    console.error('❌ Error general:', error);
    return res.status(500).json({ 
      error: 'Error general',
      message: error.message
    });
  }
}
