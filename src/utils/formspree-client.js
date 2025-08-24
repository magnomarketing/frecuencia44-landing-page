// Cliente de Formspree como alternativa súper simple
// Formspree maneja automáticamente el envío de emails

export const sendEmailWithFormspree = async (email, fullName) => {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        fullName: fullName,
        subject: 'Registro Masterclass Frecuencia 44',
        message: `
          Nuevo registro confirmado:
          
          Nombre: ${fullName}
          Email: ${email}
          
          Detalles del evento:
          - Fecha: Domingo 24 de agosto de 2025
          - Hora: 15:00 (hora Argentina)
          - Plataforma: Zoom
          - Enlace: https://us02web.zoom.us/j/82510738233?pwd=alt0W3fzEAUrmRyY8bZiTtcFQU3bDV.1
          - ID: 825 1073 8233
          - Código: 507559
        `
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email with Formspree:', error);
    return { success: false, error: error.message };
  }
};
