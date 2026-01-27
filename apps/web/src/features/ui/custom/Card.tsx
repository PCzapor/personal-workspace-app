import React from "react"

interface CardProps {
  title?: string
  children: React.ReactNode
}

export function Card({ title, children }: CardProps) {
  return (
    <section className='rounded-3xl border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl'>
      {title ? (
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-sm font-medium text-white'>{title}</h2>
        </div>
      ) : null}
      {children}
    </section>
  )
}
