"use client"

import { useEffect, useState } from "react"
import type { Note } from "../types"
import { Button } from "@/features/ui/custom"

type NoteEditorProps = {
  note: Note | null
  onTitleChange: (title: string) => void
  onContentChange: (content: string) => void
  onDelete: () => void
  isSaving: boolean
  saveStatus: "idle" | "saving" | "saved"
  isDeleting: boolean
}

export function NoteEditor({
  note,
  onTitleChange,
  onContentChange,
  onDelete,
  isSaving,
  saveStatus,
  isDeleting,
}: NoteEditorProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setShowDeleteConfirm(false)
    }
  }, [note])

  if (!note) {
    return (
      <div className='flex items-center justify-center h-full text-white/50 flex-col gap-3'>
        <p className='text-lg'>No note selected</p>
        <p className='text-sm'>Choose a note from the list to edit</p>
      </div>
    )
  }

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    onTitleChange(newTitle)
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    onContentChange(newContent)
  }

  const handleDeleteClick = () => {
    if (showDeleteConfirm) {
      onDelete()
    } else {
      setShowDeleteConfirm(true)
    }
  }

  return (
    <div className='flex flex-col h-full p-6 gap-4'>
      <div className='flex items-center justify-between'>
        <input
          type='text'
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder='Note title...'
          className='min-w-0 flex-1 text-xl font-semibold bg-transparent text-white/90 placeholder-white/35 focus:outline-none'
          aria-label='Note title'
        />
        <Button
          variant={showDeleteConfirm ? "danger" : "secondary"}
          size='sm'
          onClick={handleDeleteClick}
          isLoading={isDeleting}
          loadingText='...'
        >
          {showDeleteConfirm ? "Confirm?" : "Delete"}
        </Button>
      </div>

      <div className='text-xs text-white/70 space-y-1'>
        <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(note.updatedAt).toLocaleString()}</p>
      </div>

      <textarea
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder='Start typing your note...'
        className='flex-1 w-full bg-white/4 border border-white/10 rounded-2xl p-4 text-white/80 placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white/20 resize-none'
        aria-label='Note content'
      />

      <div className='flex items-center justify-between text-xs'>
        <div
          className='text-white/40'
          role='status'
          aria-live='polite'
          aria-atomic='true'
        >
          {saveStatus === "saving" && <span>Saving...</span>}
          {saveStatus === "saved" && (
            <span className='text-green-400/70'>Saved</span>
          )}
        </div>
        {showDeleteConfirm && (
          <button
            onClick={() => setShowDeleteConfirm(false)}
            className='text-white/40 hover:text-white/60 transition-colors'
            aria-label='Cancel delete'
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
