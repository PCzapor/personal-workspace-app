import { Card } from "@/features/ui/custom"
import { formatDate } from "@/lib/helpers"
import React from "react"

type RecentActivityProps = {
  recentNotes: Array<{ id: string; title: string; updatedAt: string }>
  recentLinks: Array<{
    id: string
    url: string
    title: string | null
    createdAt: string
  }>
}

export function RecentActivity({
  recentNotes,
  recentLinks,
}: RecentActivityProps) {
  return (
    <Card title='Recent Activity'>
      <div className='grid gap-3 md:grid-cols-2'>
        <div>
          {recentNotes.slice(0, 3).map((note) => {
            const formatted = formatDate(note.updatedAt)

            return (
              <Card key={note.id} className='my-2'>
                <p className='text-l text-white/80'>Note: {note.title}</p>
                <p className='mt-1 text-xs text-white/45'>{formatted}</p>
              </Card>
            )
          })}
        </div>
        <div>
          {recentLinks.slice(0, 3).map((link) => {
            const formatted = formatDate(link.createdAt)
            const href =
              link.url.startsWith("http://") || link.url.startsWith("https://")
                ? link.url
                : `https://${link.url}`
            return (
              <Card key={link.id} className='mb-2'>
                <p className='text-l text-white/80'>
                  Link:
                  <a href={href} target='_blank' rel='noopener'>
                    {" "}
                    {link.url}
                  </a>
                </p>
                <p className='text-sm text-white/80'> {link?.title}</p>

                <p className='mt-1 text-xs text-white/45'>{formatted}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
