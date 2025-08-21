// Vercel Function para manejar registros del formulario
export default async function handler(req, res) {
  console.log('=== INICIO DE REGISTRO ===');
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    console.log('❌ Método no permitido:', req.method);
    return res.status(405).json({ 
      message: 'Method not allowed',
      allowedMethods: ['POST'],
      receivedMethod: req.method
    });
  }

  try {
    const { fullName, email, location, whatsapp, attendance, dataConsent } = req.body;

    console.log('Datos extraídos:', { fullName, email, location, whatsapp, attendance, dataConsent });

    // Validación básica
    if (!fullName || !email || !location || !attendance || !dataConsent) {
      console.log('❌ Validación fallida - campos faltantes');
      return res.status(400).json({ 
        message: 'Campos requeridos faltantes',
        received: { fullName, email, location, whatsapp, attendance, dataConsent },
        required: ['fullName', 'email', 'location', 'attendance', 'dataConsent']
      });
    }

    console.log('✅ Validación exitosa');

    // Simular éxito por ahora para probar
    console.log('✅ Simulando registro exitoso');
    
    res.status(200).json({ 
      message: 'Registro exitoso (simulado)',
      data: {
        fullName,
        email,
        attendance
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error en handler:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
