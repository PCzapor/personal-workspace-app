"use client"

export function NoteListItemSkeleton() {
  return (
    <div className="space-y-2 px-3">
      <div className="h-10 bg-white/[0.05] rounded-xl animate-pulse" />
      <div className="h-8 bg-white/[0.05] rounded-xl animate-pulse" />
    </div>
  )
}

export function NotesListSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-10 bg-white/[0.05] rounded-2xl animate-pulse px-3" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-3">
          <NoteListItemSkeleton />
        </div>
      ))}
    </div>
  )
}

export function NoteEditorSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="h-12 bg-white/[0.05] rounded-2xl animate-pulse" />
      <div className="flex-1 space-y-3">
        <div className="h-40 bg-white/[0.05] rounded-2xl animate-pulse" />
        <div className="h-40 bg-white/[0.05] rounded-2xl animate-pulse" />
      </div>
    </div>
  )
}

export function NotesSplitViewSkeleton() {
  return (
    <div className="grid md:grid-cols-[320px_1fr] gap-4 h-full">
      <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-4 backdrop-blur overflow-hidden">
        <NotesListSkeleton />
      </div>
      <div className="bg-white/[0.04] border border-white/10 rounded-3xl backdrop-blur overflow-hidden">
        <NoteEditorSkeleton />
      </div>
    </div>
  )
}
