import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    const variants = {
      primary: 'bg-white/10 hover:bg-white/15 border-white/20',
      secondary: 'bg-white/5 hover:bg-white/10 border-white/10',
      danger: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/20 text-red-400',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
    }

    return (
      <button
        ref={ref}
        className={`
          ${sizes[size]} ${variants[variant]}
          rounded-xl border
          text-white/80 hover:text-white
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          font-medium
          ${className || ''}
        `}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
