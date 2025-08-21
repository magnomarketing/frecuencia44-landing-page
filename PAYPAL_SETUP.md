# 🚀 Configuración de PayPal para Donaciones

## 📋 **Paso a Paso para Configurar PayPal**

### **Paso 1: Crear Cuenta de PayPal Business**

1. Ve a [paypal.com](https://paypal.com)
2. Click en **"Crear cuenta"**
3. Selecciona **"Cuenta Business"**
4. Completa el proceso de verificación

### **Paso 2: Obtener Credenciales de PayPal**


### **Paso 3: Configurar el Código**

En el archivo `src/App.tsx`, reemplaza:

```typescript
// Configuración de PayPal (usa el Client ID de sandbox para pruebas)
const paypalOptions = {
  clientId: 'test', // Cambiar por tu Client ID real de PayPal
  currency: 'USD',
  intent: 'capture',
};
```

Por:

```typescript
// Configuración de PayPal
const paypalOptions = {
  clientId: 'TU_CLIENT_ID_REAL_AQUI', // Reemplaza con tu Client ID
  currency: 'USD',
  intent: 'capture',
};
```

### **Paso 4: Configurar Variables de Entorno (Recomendado)**

Para mayor seguridad, usa variables de entorno:

1. **Crea un archivo `.env.local`:**
```env
VITE_PAYPAL_CLIENT_ID=TU_CLIENT_ID_REAL_AQUI
```

2. **Actualiza el código:**
```typescript
const paypalOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
  currency: 'USD',
  intent: 'capture',
};
```

3. **En Vercel, agrega la variable de entorno:**
   - Ve a tu proyecto en Vercel
   - **Settings** → **Environment Variables**
   - Agrega: `VITE_PAYPAL_CLIENT_ID` = `TU_CLIENT_ID_REAL`

### **Paso 5: Configurar Webhooks (Opcional pero Recomendado)**

Para recibir notificaciones de pagos:

1. En **PayPal Developer Dashboard**
2. Ve a **"Webhooks"**
3. **Agrega endpoint:** `https://tu-dominio.com/api/paypal-webhook`
4. **Selecciona eventos:**
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`

### **Paso 6: Probar la Integración**

#### **Modo Sandbox (Pruebas):**
- Usa el **Client ID de Sandbox**
- Prueba con **cuentas de sandbox**
- No se procesan pagos reales

#### **Modo Producción:**
- Usa el **Client ID de Producción**
- Los pagos son reales
- Asegúrate de que todo funcione en sandbox primero

---

## 🎯 **Características del Botón de PayPal**

### **✅ Funcionalidades Implementadas:**

1. **Selección de Montos:**
   - $5, $10, $25, $50, $100 USD
   - Opción de monto personalizado
   - Validación de monto mínimo ($1)

2. **Experiencia de Usuario:**
   - Botones de selección visual
   - Input para monto personalizado
   - Confirmación del monto antes del pago

3. **Notificaciones:**
   - Toast de éxito al completar donación
   - Toast de error si algo falla
   - Logs en consola para debugging

4. **Seguridad:**
   - Validación de montos
   - Manejo de errores
   - Reset automático del formulario

### **✅ Flujo de Donación:**

```
1. Usuario selecciona monto → Botones de selección
2. Usuario confirma → PayPal Button aparece
3. Usuario hace clic → PayPal Checkout se abre
4. Usuario completa pago → PayPal procesa
5. Pago exitoso → Toast de confirmación
6. Formulario se resetea → Listo para nueva donación
```

---

## 🔧 **Personalización Avanzada**

### **Cambiar Monedas:**
```typescript
const paypalOptions = {
  clientId: 'TU_CLIENT_ID',
  currency: 'EUR', // Cambiar a Euro
  intent: 'capture',
};
```

### **Cambiar Montos de Donación:**
```typescript
const donationAmounts = [
  { value: 10, label: '€10 EUR' },
  { value: 20, label: '€20 EUR' },
  { value: 50, label: '€50 EUR' },
  { value: 0, label: 'Personalizado' }
];
```

### **Personalizar Mensajes:**
```typescript
toast({
  title: "¡Donación exitosa! 🎉",
  description: `Gracias por tu contribución de $${amount} USD. 
                Tu apoyo es invaluable para nuestra misión.`,
});
```

---

## 📊 **Monitoreo y Analytics**

### **Logs Automáticos:**
- Todas las donaciones se loguean en consola
- Errores se capturan y reportan
- Información de transacciones disponible

### **Webhook Data (si configuras):**
```json
{
  "id": "PAYMENT_ID",
  "status": "COMPLETED",
  "amount": {
    "currency_code": "USD",
    "value": "25.00"
  },
  "description": "Donación voluntaria - Frecuencia 44 Masterclass"
}
```

---

## 🚨 **Consideraciones Importantes**

### **✅ Seguridad:**
- **Nunca** expongas tu Client Secret en el frontend
- Usa **variables de entorno** para credenciales
- **Valida montos** en el backend si es posible

### **✅ UX/UI:**
- El botón es **responsivo** por defecto
- **Loading states** manejados por PayPal
- **Error handling** completo

### **✅ Legal:**
- Asegúrate de cumplir con **regulaciones locales**
- **Términos de servicio** claros
- **Política de reembolsos** definida

---

## 🎉 **¡Listo para Usar!**

Una vez configurado correctamente:

1. ✅ **PayPal está integrado** en tu landing page
2. ✅ **Los usuarios pueden donar** de forma segura
3. ✅ **Recibes notificaciones** de donaciones exitosas
4. ✅ **Todo es configurable** según tus necesidades

**¡Tu botón de PayPal está listo para recibir donaciones!** 🚀
