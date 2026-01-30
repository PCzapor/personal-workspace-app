import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/helpers"

const alertVariants = cva("rounded-2xl border p-4 flex items-start gap-3", {
  variants: {
    variant: {
      error: "bg-red-500/10 border-red-500/30 text-red-300",
      warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-300",
      info: "bg-blue-500/10 border-blue-500/30 text-blue-300",
      success: "bg-green-500/10 border-green-500/30 text-green-300",
    },
    size: {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
    },
  },
  defaultVariants: {
    variant: "error",
    size: "md",
  },
})

interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode
  onClose?: () => void
}

function AlertBase(
  { variant, icon, size, onClose, className, children, ...props }: AlertProps,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      role='alert'
      className={cn(alertVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <div className='shrink-0'>{icon}</div>}
      <div className='flex-1 text-sm'>{children}</div>

      {onClose && (
        <button
          onClick={onClose}
          className='shrink-0 text-white/50 hover:text-white/80 transition-colors'
          aria-label='Close alert'
        >
          ✕
        </button>
      )}
    </div>
  )
}

export const Alert = React.forwardRef(AlertBase)
Alert.displayName = "Alert"
