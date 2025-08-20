import { API_CONFIG, buildApiUrl, getHeaders } from '@/config/api';

export interface RegistrationData {
  fullName: string;
  email: string;
  countryCity: string;
  whatsapp?: string;
  virtualAttendance: boolean;
  inPersonAttendance: boolean;
  dataConsent: boolean;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
}

/**
 * Servicio para manejar el registro de participantes
 */
export class RegistrationService {
  /**
   * Envía los datos de registro
   */
  static async submitRegistration(data: RegistrationData): Promise<RegistrationResponse> {
    try {
      // Validaciones adicionales
      if (!this.validateEmail(data.email)) {
        return {
          success: false,
          message: 'El formato del email no es válido.'
        };
      }

      if (!this.validateFullName(data.fullName)) {
        return {
          success: false,
          message: 'El nombre completo debe tener al menos 2 palabras.'
        };
      }

      // Intentar enviar a la API principal
      const response = await this.sendToAPI(data);
      
      if (response.success) {
        return response;
      }

      // Si falla, usar Formspree como fallback
      return await this.sendToFormspree(data);

    } catch (error) {
      console.error('Error en el registro:', error);
      return {
        success: false,
        message: 'Error de conexión. Por favor, intenta nuevamente.'
      };
    }
  }

  /**
   * Envía datos a la API principal
   */
  private static async sendToAPI(data: RegistrationData): Promise<RegistrationResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.REGISTER), {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: 'frecuencia44-landing-page',
          userAgent: navigator.userAgent
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          message: 'Registro exitoso. Recibirás el enlace de acceso por email.',
          registrationId: result.id
        };
      }

      return {
        success: false,
        message: 'Error en el servidor. Usando método alternativo...'
      };

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          success: false,
          message: 'Tiempo de espera agotado. Usando método alternativo...'
        };
      }
      
      return {
        success: false,
        message: 'Error de conexión. Usando método alternativo...'
      };
    }
  }

  /**
   * Envía datos a Formspree como fallback
   */
  private static async sendToFormspree(data: RegistrationData): Promise<RegistrationResponse> {
    try {
      const formData = new FormData();
      formData.append('fullName', data.fullName);
      formData.append('email', data.email);
      formData.append('countryCity', data.countryCity);
      if (data.whatsapp) {
        formData.append('whatsapp', data.whatsapp);
      }
      formData.append('virtualAttendance', data.virtualAttendance.toString());
      formData.append('inPersonAttendance', data.inPersonAttendance.toString());
      formData.append('dataConsent', data.dataConsent.toString());
      formData.append('timestamp', new Date().toISOString());
      formData.append('source', 'frecuencia44-landing-page');
      formData.append('userAgent', navigator.userAgent);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(API_CONFIG.FALLBACK.FORMSFREE, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return {
          success: true,
          message: 'Registro exitoso. Recibirás el enlace de acceso por email.',
          registrationId: `formspree-${Date.now()}`
        };
      }

      return {
        success: false,
        message: 'Error al enviar el formulario. Por favor, intenta nuevamente.'
      };

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          success: false,
          message: 'Tiempo de espera agotado. Por favor, intenta nuevamente.'
        };
      }
      
      return {
        success: false,
        message: 'Error de conexión. Por favor, verifica tu conexión a internet.'
      };
    }
  }

  /**
   * Valida el formato del email
   */
  private static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Valida el nombre completo
   */
  private static validateFullName(fullName: string): boolean {
    const words = fullName.trim().split(/\s+/);
    return words.length >= 2 && words.every(word => word.length >= 2);
  }

  /**
   * Valida el número de WhatsApp
   */
  static validateWhatsApp(whatsapp: string): boolean {
    if (!whatsapp) return true; // Es opcional
    const whatsappRegex = /^\+?[\d\s\-\(\)]+$/;
    return whatsappRegex.test(whatsapp) && whatsapp.replace(/\D/g, '').length >= 10;
  }

  /**
   * Simula el envío para desarrollo (solo en modo desarrollo)
   */
  static async simulateRegistration(data: RegistrationData): Promise<RegistrationResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Registro simulado exitoso. En producción, esto se enviaría a la API real.',
          registrationId: `dev-${Date.now()}`
        });
      }, 2000);
    });
  }
}
