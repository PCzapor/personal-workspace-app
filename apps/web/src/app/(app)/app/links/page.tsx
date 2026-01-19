import { Suspense } from "react"
import { LinksApiServer } from "@/features/links/api.server"
import { LinksGrid } from "@/features/links/components/LinksGrid"
import { LinkSkeleton } from "@/features/links/components/LinkSkeleton"

export const metadata = {
  title: "Saved Links",
}

async function LoadLinks() {
  const links = await LinksApiServer.listLinks()
  return <LinksGrid initialLinks={links} />
}

export default function LinksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Saved Links</h1>
        <p className="text-white/60 mt-2">Bookmark and organize your important links</p>
      </div>

      <Suspense fallback={<LinkSkeleton count={6} />}>
        <LoadLinks />
      </Suspense>
    </div>
  )
}
