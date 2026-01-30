import { cn } from "@/lib/helpers"
import { desc } from "framer-motion/client"
import React from "react"

interface CardProps {
  title?: string
  sectionTitle?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Card({
  title,
  sectionTitle,
  description,
  children,
  className,
}: CardProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl",
        className,
      )}
    >
      {sectionTitle ? (
        <div>
          <h1 className='text-3xl font-bold text-white'>{sectionTitle}</h1>
          {description ? (
            <p className='text-white/60 mt-2'>{description}</p>
          ) : null}
        </div>
      ) : null}
      {title ? (
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-xl font-medium text-white'>{title}</h2>
        </div>
      ) : null}
      {children}
    </section>
  )
}
