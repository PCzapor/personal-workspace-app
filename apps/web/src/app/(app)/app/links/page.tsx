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
    <Card
      sectionTitle='Saved Links'
      description='Bookmark and organize your important links'
    >
      <Suspense fallback={<LinkSkeleton count={6} />}>
        <LoadLinks />
      </Suspense>
    </Card>
  )
}
