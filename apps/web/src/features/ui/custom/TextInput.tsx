import React from "react"

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <label className="text-sm font-medium text-white/70">{label}</label>}
        <input
          ref={ref}
          className={`
            px-4 py-2.5 rounded-2xl
            bg-white/[0.04] border border-white/10
            text-white/90 placeholder-white/35
            focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20
            transition-all
            ${error ? 'border-red-400/50 focus:ring-red-400/20' : ''}
            ${className || ''}
          `}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)
TextInput.displayName = "TextInput"
