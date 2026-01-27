"use client"

import { useEffect, useState, useCallback } from "react"
import { notesApi } from "../api"
import { useDebouncedCallback } from "../../../lib/hooks/useDebouncedCallback"
import type { Note } from "../types"
import { NotesList } from "./NotesList"
import { NoteEditor } from "./NoteEditor"

type SaveStatus = "idle" | "saving" | "saved"

type NotesSplitViewProps = {
  initialNotes?: Note[]
}

export function NotesSplitView({ initialNotes = [] }: NotesSplitViewProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [selectedId, setSelectedId] = useState<string | undefined>(() => {
    if (initialNotes && initialNotes.length > 0) {
      return initialNotes[0]?.id
    }
    return undefined
  })
  const [isCreating, setIsCreating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const selectedNote = notes.find((n) => n.id === selectedId) || null

  useEffect(() => {
    if (initialNotes.length === 0) {
      loadNotes()
    }
  }, [])

  const loadNotes = async () => {
    try {
      const loaded = await notesApi.listNotes()
      setNotes(loaded)
      if (loaded.length > 0 && !selectedId) {
        const firstNote = loaded[0]
        if (firstNote) {
          setSelectedId(firstNote.id)
        }
      }
      setError(null)
    } catch (err: any) {
      setError("Failed to load notes")
      console.error(err)
    }
  }

  const debouncedSave = useDebouncedCallback(
    async (id: string, updates: { title?: string; content?: string }) => {
      try {
        setSaveStatus("saving")
        const updated = await notesApi.updateNote(id, updates)
        setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)))
        setSaveStatus("saved")
        setTimeout(() => setSaveStatus("idle"), 5000)
        setError(null)
      } catch (err: any) {
        setError("Failed to save note")
        setSaveStatus("idle")
        console.error(err)
      }
    },
    700
  )

  const handleTitleChange = useCallback(
    (title: string) => {
      if (selectedNote && title !== selectedNote.title) {
        setNotes((prev) =>
          prev.map((n) => (n.id === selectedId ? { ...n, title } : n))
        )
        debouncedSave(selectedId!, { title })
      }
    },
    [selectedNote, selectedId, debouncedSave]
  )

  const handleContentChange = useCallback(
    (content: string) => {
      if (selectedNote && content !== selectedNote.content) {
        setNotes((prev) =>
          prev.map((n) => (n.id === selectedId ? { ...n, content } : n))
        )
        debouncedSave(selectedId!, { content })
      }
    },
    [selectedNote, selectedId, debouncedSave]
  )

  const handleNewNote = async () => {
    try {
      setIsCreating(true)
      const newNote = await notesApi.createNote({})
      setNotes((prev) => [newNote, ...prev])
      setSelectedId(newNote.id)
      setError(null)
    } catch (err: any) {
      console.error("Create note error:", err)
      const errorMsg =
        err.response?.data?.message || err.message || "Failed to create note"
      setError(errorMsg)
    } finally {
      setIsCreating(false)
    }
  }

  const handleDelete = async () => {
    if (!selectedId) return

    try {
      setIsDeleting(true)
      await notesApi.deleteNote(selectedId)
      const updatedNotes = notes.filter((n) => n.id !== selectedId)
      setNotes(updatedNotes)

      if (updatedNotes.length > 0) {
        const nextNote = updatedNotes[0]
        if (nextNote) {
          setSelectedId(nextNote.id)
        }
      } else {
        setSelectedId(undefined)
      }
      setError(null)
    } catch (err: any) {
      setError("Failed to delete note")
      console.error(err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className='grid md:grid-cols-2 gap-4 h-full'>
      <NotesList
        notes={notes}
        selectedId={selectedId}
        onSelect={(note) => setSelectedId(note.id)}
        onNewNote={handleNewNote}
        isCreating={isCreating}
      />

      {notes.length === 0 ? (
        <div className='flex items-center justify-center h-full text-white flex-col gap-2'>
          <p className='text-lg'>No notes yet</p>
          <p className='text-sm'>Create one to get started</p>
        </div>
      ) : (
        <NoteEditor
          note={selectedNote}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
          onDelete={handleDelete}
          isSaving={saveStatus === "saving"}
          saveStatus={saveStatus}
          isDeleting={isDeleting}
        />
      )}

      {error && (
        <div
          className='fixed bottom-4 right-4 bg-red-500/80 text-white px-4 py-3 rounded-2xl text-sm'
          role='alert'
        >
          {error}
        </div>
      )}
    </div>
  )
}
