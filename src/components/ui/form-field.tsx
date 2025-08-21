import * as React from "react"
import { useFormContext } from "react-hook-form"
import { cn } from "@/lib/utils"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface FormFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: string
  required?: boolean
  className?: string
  description?: string
  children?: React.ReactNode
}

export const FormFieldComponent = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ name, label, placeholder, type = "text", required = false, className, description, children, ...props }, ref) => {
    const form = useFormContext()

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn("space-y-2", className)}>
            <FormLabel className="text-sm font-medium text-foreground">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            <FormControl>
              {children || (
                <input
                  {...field}
                  {...props}
                  ref={ref}
                  type={type}
                  placeholder={placeholder}
                  className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    form.formState.errors[name] && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              )}
            </FormControl>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
)

FormFieldComponent.displayName = "FormFieldComponent"

// Componente específico para campos de radio
export const FormRadioGroup = React.forwardRef<HTMLInputElement, FormFieldProps & {
  options: { value: string; label: string }[]
}>(
  ({ name, label, required = false, className, options, ...props }, ref) => {
    const form = useFormContext()

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn("space-y-3", className)}>
            <FormLabel className="text-sm font-medium text-foreground">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            <FormControl>
              <div className="space-y-3">
                {options.map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      {...field}
                      {...props}
                      ref={ref}
                      type="radio"
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="text-accent focus:ring-accent"
                    />
                    <span className="text-foreground">{option.label}</span>
                  </label>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
)

FormRadioGroup.displayName = "FormRadioGroup"

// Componente específico para checkbox
export const FormCheckbox = React.forwardRef<HTMLInputElement, FormFieldProps & {
  checkboxLabel?: string
}>(
  ({ name, label, required = false, className, checkboxLabel, ...props }, ref) => {
    const form = useFormContext()

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn("space-y-2", className)}>
            <FormControl>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  {...field}
                  {...props}
                  ref={ref}
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="text-accent focus:ring-accent mt-1"
                />
                <span className="text-sm text-foreground">
                  {checkboxLabel || label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
)

FormCheckbox.displayName = "FormCheckbox"
