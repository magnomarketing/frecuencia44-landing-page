// Script de prueba para verificar el envío de emails
// Ejecutar con: node test-email.js

const testEmail = async () => {
  try {
    console.log('🧪 Probando envío de email...');
    
    const response = await fetch('https://frecuencia44-landing-page-jcza13emo-magnomarketings-projects.vercel.app/api/send-confirmation-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'ro@mango.mx', // Cambiar por tu email para la prueba
        fullName: 'Usuario de Prueba'
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Email enviado exitosamente:', result);
    } else {
      console.log('❌ Error al enviar email:', result);
    }
  } catch (error) {
    console.log('❌ Error en la prueba:', error.message);
  }
};

testEmail();
