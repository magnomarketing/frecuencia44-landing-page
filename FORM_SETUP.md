# 🚀 Configuración del Formulario de Registro

## 📋 Opciones para hacer funcionar el formulario

### 1. **Netlify Forms (Recomendado - Más Fácil)**

#### Configuración automática:
- El formulario ya está configurado para Netlify Forms
- Solo necesitas desplegar en Netlify
- Los datos se envían automáticamente a tu email

#### Pasos:
1. Conecta tu repositorio a Netlify
2. Despliega el proyecto
3. Los formularios aparecerán automáticamente en el dashboard de Netlify
4. Configura las notificaciones por email

#### Ventajas:
- ✅ Gratuito hasta 100 envíos/mes
- ✅ Configuración automática
- ✅ Spam protection incluido
- ✅ Notificaciones por email
- ✅ Dashboard para ver envíos

---

### 2. **Formspree (Alternativa Gratuita)**

#### Configuración:
1. Ve a [formspree.io](https://formspree.io)
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia el endpoint que te dan

#### Implementación:
```typescript
// En src/config/formServices.ts, cambia:
FORMSPREE_URL: 'https://formspree.io/f/TU_FORM_ID_REAL'

// En RegistrationSection.tsx, cambia la función handleSubmit:
const response = await sendToFormspree(formData);
```

#### Ventajas:
- ✅ Gratuito hasta 50 envíos/mes
- ✅ Fácil de configurar
- ✅ Spam protection
- ✅ Notificaciones por email

---

### 3. **EmailJS (Para envío directo por email)**

#### Configuración:
1. Ve a [emailjs.com](https://emailjs.com)
2. Crea una cuenta gratuita
3. Configura un servicio de email (Gmail, Outlook, etc.)
4. Crea una plantilla de email
5. Obtén los IDs necesarios

#### Instalación:
```bash
npm install @emailjs/browser
```

#### Implementación:
```typescript
// En src/config/formServices.ts, actualiza:
EMAILJS: {
  SERVICE_ID: 'TU_SERVICE_ID_REAL',
  TEMPLATE_ID: 'TU_TEMPLATE_ID_REAL',
  USER_ID: 'TU_USER_ID_REAL',
}

// En RegistrationSection.tsx:
const response = await sendToEmailJS(formData);
```

#### Ventajas:
- ✅ Gratuito hasta 200 emails/mes
- ✅ Envío directo por email
- ✅ Plantillas personalizables
- ✅ Respuestas automáticas

---

### 4. **Google Forms (Gratuito)**

#### Configuración:
1. Crea un formulario en Google Forms
2. Obtén los IDs de los campos
3. Actualiza la configuración

#### Implementación:
```typescript
// En src/config/formServices.ts, actualiza:
GOOGLE_FORMS_URL: 'https://docs.google.com/forms/d/e/TU_FORM_ID_REAL/formResponse'

// Y actualiza los IDs de los campos:
formDataToSend.append('entry.123456789', formData.fullName); // ID real del campo nombre
formDataToSend.append('entry.987654321', formData.email);    // ID real del campo email
// etc...
```

#### Ventajas:
- ✅ Completamente gratuito
- ✅ Sin límites de envíos
- ✅ Datos en Google Sheets
- ✅ Fácil de exportar

---

### 5. **Tu propio backend (Más control)**

#### Opciones de backend:
- **Vercel Functions** (serverless)
- **Netlify Functions** (serverless)
- **Express.js** con Node.js
- **Python Flask/Django**
- **PHP**

#### Ejemplo con Vercel Functions:
1. Crea carpeta `api/` en la raíz
2. Crea archivo `api/register.js`:

```javascript
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { fullName, email, location, whatsapp, attendance } = req.body;
    
    // Aquí procesas los datos:
    // - Guardar en base de datos
    // - Enviar email
    // - Integrar con CRM
    
    // Ejemplo: enviar email con nodemailer
    // await sendEmail({ fullName, email, location, attendance });
    
    res.status(200).json({ message: 'Registro exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
}
```

---

## 🎯 Recomendación

**Para empezar rápido:** Usa **Netlify Forms** - ya está configurado y solo necesitas desplegar.

**Para más control:** Usa **EmailJS** - te permite personalizar completamente los emails.

**Para escalar:** Usa tu propio **backend** con Vercel Functions.

---

## 📧 Configuración de Email

### Para enviar emails automáticos:

1. **Servicio de email:**
   - Gmail (con App Password)
   - SendGrid (gratuito hasta 100 emails/día)
   - Mailgun (gratuito hasta 5,000 emails/mes)

2. **Plantilla de email:**
   - Incluir enlace de Zoom
   - Información del evento
   - Recordatorios

3. **Respuestas automáticas:**
   - Confirmación de registro
   - Recordatorio 24h antes
   - Recordatorio 1h antes

---

## 🔒 Seguridad y Spam

- ✅ Validación en frontend y backend
- ✅ reCAPTCHA (opcional)
- ✅ Rate limiting
- ✅ Sanitización de datos
- ✅ HTTPS obligatorio

---

## 📊 Seguimiento

- Dashboard para ver registros
- Exportar datos a CSV
- Integración con CRM
- Analytics de conversión
