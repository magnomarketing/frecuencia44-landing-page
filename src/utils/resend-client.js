// Cliente de Resend para usar desde el frontend
const RESEND_API_KEY = 're_DZpy1oRE_8LoyiY3yJjYox2bUebp4...'; // Tu API key pública

export const sendEmail = async (email, fullName) => {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Frecuencia 44 <noreply@resend.dev>',
        to: email,
        subject: '🎯 Confirmación - Masterclass Frecuencia 44',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #00B9FE, #75AADB); color: white; padding: 30px; text-align: center; border-radius: 10px;">
              <h1>🎯 Masterclass Frecuencia 44</h1>
              <p>ALQUIMIA DE PACTOS Y REALIDADES</p>
            </div>
            
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #00B9FE;">¡Hola ${fullName}!</h2>
              <p>Tu registro ha sido confirmado exitosamente.</p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>📅 Detalles del Evento</h3>
                <p><strong>Fecha:</strong> Domingo 24 de agosto de 2025</p>
                <p><strong>Hora:</strong> 15:00 (hora Argentina)</p>
                <p><strong>Plataforma:</strong> Zoom</p>
              </div>

              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>🔗 Enlace de Zoom</h3>
                <a href="https://us02web.zoom.us/j/82510738233?pwd=alt0W3fzEAUrmRyY8bZiTtcFQU3bDV.1" 
                   style="display: inline-block; background: #00B9FE; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px;">
                   🎯 Unirse a la Masterclass
                </a>
                <p><strong>ID:</strong> 825 1073 8233</p>
                <p><strong>Código:</strong> 507559</p>
              </div>

              <p style="text-align: center; font-weight: bold; color: #00B9FE;">
                ¡Nos vemos en la transformación colectiva!
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};
