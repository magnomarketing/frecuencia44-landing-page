import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('🔍 Variables de entorno:');
    console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Configurada' : 'NO CONFIGURADA');
    console.log('RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL);
    console.log('RESEND_FROM_NAME:', process.env.RESEND_FROM_NAME);

    const { email, fullName } = req.body;
    console.log('📧 Datos recibidos:', { email, fullName });

    if (!email || !fullName) {
      return res.status(400).json({ message: 'Email and fullName are required' });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ message: 'RESEND_API_KEY not configured' });
    }

    const { data, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME || 'Frecuencia 44'} <${process.env.RESEND_FROM_EMAIL || 'info@argentinalibre.org'}>`,
      to: email,
      subject: '🧪 Prueba de Email - Frecuencia 44',
      html: `
        <h1>Prueba de Email</h1>
        <p>Hola ${fullName},</p>
        <p>Este es un email de prueba para verificar que el sistema funciona correctamente.</p>
        <p>Fecha: ${new Date().toLocaleString()}</p>
      `,
    });

    if (error) {
      console.error('❌ Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email', error: error.message });
    }

    console.log('✅ Email enviado exitosamente:', data);
    return res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('❌ Error en test-email-simple:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
