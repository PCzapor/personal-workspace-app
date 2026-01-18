"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { notesApi } from "../api"
import { useDebouncedCallback } from "../../../lib/hooks/useDebouncedCallback"
import type { Note } from "../types"
import { NotesList } from "./NotesList"
import { NoteEditor } from "./NoteEditor"
import { NotesSplitViewSkeleton } from "./NotesSkeleton"

type SaveStatus = "idle" | "saving" | "saved"

type NotesSplitViewProps = {
  initialNotes?: Note[]
}

export function NotesSplitView({ initialNotes = [] }: NotesSplitViewProps) {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>(initialNotes)
  const [selectedId, setSelectedId] = useState<string | undefined>(() => {
    if (initialNotes && initialNotes.length > 0) {
      return initialNotes[0]?.id
    }
    return undefined
  })
  const [isLoading, setIsLoading] = useState(!initialNotes || initialNotes.length === 0)
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
      setIsLoading(true)
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
      if (err.response?.status === 401) {
        router.push("/login")
        return
      }
      setError("Failed to load notes")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedSave = useDebouncedCallback(
    async (id: string, updates: { title?: string; content?: string }) => {
      try {
        setSaveStatus("saving")
        const updated = await notesApi.updateNote(id, updates)
        setNotes((prev) =>
          prev.map((n) => (n.id === id ? updated : n))
        )
        setSaveStatus("saved")
        setTimeout(() => setSaveStatus("idle"), 2000)
        setError(null)
      } catch (err: any) {
        if (err.response?.status === 401) {
          router.push("/login")
          return
        }
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
      if (err.response?.status === 401) {
        router.push("/login")
        return
      }
      const errorMsg = err.response?.data?.message || err.message || "Failed to create note"
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
      if (err.response?.status === 401) {
        router.push("/login")
        return
      }
      setError("Failed to delete note")
      console.error(err)
    } finally {
      setIsDeleting(false)
    }
  }

  if (isLoading) {
    return <NotesSplitViewSkeleton />
  }

  return (
    <div className="grid md:grid-cols-[320px_1fr] gap-4 h-full">
      <div className="bg-white/[0.04] border border-white/10 rounded-3xl backdrop-blur overflow-hidden flex flex-col">
        <NotesList
          notes={notes}
          selectedId={selectedId}
          onSelect={(note) => setSelectedId(note.id)}
          onNewNote={handleNewNote}
          isCreating={isCreating}
        />
      </div>

      <div className="bg-white/[0.04] border border-white/10 rounded-3xl backdrop-blur overflow-hidden flex flex-col">
        {notes.length === 0 ? (
          <div className="flex items-center justify-center h-full text-white/50 flex-col gap-2">
            <p className="text-lg">No notes yet</p>
            <p className="text-sm">Create one to get started</p>
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
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500/80 text-white px-4 py-3 rounded-2xl text-sm" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
