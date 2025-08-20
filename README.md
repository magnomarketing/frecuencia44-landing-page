# 🎯 Frecuencia 44 - Landing Page

Landing page para el evento Frecuencia 44 con formulario de registro funcional usando Google Forms y Vercel.

## 🚀 Tecnologías

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel
- **Formulario:** Google Forms + Vercel Functions
- **Email:** Resend (opcional)

## 📋 Características

- ✅ Formulario de registro funcional
- ✅ Validación en tiempo real
- ✅ Almacenamiento en Google Forms
- ✅ Notificaciones por email (opcional)
- ✅ Diseño responsive
- ✅ SEO optimizado
- ✅ Botón scroll-to-top
- ✅ Widget Ko-fi integrado

## 🔧 Configuración del Formulario

### Google Forms Setup

1. **Crear formulario** en [forms.google.com](https://forms.google.com)
2. **Agregar campos** en este orden:
   - Nombre Completo (Texto corto)
   - Email (Email)
   - País y Ciudad (Texto corto)
   - WhatsApp (Texto corto)
   - Modalidad de Asistencia (Múltiple choice)
   - Consentimiento de Datos (Casilla de verificación)
3. **Obtener IDs** de los campos (inspeccionar elemento)
4. **Obtener URL** del formulario (reemplazar `/viewform` por `/formResponse`)

### Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```
GOOGLE_FORM_URL=https://docs.google.com/forms/d/e/TU_FORM_ID/formResponse
ADMIN_EMAIL=tu@email.com
RESEND_API_KEY=re_1234567890abcdef (opcional)
```

## 🚀 Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes de UI (shadcn/ui)
│   ├── Header.tsx      # Navegación
│   ├── HeroSection.tsx # Sección principal
│   ├── AboutSection.tsx
│   ├── RegistrationSection.tsx # Formulario de registro
│   └── DonationSection.tsx
├── pages/              # Páginas
├── hooks/              # Custom hooks
├── lib/                # Utilidades
└── main.tsx           # Punto de entrada

api/
└── register.js        # Vercel Function para el formulario
```

## 🔗 Enlaces

- **Sitio web:** [frecuencia44.vercel.app](https://frecuencia44.vercel.app)
- **Documentación:** [GOOGLE_FORMS_SETUP.md](./GOOGLE_FORMS_SETUP.md)

## 📊 Monitoreo

- **Vercel Analytics:** Métricas de rendimiento
- **Google Forms:** Registros en tiempo real
- **Resend:** Notificaciones por email

## 🛠️ Mantenimiento

- **Deploy automático** en Vercel
- **Logs** en Vercel Dashboard
- **Registros** en Google Forms Dashboard
- **Backup** automático en Google Sheets

## 📞 Soporte

Para problemas técnicos:
1. Revisar logs en Vercel Dashboard
2. Verificar variables de entorno
3. Probar formulario de Google Forms directamente
4. Revisar IDs de campos en `api/register.js`
