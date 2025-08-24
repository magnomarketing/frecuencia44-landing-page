import * as SibApiV3Sdk from '@getbrevo/brevo';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, fullName } = req.body;

    if (!email || !fullName) {
      return res.status(400).json({ message: 'Email and fullName are required' });
    }

    const zoomLink = 'https://us02web.zoom.us/j/82510738233?pwd=alt0W3fzEAUrmRyY8bZiTtcFQU3bDV.1';
    const meetingId = '825 1073 8233';
    const accessCode = '507559';

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de Registro - Masterclass Frecuencia 44</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00B9FE, #75AADB); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .zoom-section { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00B9FE; }
          .button { display: inline-block; background: #00B9FE; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
          .details { background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🎯 Masterclass Frecuencia 44</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px;">ALQUIMIA DE PACTOS Y REALIDADES</p>
          </div>
          
          <div class="content">
            <h2 style="color: #00B9FE; margin-top: 0;">¡Hola ${fullName}!</h2>
            
            <p>Tu registro ha sido confirmado exitosamente para la <strong>Masterclass Frecuencia 44</strong>.</p>
            
            <div class="zoom-section">
              <h3 style="color: #333; margin-top: 0;">📅 Detalles del Evento</h3>
              <div class="details">
                <p><strong>📅 Fecha:</strong> Domingo 24 de agosto de 2025</p>
                <p><strong>🕐 Hora:</strong> 15:00 (hora Argentina)</p>
                <p><strong>🌐 Plataforma:</strong> Zoom</p>
                <p><strong>👥 Organizador:</strong> Samuel Valdivia</p>
              </div>
            </div>

            <div class="zoom-section">
              <h3 style="color: #333; margin-top: 0;">🔗 Enlace de Zoom</h3>
              <p>Haz clic en el botón para unirte a la reunión:</p>
              <a href="${zoomLink}" class="button">🎯 Unirse a la Masterclass</a>
              
              <div class="details">
                <p><strong>ID de reunión:</strong> ${meetingId}</p>
                <p><strong>Código de acceso:</strong> ${accessCode}</p>
              </div>
            </div>

            <div class="zoom-section">
              <h3 style="color: #333; margin-top: 0;">📋 Instrucciones</h3>
              <ul>
                <li>El enlace estará activo 15 minutos antes del evento</li>
                <li>Te recomendamos conectarte 5 minutos antes</li>
                <li>Ten tu cámara y micrófono listos</li>
                <li>Encuentra un lugar tranquilo para la experiencia</li>
              </ul>
            </div>

            <div class="zoom-section">
              <h3 style="color: #333; margin-top: 0;">🌟 Lo que vivirás</h3>
              <ul>
                <li>Fortalecimiento del campo áurico</li>
                <li>Manifestación con Llama Violeta</li>
                <li>Coherencia grupal para la transformación</li>
                <li>Experiencia de unidad, alegría y trascendencia</li>
              </ul>
            </div>

            <p style="text-align: center; font-weight: bold; color: #00B9FE;">
              ¡Nos vemos en la transformación colectiva!
            </p>
          </div>
          
          <div class="footer">
            <p>Frecuencia 44 - Transformación Colectiva hacia una Argentina Libre</p>
            <p>Si tienes alguna pregunta, responde a este email</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = '🎯 ¡Confirmación de Registro - Masterclass Frecuencia 44!';
    sendSmtpEmail.htmlContent = emailHtml;
    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'Frecuencia 44',
      email: process.env.BREVO_SENDER_EMAIL || 'noreply@frecuencia44.com'
    };
    sendSmtpEmail.to = [{ email, name: fullName }];

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    return res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('Error in send-confirmation-email:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
