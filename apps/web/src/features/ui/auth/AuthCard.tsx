export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <section className='w-full max-w-md rounded-3xl border border-white/15 bg-white/30 p-6 shadow-2xl backdrop-blur-xl'>
      <div className='pointer-events-none absolute inset-0 rounded-3xl bg-black/15' />
      <div className='relative'>{children}</div>
    </section>
  )
}
