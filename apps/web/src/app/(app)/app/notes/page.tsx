import { NotesApiServer } from "@/features/notes/api.server"
import { NotesSplitView } from "@/features/notes/components/NotesSplitView"
import { Card, NotesSplitViewSkeleton } from "@/features/ui/custom"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Notes",
  description: "Bookmark and organize your important notes",
}

export default async function NotesPage() {
  const initialNotes = await NotesApiServer.listNotes()

  return (
    <Card
      sectionTitle='Saved Notes'
      description='Bookmark and organize your important notes'
    >
      <Suspense fallback={<NotesSplitViewSkeleton />}>
        <NotesSplitView initialNotes={initialNotes} />
      </Suspense>
    </Card>
  )
}
