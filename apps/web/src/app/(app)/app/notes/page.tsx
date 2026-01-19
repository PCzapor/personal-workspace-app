import { NotesApiServer } from "@/features/notes/api.server"
import { NotesSplitView } from "@/features/notes/components/NotesSplitView"

export const metadata = {
  title: "Notes",
}

export default async function NotesPage() {
  const initialNotes = await NotesApiServer.listNotes()

  return (
    <main className="flex flex-col h-full bg-transparent text-white gap-0">
      <div className="flex-1 overflow-hidden">
        <NotesSplitView initialNotes={initialNotes} />
      </div>
    </main>
  )
}
