import { Card } from "@/features/ui/card/Card"

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <div className='grid gap-4 md:grid-cols-3'>
        <Card title='Quick capture'>
          <div className='space-y-3'>
            <textarea
              placeholder='Write a thought, idea, or task...'
              className='min-h-[110px] w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-white/20'
            />
            <div className='flex justify-end'>
              <button className='rounded-2xl bg-white/90 px-4 py-2 text-sm font-medium text-black hover:bg-white'>
                Save
              </button>
            </div>
          </div>
        </Card>

        <Card title='Today'>
          <ul className='space-y-2 text-sm text-white/70'>
            <li className='flex items-center justify-between'>
              <span>Review notes</span>
              <span className='text-white/35'>—</span>
            </li>
            <li className='flex items-center justify-between'>
              <span>1 deep work block</span>
              <span className='text-white/35'>—</span>
            </li>
            <li className='flex items-center justify-between'>
              <span>Inbox zero (light)</span>
              <span className='text-white/35'>—</span>
            </li>
          </ul>
        </Card>

        <Card title='Pinned'>
          <div className='space-y-2'>
            <div className='rounded-2xl border border-white/10 bg-white/[0.04] p-3'>
              <p className='text-sm text-white/80'>⚡ Onboarding plan</p>
              <p className='text-xs text-white/45'>Checklist • 7 items</p>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/[0.04] p-3'>
              <p className='text-sm text-white/80'>🔗 System design links</p>
              <p className='text-xs text-white/45'>Links • 12 saved</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title='Recent activity'>
        <div className='grid gap-3 md:grid-cols-2'>
          <div className='rounded-2xl border border-white/10 bg-white/[0.04] p-4'>
            <p className='text-sm text-white/80'>Note: “Auth ideas”</p>
            <p className='mt-1 text-xs text-white/45'>Edited 5 minutes ago</p>
          </div>
          <div className='rounded-2xl border border-white/10 bg-white/[0.04] p-4'>
            <p className='text-sm text-white/80'>
              Link saved: “Prisma sessions”
            </p>
            <p className='mt-1 text-xs text-white/45'>Saved today</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
