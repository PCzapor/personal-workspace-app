import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/helpers"

const formButtonVariants = cva(
  "rounded-xl border font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-white/90 text-black hover:bg-black/65 hover:text-white border-transparent",
        secondary:
          "bg-white/10 hover:bg-white/15 border-white/20 text-white/80 hover:text-white",
        danger: "bg-red-500/80 text-white hover:bg-red-600 border-red-500/50",
        outline:
          "border-white/20 text-white/80 hover:bg-white/5 hover:text-white",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

interface FormButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof formButtonVariants> {
  isLoading?: boolean
  loadingText?: string
}

function FormButtonBase(
  {
    variant,
    size,
    isLoading = false,
    loadingText,
    className,
    children,
    disabled,
    ...props
  }: FormButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(formButtonVariants({ variant, size }), className)}
      {...props}
    >
      {isLoading ? loadingText || "Loading..." : children}
    </button>
  )
}

export const FormButton = React.forwardRef(FormButtonBase)
FormButton.displayName = "FormButton"
