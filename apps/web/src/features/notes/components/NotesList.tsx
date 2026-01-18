"use client"

import { useState } from "react"
import type { Note } from "../types"

type NotesListProps = {
  notes: Note[]
  selectedId?: string | undefined
  onSelect: (note: Note) => void
  onNewNote: () => void
  isCreating: boolean
}

export function NotesList({
  notes,
  selectedId,
  onSelect,
  onNewNote,
  isCreating,
}: NotesListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full gap-3 p-4">
      <button
        onClick={onNewNote}
        disabled={isCreating}
        className="w-full px-4 py-3 bg-white/90 text-black rounded-2xl font-medium hover:bg-white disabled:opacity-50 transition-all"
        aria-label="Create new note"
      >
        {isCreating ? "Creating..." : "+ New Note"}
      </button>

      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 bg-white/[0.04] border border-white/10 rounded-2xl text-white/80 placeholder-white/35 focus:outline-none focus:ring-1 focus:ring-white/20"
        aria-label="Search notes"
      />

      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {filteredNotes.length === 0 ? (
          <div className="text-center text-white/50 py-8">
            <p>{searchTerm ? "No notes found" : "No notes yet"}</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => onSelect(note)}
              className={`w-full text-left px-4 py-3 rounded-2xl transition-all ${
                selectedId === note.id
                  ? "bg-white/[0.08] border border-white/30 ring-1 ring-white/20"
                  : "bg-white/[0.04] border border-white/10 hover:bg-white/[0.06]"
              }`}
              role="option"
              aria-selected={selectedId === note.id}
            >
              <h3 className="font-medium text-white/90 truncate">
                {note.title || "Untitled"}
              </h3>
              <p className="text-xs text-white/50 line-clamp-2 mt-1">
                {note.content || "No content"}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
