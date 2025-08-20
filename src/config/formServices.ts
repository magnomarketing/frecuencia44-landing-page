// Configuración para diferentes servicios de procesamiento de formularios

export const FORM_CONFIG = {
  // Opción 1: Tu propio backend
  BACKEND_URL: process.env.REACT_APP_API_URL || '/api/register',
  
  // Opción 2: Formspree (gratuito hasta 50 envíos/mes)
  FORMSPREE_URL: 'https://formspree.io/f/TU_FORM_ID',
  
  // Opción 3: Netlify Forms (gratuito hasta 100 envíos/mes)
  NETLIFY_FORM_NAME: 'event-registration',
  
  // Opción 4: Google Forms
  GOOGLE_FORMS_URL: 'https://docs.google.com/forms/d/e/TU_FORM_ID/formResponse',
  
  // Opción 5: EmailJS (gratuito hasta 200 emails/mes)
  EMAILJS: {
    SERVICE_ID: 'TU_SERVICE_ID',
    TEMPLATE_ID: 'TU_TEMPLATE_ID',
    USER_ID: 'TU_USER_ID',
  }
};

// Función para enviar a Formspree
export const sendToFormspree = async (formData: any) => {
  const response = await fetch(FORM_CONFIG.FORMSPREE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  return response;
};

// Función para enviar a EmailJS
export const sendToEmailJS = async (formData: any) => {
  // Requiere instalar: npm install @emailjs/browser
  const { send } = await import('@emailjs/browser');
  
  return send(
    FORM_CONFIG.EMAILJS.SERVICE_ID,
    FORM_CONFIG.EMAILJS.TEMPLATE_ID,
    {
      fullName: formData.fullName,
      email: formData.email,
      location: formData.location,
      whatsapp: formData.whatsapp,
      attendance: formData.attendance,
    },
    FORM_CONFIG.EMAILJS.USER_ID
  );
};

// Función para enviar a Google Forms
export const sendToGoogleForms = async (formData: any) => {
  const formDataToSend = new FormData();
  formDataToSend.append('entry.123456789', formData.fullName); // Reemplazar con IDs reales
  formDataToSend.append('entry.987654321', formData.email);
  formDataToSend.append('entry.111222333', formData.location);
  formDataToSend.append('entry.444555666', formData.whatsapp || '');
  formDataToSend.append('entry.777888999', formData.attendance);
  
  const response = await fetch(FORM_CONFIG.GOOGLE_FORMS_URL, {
    method: 'POST',
    body: formDataToSend,
  });
  return response;
};
