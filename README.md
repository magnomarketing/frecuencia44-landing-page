# Frecuencia 44 - Landing Page v1.0.0

Landing page para la Masterclass Frecuencia 44, una experiencia de transformación espiritual y coherencia grupal.

**Versión de Producción**: 1.0.0  
**Fecha de Lanzamiento**: 27 de Enero, 2025

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
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2f6b30f4-4181-443b-a947-74d7fd06eb08) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
