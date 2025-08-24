import { Resend } from 'resend';

export default async function handler(req, res) {
  // Configurar CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('🔍 Verificando configuración de Resend...');
    
    // Verificar que la API key esté configurada
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY no está configurada');
      return res.status(500).json({ 
        error: 'RESEND_API_KEY no está configurada',
        message: 'Verifica las variables de entorno en Vercel',
        timestamp: new Date().toISOString()
      });
    }

    // Verificar que las variables de email estén configuradas
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'info@argentinalibre.org';
    const fromName = process.env.RESEND_FROM_NAME || 'Frecuencia 44';

    console.log('API Key configurada:', process.env.RESEND_API_KEY ? 'SÍ' : 'NO');
    console.log('From Email:', fromEmail);
    console.log('From Name:', fromName);

    // Inicializar Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Intentar enviar un email de prueba
    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: ['test@example.com'], // Email de prueba
      subject: '🧪 Verificación de Resend - Frecuencia 44',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00B9FE;">✅ Configuración Correcta</h1>
          <p>Si ves este email, la configuración de Resend está funcionando correctamente.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>From:</strong> ${fromName} &lt;${fromEmail}&gt;</p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Error de Resend:', error);
      return res.status(500).json({ 
        error: 'Error de Resend',
        details: error.message,
        code: error.statusCode || 'UNKNOWN',
        timestamp: new Date().toISOString()
      });
    }

    console.log('✅ Configuración correcta:', data);
    return res.status(200).json({ 
      success: true,
      message: 'Configuración de Resend correcta',
      data: data,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error general:', error);
    
    // Manejar diferentes tipos de errores
    let errorMessage = 'Error interno del servidor';
    let errorDetails = error.message;

    if (error.code === 'ENOTFOUND') {
      errorMessage = 'Error de conectividad de red';
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Conexión rechazada';
    } else if (error.name === 'TypeError') {
      errorMessage = 'Error de tipo en la configuración';
    }

    return res.status(500).json({ 
      error: errorMessage,
      details: errorDetails,
      code: error.code || 'UNKNOWN',
      timestamp: new Date().toISOString()
    });
  }
}
