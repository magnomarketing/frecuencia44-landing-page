export default async function handler(req, res) {
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
      return res.status(500).json({
        error: 'Error importando Resend',
        details: importError.message,
        timestamp: new Date().toISOString()
      });
    }
    
    // Verificar que la API key esté configurada
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        error: 'RESEND_API_KEY no está configurada',
        timestamp: new Date().toISOString()
      });
    }
    
    // Intentar inicializar Resend
    let resend;
    try {
      resend = new Resend(process.env.RESEND_API_KEY);
      console.log('✅ Resend inicializado correctamente');
    } catch (initError) {
      console.error('❌ Error inicializando Resend:', initError);
      return res.status(500).json({
        error: 'Error inicializando Resend',
        details: initError.message,
        timestamp: new Date().toISOString()
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Resend configurado correctamente',
      fromEmail: process.env.RESEND_FROM_EMAIL,
      fromName: process.env.RESEND_FROM_NAME,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error general:', error);
    return res.status(500).json({
      error: 'Error general',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
