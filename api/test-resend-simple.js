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
    console.log('🔍 Iniciando prueba simple de Resend...');
    
    // Verificar variables de entorno
    console.log('RESEND_API_KEY configurada:', process.env.RESEND_API_KEY ? 'SÍ' : 'NO');
    console.log('RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL);
    console.log('RESEND_FROM_NAME:', process.env.RESEND_FROM_NAME);
    
    // Intentar importar Resend
    let Resend;
    try {
      const resendModule = await import('resend');
      Resend = resendModule.Resend;
      console.log('✅ Resend importado correctamente');
    } catch (importError) {
      console.error('❌ Error importando Resend:', importError);
      return new Response(JSON.stringify({
        error: 'Error importando Resend',
        details: importError.message,
        timestamp: new Date().toISOString()
      }), { status: 500, headers });
    }
    
    // Verificar que la API key esté configurada
    if (!process.env.RESEND_API_KEY) {
      return new Response(JSON.stringify({
        error: 'RESEND_API_KEY no está configurada',
        timestamp: new Date().toISOString()
      }), { status: 500, headers });
    }
    
    // Intentar inicializar Resend
    let resend;
    try {
      resend = new Resend(process.env.RESEND_API_KEY);
      console.log('✅ Resend inicializado correctamente');
    } catch (initError) {
      console.error('❌ Error inicializando Resend:', initError);
      return new Response(JSON.stringify({
        error: 'Error inicializando Resend',
        details: initError.message,
        timestamp: new Date().toISOString()
      }), { status: 500, headers });
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Resend configurado correctamente',
      fromEmail: process.env.RESEND_FROM_EMAIL,
      fromName: process.env.RESEND_FROM_NAME,
      timestamp: new Date().toISOString()
    }), { status: 200, headers });
    
  } catch (error) {
    console.error('❌ Error general:', error);
    return new Response(JSON.stringify({
      error: 'Error general',
      details: error.message,
      timestamp: new Date().toISOString()
    }), { status: 500, headers });
  }
}
