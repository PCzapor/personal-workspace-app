"use client"

import { useState } from "react"
import type { Note } from "../types"
import { FormButton,  EmptyState } from "@/features/ui/custom"
import { TextInput } from "@/features/ui/custom/TextInput"

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

      <TextInput
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search notes"
      />
      
      <FormButton
        onClick={onNewNote}
        disabled={isCreating}
        isLoading={isCreating}
        loadingText="Creating..."
        className="w-full"
      >
        + New Note
      </FormButton>

      <div className="flex-1 overflow-y-auto space-y-2 ">
        {filteredNotes.length === 0 ? (
          <EmptyState
            title={searchTerm ? "No notes found" : "No notes yet"}
            description={searchTerm ? "Try a different search term" : "Create one to get started"}
          />
        ) : (
          filteredNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => onSelect(note)}
              className={`w-full text-left px-4 py-3 rounded-2xl transition-all ${
                selectedId === note.id
                  ? "bg-white/8 border border-white/30 ring-1 ring-white/20"
                  : "bg-white/4 border border-white/10 hover:bg-white/6"
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
