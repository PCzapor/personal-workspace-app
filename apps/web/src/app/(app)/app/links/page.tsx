import { Suspense } from "react"
import { LinksApiServer } from "@/features/links/api.server"
import { LinksGrid } from "@/features/links/components/LinksGrid"
import { Card } from "@/features/ui/custom/Card"
import { Metadata } from "next"
import { LinkSkeleton } from "@/features/ui/custom"

export const metadata: Metadata = {
  title: "Saved Links",
  description: "Bookmark and organize your important links",
}

async function LoadLinks() {
  const links = await LinksApiServer.listLinks()
  return <LinksGrid initialLinks={links} />
}

export default function LinksPage() {
  return (
    <Card>
      <div>
        <h1 className='text-3xl font-bold text-white'>Saved Links</h1>
        <p className='text-white/60 mt-2'>
          Bookmark and organize your important links
        </p>
      </div>

      <Suspense fallback={<LinkSkeleton count={6} />}>
        <LoadLinks />
      </Suspense>
    </Card>
  )
}
