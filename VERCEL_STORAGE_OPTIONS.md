# 📍 Opciones de Almacenamiento para Vercel Functions

## 🚨 **Importante: Vercel Functions NO tiene almacenamiento persistente**

Los datos se pierden después de cada ejecución. Necesitas una base de datos externa.

---

## 🗄️ **Opciones de Base de Datos (Recomendadas)**

### 1. **MongoDB Atlas (Gratuito - 512MB)**

#### ✅ Ventajas:
- **512MB gratis** para siempre
- **Fácil de configurar**
- **Escalable**
- **JSON nativo**

#### 🔧 Configuración:
1. Crear cuenta en [MongoDB Atlas](https://mongodb.com/atlas)
2. Crear cluster gratuito
3. Obtener connection string
4. Agregar variable de entorno en Vercel:
   ```
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/frecuencia44
   ```

#### 📦 Instalación:
```bash
npm install mongodb
```

#### 💾 Uso:
```javascript
// En api/register.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
await client.connect();
const db = client.db('frecuencia44');
await db.collection('registrations').insertOne(data);
await client.close();
```

---

### 2. **Supabase (PostgreSQL - 50,000 rows/mes gratis)**

#### ✅ Ventajas:
- **50,000 rows/mes** gratis
- **PostgreSQL** (base de datos robusta)
- **API automática**
- **Dashboard incluido**

#### 🔧 Configuración:
1. Crear cuenta en [Supabase](https://supabase.com)
2. Crear proyecto
3. Crear tabla `registrations`
4. Obtener URL y API key
5. Agregar variables de entorno:
   ```
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_ANON_KEY=tu-api-key
   ```

#### 📦 Instalación:
```bash
npm install @supabase/supabase-js
```

#### 💾 Uso:
```javascript
// En api/register.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const { data, error } = await supabase
  .from('registrations')
  .insert([{
    full_name: data.fullName,
    email: data.email,
    location: data.location,
    attendance: data.attendance,
    created_at: new Date()
  }]);
```

---

### 3. **Firebase Firestore (20,000 writes/mes gratis)**

#### ✅ Ventajas:
- **20,000 writes/mes** gratis
- **Base de datos en tiempo real**
- **Integración con Google**
- **Autenticación incluida**

#### 🔧 Configuración:
1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar Firestore
3. Obtener configuración
4. Agregar variables de entorno:
   ```
   FIREBASE_API_KEY=tu-api-key
   FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
   FIREBASE_PROJECT_ID=tu-proyecto
   ```

#### 📦 Instalación:
```bash
npm install firebase
```

#### 💾 Uso:
```javascript
// En api/register.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const docRef = await addDoc(collection(db, 'registrations'), {
  fullName: data.fullName,
  email: data.email,
  timestamp: new Date()
});
```

---

### 4. **Google Sheets (Completamente gratis)**

#### ✅ Ventajas:
- **Sin límites** de filas
- **Completamente gratis**
- **Fácil de exportar**
- **Acceso desde Google Workspace**

#### 🔧 Configuración:
1. Crear Google Sheet
2. Configurar Google Cloud Project
3. Habilitar Google Sheets API
4. Crear Service Account
5. Compartir Sheet con service account
6. Agregar variables de entorno:
   ```
   GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
   GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
   ```

#### 📦 Instalación:
```bash
npm install googleapis
```

#### 💾 Uso:
```javascript
// En api/register.js
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

await sheets.spreadsheets.values.append({
  spreadsheetId: process.env.GOOGLE_SHEET_ID,
  range: 'Registros!A:G',
  valueInputOption: 'RAW',
  insertDataOption: 'INSERT_ROWS',
  resource: { values: [[data.fullName, data.email, data.location]] }
});
```

---

## 📧 **Opciones de Email**

### 1. **SendGrid (100 emails/día gratis)**

#### 🔧 Configuración:
```bash
npm install @sendgrid/mail
```

```javascript
// En api/register.js
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: 'tu@email.com',
  from: 'noreply@tudominio.com',
  subject: 'Nuevo registro - Frecuencia 44',
  html: `<h2>Nuevo registro</h2><p>Nombre: ${data.fullName}</p>`
});
```

### 2. **Nodemailer + Gmail**

#### 🔧 Configuración:
```bash
npm install nodemailer
```

```javascript
// En api/register.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // App Password
  }
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.ADMIN_EMAIL,
  subject: 'Nuevo registro',
  html: `<h2>Nuevo registro</h2><p>Nombre: ${data.fullName}</p>`
});
```

---

## 🎯 **Recomendación para tu caso:**

### **Para 1000+ registros con $0:**
1. **Google Sheets** - Sin límites, completamente gratis
2. **Supabase** - 50,000 rows/mes gratis
3. **Firebase** - 20,000 writes/mes gratis

### **Configuración recomendada:**
1. **Base de datos:** Google Sheets (para almacenar)
2. **Email:** SendGrid (para notificaciones)
3. **Backup:** Supabase (opcional)

---

## 🔧 **Variables de entorno en Vercel:**

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Agrega las variables necesarias:
   ```
   MONGODB_URI=mongodb+srv://...
   SUPABASE_URL=https://...
   SUPABASE_ANON_KEY=eyJ...
   FIREBASE_API_KEY=AIza...
   GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
   SENDGRID_API_KEY=SG...
   EMAIL_USER=tu@gmail.com
   EMAIL_PASS=tu-app-password
   ```

---

## 📊 **Monitoreo y Analytics:**

### **Vercel Analytics:**
- Requests por función
- Tiempo de respuesta
- Errores
- Uso de recursos

### **Logs:**
- Vercel Dashboard → Functions → Logs
- Tiempo real
- Errores detallados

### **Métricas:**
- Registros por día
- Conversión
- Fuentes de tráfico
