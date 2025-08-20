# 🚀 Configuración Fácil con Google Forms

## 📋 **Paso a Paso para Configurar Google Forms**

### **Paso 1: Crear el Formulario en Google Forms**

1. Ve a [forms.google.com](https://forms.google.com)
2. Click en **"+"** para crear un nuevo formulario
3. Dale un título: **"Registro Evento Frecuencia 44"**

### **Paso 2: Agregar los Campos**

Agrega estos campos en el orden exacto:

1. **Nombre Completo** (Texto corto)
2. **Email** (Email)
3. **País y Ciudad** (Texto corto)
4. **WhatsApp** (Texto corto)
5. **Modalidad de Asistencia** (Múltiple choice)
   - Opción 1: Virtual
   - Opción 2: Presencial en Tucumán
6. **Consentimiento de Datos** (Casilla de verificación)

### **Paso 3: Obtener los IDs de los Campos**

1. **Abre el formulario** en tu navegador
2. **Click derecho** en cualquier campo
3. **"Inspeccionar elemento"**
4. Busca en el código algo como:
   ```html
   <input name="entry.1234567890" ...>
   ```
5. **Anota los números** después de "entry."

### **Paso 4: Obtener la URL del Formulario**

1. En Google Forms, click en **"Enviar"**
2. Click en el **ícono de enlace** (🔗)
3. Copia la URL que aparece
4. **Reemplaza** `/viewform` por `/formResponse`

### **Paso 5: Actualizar la Vercel Function**

En el archivo `api/register.js`, reemplaza:

```javascript
// Reemplaza estos IDs con los reales de tu formulario
formData.append('entry.1234567890', data.fullName);        // Nombre Completo
formData.append('entry.0987654321', data.email);           // Email
formData.append('entry.1111111111', data.location);        // País y Ciudad
formData.append('entry.2222222222', data.whatsapp || '');  // WhatsApp
formData.append('entry.3333333333', data.attendance);      // Modalidad
formData.append('entry.4444444444', data.dataConsent ? 'Sí' : 'No'); // Consentimiento

// Reemplaza con tu URL real
const formUrl = process.env.GOOGLE_FORM_URL || 'https://docs.google.com/forms/d/e/TU_FORM_ID/formResponse';
```

### **Paso 6: Configurar Variables de Entorno en Vercel**

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. **Settings** → **Environment Variables**
3. Agrega estas variables:

```
GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/TU_FORM_ID_REAL/formResponse
ADMIN_EMAIL=tu@email.com
RESEND_API_KEY=re_1234567890abcdef (opcional, para emails)
```

### **Paso 7: Configurar Notificaciones por Email (Opcional)**

Para recibir emails cuando alguien se registre:

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Obtén tu API key
4. Agrega la variable de entorno:
   ```
   RESEND_API_KEY=re_1234567890abcdef
   ```

---

## 🎯 **Ejemplo Completo**

### **Formulario de Google Forms:**
```
Título: Registro Evento Frecuencia 44

Campo 1: Nombre Completo (entry.1234567890)
Campo 2: Email (entry.0987654321)
Campo 3: País y Ciudad (entry.1111111111)
Campo 4: WhatsApp (entry.2222222222)
Campo 5: Modalidad (entry.3333333333)
  - Virtual
  - Presencial en Tucumán
Campo 6: Consentimiento (entry.4444444444)
```

### **URL del Formulario:**
```
https://docs.google.com/forms/d/e/1FAIpQLSf1234567890abcdef/formResponse
```

### **Variables de Entorno:**
```
GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/1FAIpQLSf1234567890abcdef/formResponse
ADMIN_EMAIL=tu@email.com
RESEND_API_KEY=re_1234567890abcdef
```

---

## ✅ **Ventajas de Google Forms:**

- ✅ **Completamente gratis**
- ✅ **Sin límites** de registros
- ✅ **Datos en Google Sheets** automáticamente
- ✅ **Fácil de exportar**
- ✅ **No requiere autenticación compleja**
- ✅ **Seguro y confiable**

---

## 📊 **Dónde Ver los Registros:**

1. **Google Forms Dashboard:**
   - Ve a tu formulario
   - Click en **"Respuestas"**
   - Ver todos los registros

2. **Google Sheets (Automático):**
   - En las respuestas, click en **"Crear hoja de cálculo"**
   - Los datos se sincronizan automáticamente

3. **Email (Si configuras Resend):**
   - Recibirás un email por cada registro

---

## 🔧 **Solución de Problemas:**

### **Error: "Form not found"**
- Verifica que la URL termine en `/formResponse`
- Asegúrate de que el formulario esté publicado

### **Error: "Invalid entry ID"**
- Verifica que los IDs de los campos sean correctos
- Asegúrate de que el orden de los campos coincida

### **No se reciben emails**
- Verifica que `RESEND_API_KEY` esté configurado
- Revisa que `ADMIN_EMAIL` sea válido

### **Registros no aparecen**
- Verifica que el formulario esté activo
- Revisa los logs en Vercel Dashboard

---

## 🚀 **Despliegue Final:**

1. **Hacer commit** de los cambios
2. **Push** al repositorio
3. **Vercel** hará deploy automáticamente
4. **Probar** el formulario
5. **Verificar** que los datos lleguen a Google Forms

---

## 📞 **Soporte:**

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard
2. Verifica que las variables de entorno estén correctas
3. Prueba el formulario de Google Forms directamente
4. Revisa que los IDs de los campos coincidan
