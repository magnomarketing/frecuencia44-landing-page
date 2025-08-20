# Frecuencia 44 - Landing Page

Landing page para la Masterclass Frecuencia 44, una experiencia de transformación espiritual y coherencia grupal.

## 🚀 Características

- **Diseño Moderno**: Interfaz elegante y responsiva
- **Formulario de Registro Funcional**: Sistema completo de registro con validaciones
- **Navegación Suave**: Scroll automático a secciones
- **Logo Personalizado**: Diseño integrado con texto "Frecuencia 44"
- **Optimizado para Vercel**: Configurado para despliegue en Vercel

## 🚀 Despliegue en Vercel

### Opción 1: Despliegue Automático (Recomendado)

1. **Fork o clona este repositorio**
2. **Ve a [vercel.com](https://vercel.com)**
3. **Conecta tu cuenta de GitHub**
4. **Importa el proyecto**:
   - Haz clic en "New Project"
   - Selecciona tu repositorio `frecuencia44-landing-page`
   - Vercel detectará automáticamente que es un proyecto Vite
   - Haz clic en "Deploy"

### Opción 2: Despliegue Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Desplegar
vercel

# Para producción
vercel --prod
```

### Configuración Automática

El proyecto incluye:
- ✅ `vercel.json` - Configuración optimizada
- ✅ Headers de seguridad
- ✅ Cache optimizado para assets
- ✅ SPA routing configurado

## 📋 Formulario de Registro

### Funcionalidades Implementadas

✅ **Validación en Tiempo Real**
- Nombre completo (mínimo 2 palabras)
- Email válido
- País/Ciudad requerido
- WhatsApp opcional con validación
- Modalidad de asistencia (opcional)
- Consentimiento de datos obligatorio

✅ **Envío de Datos**
- API principal configurable
- Formspree como fallback
- Timeout de 10 segundos
- Manejo de errores robusto
- Simulación en desarrollo

✅ **Experiencia de Usuario**
- Indicadores de carga
- Mensajes de error claros
- Limpieza automática del formulario
- Scroll suave después del envío
- Notificaciones toast

### Configuración de API

El formulario está configurado para funcionar con:

1. **API Principal**: `https://api.frecuencia44.com/register`
2. **Fallback**: Formspree (`https://formspree.io/f/xayzqkqp`)
3. **Desarrollo**: Simulación local

### Variables de Entorno

```env
VITE_API_URL=https://tu-api.com
```

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **Vite** para build y desarrollo
- **Tailwind CSS** para estilos
- **Shadcn/ui** para componentes
- **Lucide React** para iconos
- **React Router** para navegación

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes de UI (shadcn)
│   ├── Navigation.tsx  # Navegación principal
│   ├── HeroSection.tsx # Sección hero
│   ├── Logo.tsx        # Logo simple
│   └── LogoWithText.tsx # Logo con texto integrado
├── services/           # Servicios
│   └── registrationService.ts # Servicio de registro
├── config/             # Configuración
│   └── api.ts          # Configuración de API
├── utils/              # Utilidades
│   └── scroll.ts       # Funciones de scroll
└── pages/              # Páginas
    └── Index.tsx       # Página principal
```

## 🎨 Componentes Principales

### Navigation
- Logo con texto integrado
- Menú responsive
- Botones de registro funcionales

### HeroSection
- Imagen de fondo optimizada
- Botones CTA funcionales
- Diseño impactante

### RegistrationSection
- Formulario completo funcional
- Validaciones robustas
- Envío de datos real

## 🔧 Configuración para Producción

### Vercel
El proyecto está optimizado para Vercel con:
- Build automático
- CDN global
- SSL automático
- Headers de seguridad
- Cache optimizado

### API Configuration
Para cambiar la API en producción, modifica:
```typescript
// src/config/api.ts
BASE_URL: 'https://tu-api-produccion.com'
```

## 📊 Datos del Formulario

El formulario envía los siguientes datos:

```typescript
interface RegistrationData {
  fullName: string;           // Nombre completo
  email: string;              // Email válido
  countryCity: string;        // País/Ciudad
  whatsapp?: string;          // WhatsApp (opcional)
  virtualAttendance: boolean; // Asistencia virtual
  inPersonAttendance: boolean; // Asistencia presencial
  dataConsent: boolean;       // Consentimiento de datos
}
```

## 🎯 Próximas Mejoras

- [ ] Integración con CRM
- [ ] Analytics de conversión
- [ ] A/B testing
- [ ] Notificaciones push
- [ ] PWA capabilities

## 📞 Soporte

Para soporte técnico o preguntas sobre el formulario, contacta al equipo de desarrollo.

---

**Frecuencia 44** - Transformación colectiva a través de la coherencia grupal
