import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/helpers"

const inputVariants = cva(
  "px-4 py-2.5 rounded-2xl bg-white/4 border text-white/90 placeholder-white/35 transition-all focus:outline-none focus:ring-2",
  {
    variants: {
      state: {
        default: "border-white/10 focus:ring-white/20 focus:border-white/20",
        error:
          "border-red-400/50 focus:ring-red-400/20 focus:border-red-400/40",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
)

interface TextInputProps
  extends
    React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helpText?: string
}

function TextInputBase(
  { label, error, helpText, className, id, ...props }: TextInputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const inputId = id || React.useId()
  const state = error ? "error" : "default"

  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label htmlFor={inputId} className='text-sm font-medium text-white/70'>
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined
        }
        className={cn(inputVariants({ state }), className)}
        {...props}
      />

      {error && (
        <p id={`${inputId}-error`} className='text-xs text-red-400'>
          {error}
        </p>
      )}

      {helpText && !error && (
        <p id={`${inputId}-help`} className='text-xs text-white/40'>
          {helpText}
        </p>
      )}
    </div>
  )
}

export const TextInput = React.forwardRef(TextInputBase)
TextInput.displayName = "TextInput"
