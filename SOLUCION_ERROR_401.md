# 🚨 Solución al Error 401 (Unauthorized) - Google Forms

## 📋 **Problema Identificado**

El error `401 (Unauthorized)` indica que Google Forms está rechazando el envío del formulario. Esto puede deberse a varios factores:

### 🔍 **Causas del Error 401:**

1. **URL del formulario incorrecta**
2. **IDs de los campos incorrectos**
3. **Formulario configurado para requerir autenticación**
4. **Formulario bloqueado para envíos externos**
5. **Token de formulario expirado o inválido**

---

## 🛠️ **Soluciones Paso a Paso**

### **✅ Solución 1: Verificar y Corregir la URL**

#### **URL Actual (Problemática):**
```
https://docs.google.com/forms/u/0/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse
```

#### **URLs Alternativas a Probar:**

1. **Sin `/u/0/`:**
```
https://docs.google.com/forms/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse
```

2. **Sin `/d/`:**
```
https://docs.google.com/forms/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse
```

3. **URL Original del Formulario:**
```
https://docs.google.com/forms/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/viewform
```

#### **Cómo Obtener la URL Correcta:**

1. Ve a tu formulario de Google Forms
2. Click en **"Enviar"** (botón púrpura)
3. Click en el **ícono de enlace** (🔗)
4. Copia la URL que aparece
5. **Reemplaza** `/viewform` por `/formResponse`

---

### **✅ Solución 2: Verificar IDs de los Campos**

#### **IDs Actuales:**
```
- entry.2113807473: Nombre Completo
- entry.1807164578: Email
- entry.316240725: País y Ciudad
- entry.588822403: WhatsApp
- entry.1776417857: Modalidad
- entry.1174231297: Consentimiento
```

#### **Cómo Verificar los IDs Correctos:**

1. **Abre tu formulario** en Google Forms
2. **Click derecho** en cualquier campo
3. **"Inspeccionar elemento"**
4. Busca en el código algo como:
   ```html
   <input name="entry.1234567890" ...>
   ```
5. **Anota los números** después de "entry."

#### **Ejemplo de Verificación:**
```html
<!-- Campo de nombre -->
<input name="entry.9876543210" type="text" ...>

<!-- Campo de email -->
<input name="entry.1234567890" type="email" ...>
```

---

### **✅ Solución 3: Configurar el Formulario Correctamente**

#### **En Google Forms:**

1. **Abre tu formulario**
2. Click en **"Configuración"** (ícono de engranaje)
3. Ve a la pestaña **"General"**
4. **Desmarca** "Limitar a 1 respuesta"
5. **Desmarca** "Requerir inicio de sesión de Google"
6. **Desmarca** "Requerir verificación de email"

#### **Configuración de Respuestas:**

1. Click en **"Respuestas"**
2. Click en **"Configuración de respuestas"**
3. **Marca** "Aceptar respuestas"
4. **Desmarca** "Requerir inicio de sesión de Google"

---

### **✅ Solución 4: Probar Manualmente**

#### **Crear URL de Prueba:**

Construye una URL manual con los datos de prueba:

```
https://docs.google.com/forms/d/e/TU_FORM_ID/formResponse?entry.1234567890=Juan%20Pérez&entry.9876543210=juan@email.com
```

#### **Pasos de Prueba:**

1. **Reemplaza** `TU_FORM_ID` con el ID real de tu formulario
2. **Reemplaza** los IDs de entrada con los correctos
3. **Codifica** los valores (espacios = %20, @ = %40)
4. **Pega la URL** en una nueva pestaña
5. **Verifica** si funciona

---

### **✅ Solución 5: Implementar Método Alternativo**

#### **Usar URLSearchParams en lugar de FormData:**

```typescript
const onSubmit = async (data: RegistrationFormData) => {
  try {
    // Crear parámetros de URL
    const params = new URLSearchParams({
      'entry.2113807473': data.fullName,
      'entry.1807164578': data.email,
      'entry.316240725': data.location,
      'entry.588822403': data.whatsapp || '',
      'entry.1776417857': data.attendance,
      'entry.1174231297': data.dataConsent ? 'Sí' : 'No'
    });

    // URL del formulario (sin /u/0/)
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse';

    // Enviar usando imagen invisible
    const img = new Image();
    img.src = `${formUrl}?${params.toString()}`;

    // Mostrar éxito
    toast({
      title: "¡Registro exitoso! 🎉",
      description: "Revisa tu correo para el enlace de acceso",
    });

    // Reset form
    form.reset();

  } catch (error) {
    console.error('Error en el registro:', error);
    toast({
      title: "Error en el registro",
      description: "Por favor intenta nuevamente o contacta soporte",
      variant: "destructive",
    });
  }
};
```

---

## 🔧 **Implementación Inmediata**

### **Paso 1: Actualizar la URL**

En `src/hooks/use-registration-form.ts`, cambia:

```typescript
// De:
'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse'

// A:
'https://docs.google.com/forms/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse'
```

### **Paso 2: Cambiar Método de Envío**

Reemplaza el método actual con:

```typescript
// En lugar de FormData, usar URLSearchParams
const params = new URLSearchParams({
  'entry.2113807473': data.fullName,
  'entry.1807164578': data.email,
  'entry.316240725': data.location,
  'entry.588822403': data.whatsapp || '',
  'entry.1776417857': data.attendance,
  'entry.1174231297': data.dataConsent ? 'Sí' : 'No'
});

const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfD78M_ZXzk36jwNRAleUXf5MzjX33_fisPY5032llepmznYw/formResponse';

// Enviar usando imagen invisible
const img = new Image();
img.src = `${formUrl}?${params.toString()}`;
```

---

## 📊 **Verificación de la Solución**

### **✅ Pasos de Verificación:**

1. **Actualiza el código** con la nueva URL
2. **Prueba el formulario** con datos de prueba
3. **Revisa la consola** del navegador
4. **Verifica en Google Forms** si llegan los registros
5. **Confirma** que no hay más errores 401

### **✅ Indicadores de Éxito:**

- ✅ **No hay errores 401** en la consola
- ✅ **Toast de éxito** aparece
- ✅ **Registros llegan** a Google Forms
- ✅ **Formulario se resetea** correctamente

---

## 🚨 **Si el Problema Persiste**

### **Opciones Alternativas:**

1. **Crear un nuevo formulario** de Google Forms
2. **Usar Formspree** como alternativa
3. **Implementar Vercel Functions** para manejo de formularios
4. **Usar Netlify Forms** como respaldo

### **Contacto para Soporte:**

Si ninguna solución funciona, proporciona:
- ✅ **URL exacta** de tu formulario
- ✅ **IDs de los campos** verificados
- ✅ **Captura de pantalla** de la configuración
- ✅ **Logs de error** completos

---

## 🎯 **Resumen de Acciones**

1. **Cambiar URL** (quitar `/u/0/`)
2. **Verificar IDs** de los campos
3. **Configurar formulario** correctamente
4. **Implementar método alternativo**
5. **Probar y verificar**

¡Con estos pasos deberías resolver el error 401! 🚀
