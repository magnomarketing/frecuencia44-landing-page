import { z } from "zod"

// Esquema de validación para el formulario de registro
export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder 100 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El nombre solo puede contener letras y espacios"),
  
  email: z
    .string()
    .min(1, "El correo electrónico es requerido")
    .email("Ingresa un correo electrónico válido")
    .max(255, "El correo no puede exceder 255 caracteres"),
  
  location: z
    .string()
    .min(2, "País y ciudad son requeridos")
    .max(200, "La ubicación no puede exceder 200 caracteres"),
  
  whatsapp: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
      message: "Ingresa un número de WhatsApp válido"
    }),
  

  
  dataConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Debes aceptar el tratamiento de datos para continuar"
    })
})

// Tipo TypeScript derivado del esquema
export type RegistrationFormData = z.infer<typeof registrationSchema>

// Esquema para validación de email
export const emailSchema = z.object({
  email: z.string().email("Email inválido")
})

// Esquema para validación de nombre
export const nameSchema = z.object({
  name: z.string().min(2, "Nombre muy corto").max(50, "Nombre muy largo")
})

// Función helper para validar campos individuales
export const validateField = (field: keyof RegistrationFormData, value: any) => {
  try {
    const fieldSchema = registrationSchema.pick({ [field]: true })
    fieldSchema.parse({ [field]: value })
    return { isValid: true, error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message }
    }
    return { isValid: false, error: "Error de validación" }
  }
}
