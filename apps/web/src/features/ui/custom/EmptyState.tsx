import React from "react"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
    {icon && <div className="text-4xl opacity-50">{icon}</div>}
    <h3 className="text-lg font-medium text-white/80">{title}</h3>
    {description && <p className="text-sm text-white/50 max-w-sm">{description}</p>}
    {action && <div className="mt-4">{action}</div>}
  </div>
)
