import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/helpers"

const buttonVariants = cva(
  "rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-white/90 text-black hover:bg-black/55 hover:text-white",
        secondary:
          "bg-white/10 hover:bg-white/15 border border-white/20 text-white/80 hover:text-white",
        danger:
          "bg-red-500/80 text-white hover:bg-red-600 border border-red-500/50",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

function ButtonBase(
  { variant, size, className, children, ...props }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  )
}

export const Button = React.forwardRef(ButtonBase)
Button.displayName = "Button"
