import { Skeleton } from "@/features/ui/skeleton/Skeleton"

export default function LoadingApp() {
  return (
    <div className='min-h-dvh bg-zinc-950 text-zinc-50'>
      <div className='mx-auto max-w-6xl px-6 py-6 space-y-4'>
        <div className='rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-4 shadow-2xl'>
          <div className='flex items-center justify-between'>
            <div className='space-y-2'>
              <Skeleton className='h-3 w-24' />
              <Skeleton className='h-4 w-56' />
            </div>
            <div className='flex gap-2'>
              <Skeleton className='h-9 w-24 rounded-2xl' />
              <Skeleton className='h-9 w-24 rounded-2xl' />
            </div>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-[280px,1fr] md:items-start'>
          <div className='rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl md:sticky md:top-6'>
            <Skeleton className='h-3 w-20' />
            <div className='mt-4 space-y-2'>
              <Skeleton className='h-9 w-full rounded-2xl' />
              <Skeleton className='h-9 w-full rounded-2xl' />
              <Skeleton className='h-9 w-full rounded-2xl' />
              <Skeleton className='h-9 w-full rounded-2xl' />
            </div>
            <div className='mt-5'>
              <Skeleton className='h-20 w-full rounded-2xl' />
            </div>
          </div>

          <div className='min-w-0 space-y-4'>
            <div className='grid gap-4 md:grid-cols-3'>
              <Skeleton className='h-56 rounded-3xl' />
              <Skeleton className='h-56 rounded-3xl' />
              <Skeleton className='h-56 rounded-3xl' />
            </div>
            <Skeleton className='h-48 rounded-3xl' />
          </div>
        </div>
      </div>
    </div>
  )
}
