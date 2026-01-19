import React from "react"

interface LinkSkeletonProps {
  count?: number
}

export const LinkSkeleton: React.FC<LinkSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 animate-pulse"
        >
          <div className="h-5 bg-white/10 rounded-lg w-2/3 mb-2" />
          <div className="h-3 bg-white/5 rounded-lg w-1/2" />
        </div>
      ))}
    </div>
  )
}
