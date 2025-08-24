import { Resend } from 'resend';

export default async function handler(request) {
  // Configurar CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Manejar preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    console.log('🔍 Verificando configuración de Resend...');
    
    // Verificar que la API key esté configurada
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY no está configurada');
      return new Response(JSON.stringify({ 
        error: 'RESEND_API_KEY no está configurada',
        message: 'Verifica las variables de entorno en Vercel',
        timestamp: new Date().toISOString()
      }), { status: 500, headers });
    }

    // Verificar que las variables de email estén configuradas
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'info@festivalargentinalibre.org';
    const fromName = process.env.RESEND_FROM_NAME || 'Frecuencia 44';

    console.log('API Key configurada:', process.env.RESEND_API_KEY ? 'SÍ' : 'NO');
    console.log('From Email:', fromEmail);
    console.log('From Name:', fromName);

    // Inicializar Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Enviar email sin esperar respuesta para evitar timeout
    console.log('📧 Enviando email de prueba...');
    resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: ['ro@mango.mx'], // Email de prueba
      subject: '🧪 Verificación de Resend - Frecuencia 44',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00B9FE;">✅ Configuración Correcta</h1>
          <p>Si ves este email, la configuración de Resend está funcionando correctamente.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>From:</strong> ${fromName} &lt;${fromEmail}&gt;</p>
        </div>
      `,
    }).catch(error => {
      console.error('❌ Error enviando email:', error);
    });

    console.log('✅ Email enviado (sin esperar respuesta)');
    return new Response(JSON.stringify({ 
      success: true,
      message: 'Configuración de Resend correcta - Email enviado',
      fromEmail: fromEmail,
      fromName: fromName,
      timestamp: new Date().toISOString()
    }), { status: 200, headers });

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

    return new Response(JSON.stringify({ 
      error: errorMessage,
      details: errorDetails,
      code: error.code || 'UNKNOWN',
      timestamp: new Date().toISOString()
    }), { status: 500, headers });
  }
}
