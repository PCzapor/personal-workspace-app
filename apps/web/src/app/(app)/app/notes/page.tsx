import { notesApi } from "@/features/notes/api"
import { NotesSplitView } from "@/features/notes/components/NotesSplitView"
import type { Note } from "@/features/notes/types"

export const metadata = {
  title: "Notes",
}

export default async function NotesPage() {
  let initialNotes: Note[] = []

  try {
    initialNotes = await notesApi.listNotes()
  } catch (error) {
    console.error("Failed to load initial notes:", error)
  }

  return (
    <main className="flex flex-col h-full bg-transparent text-white gap-0">
      <div className="flex-1 overflow-hidden">
        <NotesSplitView initialNotes={initialNotes} />
      </div>
    </main>
  )
}
