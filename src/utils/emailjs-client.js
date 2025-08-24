// Cliente de EmailJS como alternativa gratuita
// Necesitas crear una cuenta en emailjs.com

export const sendEmailWithEmailJS = async (email, fullName) => {
  try {
    // Cargar EmailJS dinámicamente
    const emailjs = await import('@emailjs/browser');
    
    const templateParams = {
      to_email: email,
      to_name: fullName,
      message: `
        ¡Hola ${fullName}!
        
        Tu registro ha sido confirmado exitosamente para la Masterclass Frecuencia 44.
        
        📅 Fecha: Domingo 24 de agosto de 2025
        🕐 Hora: 15:00 (hora Argentina)
        🌐 Plataforma: Zoom
        
        🔗 Enlace: https://us02web.zoom.us/j/82510738233?pwd=alt0W3fzEAUrmRyY8bZiTtcFQU3bDV.1
        ID: 825 1073 8233
        Código: 507559
        
        ¡Nos vemos en la transformación colectiva!
      `
    };

    const result = await emailjs.send(
      'YOUR_SERVICE_ID', // Reemplazar con tu Service ID
      'YOUR_TEMPLATE_ID', // Reemplazar con tu Template ID
      templateParams,
      'YOUR_PUBLIC_KEY' // Reemplazar con tu Public Key
    );

    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending email with EmailJS:', error);
    return { success: false, error: error.message };
  }
};
