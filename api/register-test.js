// Versión de prueba muy simple para diagnosticar problemas
export default async function handler(req, res) {
  console.log('=== INICIO DE REGISTRO ===');
  console.log('Método:', req.method);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, email, location, whatsapp, attendance, dataConsent } = req.body;

    console.log('Datos extraídos:', { fullName, email, location, whatsapp, attendance, dataConsent });

    // Validación básica
    if (!fullName || !email || !location || !attendance || !dataConsent) {
      console.log('❌ Validación fallida - campos faltantes');
      return res.status(400).json({ 
        message: 'Campos requeridos faltantes',
        received: { fullName, email, location, whatsapp, attendance, dataConsent }
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
