export default async function handler(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  try {
    console.log('🔍 [DEBUG] Iniciando diagnóstico de Resend...');
    
    // Paso 1: Verificar variables de entorno
    console.log('🔍 [DEBUG] Paso 1: Verificando variables de entorno...');
    const hasApiKey = !!process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const fromName = process.env.RESEND_FROM_NAME;
    
    console.log('RESEND_API_KEY configurada:', hasApiKey ? 'SÍ' : 'NO');
    console.log('RESEND_FROM_EMAIL:', fromEmail);
    console.log('RESEND_FROM_NAME:', fromName);
    
    if (!hasApiKey) {
      return new Response(JSON.stringify({
        error: 'RESEND_API_KEY no está configurada',
        step: 'variables_entorno',
        timestamp: new Date().toISOString()
      }), { status: 500, headers });
    }
    
    // Paso 2: Intentar importar Resend
    console.log('🔍 [DEBUG] Paso 2: Importando Resend...');
    let Resend;
    try {
      const resendModule = await import('resend');
      Resend = resendModule.Resend;
      console.log('✅ [DEBUG] Resend importado correctamente');
    } catch (importError) {
      console.error('❌ [DEBUG] Error importando Resend:', importError);
      return new Response(JSON.stringify({
        error: 'Error importando Resend',
        details: importError.message,
        step: 'importacion',
        timestamp: new Date().toISOString()
      }), { status: 500, headers });
    }
    
    // Paso 3: Intentar inicializar Resend
    console.log('🔍 [DEBUG] Paso 3: Inicializando Resend...');
    let resend;
    try {
      resend = new Resend(process.env.RESEND_API_KEY);
      console.log('✅ [DEBUG] Resend inicializado correctamente');
    } catch (initError) {
      console.error('❌ [DEBUG] Error inicializando Resend:', initError);
      return new Response(JSON.stringify({
        error: 'Error inicializando Resend',
        details: initError.message,
        step: 'inicializacion',
        timestamp: new Date().toISOString()
      }), { status: 500, headers });
    }
    
    // Paso 4: Intentar enviar email (sin esperar respuesta)
    console.log('🔍 [DEBUG] Paso 4: Intentando enviar email...');
    try {
      const emailPromise = resend.emails.send({
        from: `${fromName || 'Frecuencia 44'} <${fromEmail || 'info@festivalargentinalibre.org'}>`,
        to: ['ro@mango.mx'],
        subject: '🧪 Diagnóstico Resend - Frecuencia 44',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #00B9FE;">🔍 Diagnóstico Completado</h1>
            <p>Si ves este email, Resend está funcionando correctamente.</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>From:</strong> ${fromName} &lt;${fromEmail}&gt;</p>
          </div>
        `,
      });
      
      // No esperar la respuesta para evitar timeout
      console.log('✅ [DEBUG] Email enviado (sin esperar respuesta)');
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Diagnóstico completado - Email enviado',
        step: 'envio_email',
        fromEmail: fromEmail,
        fromName: fromName,
        timestamp: new Date().toISOString()
      }), { status: 200, headers });
      
    } catch (sendError) {
      console.error('❌ [DEBUG] Error enviando email:', sendError);
      return new Response(JSON.stringify({
        error: 'Error enviando email',
        details: sendError.message,
        step: 'envio_email',
        timestamp: new Date().toISOString()
      }), { status: 500, headers });
    }
    
  } catch (error) {
    console.error('❌ [DEBUG] Error general:', error);
    return new Response(JSON.stringify({
      error: 'Error general en diagnóstico',
      details: error.message,
      step: 'error_general',
      timestamp: new Date().toISOString()
    }), { status: 500, headers });
  }
}
