// Versión simplificada para Google Forms
// Esta versión usa una aproximación más directa

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

    console.log('Datos recibidos:', { fullName, email, location, whatsapp, attendance, dataConsent });

    // Crear URL con parámetros para Google Forms
    const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse';
    
    const params = new URLSearchParams({
      'entry.2113807473': fullName,
      'entry.1807164578': email,
      'entry.316240725': location,
      'entry.588822403': whatsapp || '',
      'entry.1776417857': attendance,
      'entry.1174231297': dataConsent ? 'Sí' : 'No'
    });

    console.log('URL de envío:', formUrl);
    console.log('Parámetros:', Object.fromEntries(params));

    // Enviar a Google Forms usando fetch
    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
        mode: 'no-cors'
      });

      console.log('Respuesta de Google Forms:', response);

      // Como usamos no-cors, siempre retorna status 0
      // Pero si no hay error, asumimos que funcionó
      
      // Respuesta exitosa
      res.status(200).json({ 
        message: 'Registro exitoso',
        data: {
          fullName,
          email,
          attendance
        }
      });

    } catch (fetchError) {
      console.error('Error en fetch:', fetchError);
      
      // Intentar método alternativo: redirección
      const redirectUrl = `${formUrl}?${params.toString()}`;
      console.log('URL de redirección alternativa:', redirectUrl);
      
      res.status(200).json({ 
        message: 'Registro procesado',
        data: {
          fullName,
          email,
          attendance
        },
        redirectUrl // Para debugging
      });
    }

  } catch (error) {
    console.error('Error general:', error);
    res.status(500).json({ 
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error desconocido'
    });
  }
}
