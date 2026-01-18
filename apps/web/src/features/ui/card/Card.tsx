export function Card({
  title,
  children,
  right,
}: {
  title?: string
  children: React.ReactNode
  right?: React.ReactNode
}) {
  return (
    <section className='rounded-3xl border border-white/10 bg-black/15 p-5 shadow-2xl'>
      {title ? (
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-sm font-medium text-white/80'>{title}</h2>
          {right ?? null}
        </div>
      ) : null}
      {children}
    </section>
  )
}
