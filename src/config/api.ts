/**
 * Configuración de la API
 */
export const API_CONFIG = {
  // URL principal de la API (puede ser cambiada según el entorno)
  BASE_URL: import.meta.env.VITE_API_URL || 'https://api.frecuencia44.com',
  
  // Endpoints
  ENDPOINTS: {
    REGISTER: '/register',
    SUBSCRIBE: '/subscribe',
    CONTACT: '/contact'
  },
  
  // URLs de fallback (Formspree, Netlify Forms, etc.)
  FALLBACK: {
    FORMSFREE: 'https://formspree.io/f/xayzqkqp',
    NETLIFY: '/.netlify/functions/register'
  },
  
  // Configuración de timeout
  TIMEOUT: 10000, // 10 segundos
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

/**
 * Función para construir URLs completas
 */
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

/**
 * Función para obtener headers con autenticación si es necesaria
 */
export const getHeaders = (additionalHeaders?: Record<string, string>) => {
  return {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...additionalHeaders
  };
};
