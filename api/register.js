// Vercel Function para manejar registros del formulario
export default function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Permitir GET para pruebas
  if (req.method === 'GET') {
    return res.status(200).json({ 
      message: 'API funcionando correctamente',
      method: req.method,
      timestamp: new Date().toISOString()
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      message: 'Method not allowed',
      allowedMethods: ['GET', 'POST'],
      receivedMethod: req.method
    });
  }

  try {
    const { fullName, email, location, whatsapp, attendance, dataConsent } = req.body;

    // Validación básica
    if (!fullName || !email || !location || !attendance || !dataConsent) {
      return res.status(400).json({ 
        message: 'Campos requeridos faltantes',
        received: { fullName, email, location, whatsapp, attendance, dataConsent },
        required: ['fullName', 'email', 'location', 'attendance', 'dataConsent']
      });
    }

    // Simular éxito por ahora para probar
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
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}
