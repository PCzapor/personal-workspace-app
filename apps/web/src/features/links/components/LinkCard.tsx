"use client"

import React, { useState } from "react"
import { SavedLink } from "../types"
import { Button, TextInput } from "@/features/ui/custom"
interface LinkCardProps {
  link: SavedLink
  onEdit: (link: SavedLink) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, title?: string, description?: string) => Promise<void>
}

export function LinkCard({ link, onEdit, onDelete, onUpdate }: LinkCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(link.title || "")
  const [description, setDescription] = useState(link.description || "")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await onUpdate(link.id, title, description)
      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = () => {
    if (confirm("Delete this link?")) {
      onDelete(link.id)
    }
  }

  let hostname = link.url
  if (hostname.includes("www.")) {
    hostname = link.url.replace("www.", "")
  }

  if (isEditing) {
    return (
      <div className='p-4 rounded-2xl bg-white/4 border border-white/10 backdrop-blur-xl space-y-3'>
        <TextInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          label='Title'
        />
        <TextInput
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          label='Description'
          className='min-h-20'
        />
        <div className='flex gap-2 justify-end'>
          <Button
            variant='secondary'
            size='sm'
            onClick={() => {
              setTitle(link.title || "")
              setDescription(link.description || "")
              setIsEditing(false)
            }}
          >
            Cancel
          </Button>
          <Button
            size='sm'
            onClick={handleSave}
            isLoading={isSaving}
            loadingText='Saving...'
          >
            Save
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='p-4 rounded-2xl bg-white/4 border border-white/10 backdrop-blur-xl hover:bg-white/6 transition-all'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2'>
            <img
              src={`https://www.google.com/s2/favicons?domain=${link.url}`}
              alt='favicon'
              className='w-4 h-4 rounded'
            />
            <a
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-xs text-white/50 hover:text-white/70 truncate'
            >
              {hostname}
            </a>
          </div>
          <h3 className='text-white/90 font-medium truncate mt-2'>
            {title || link.url}
          </h3>
          {description && (
            <p className='text-sm text-white/60 line-clamp-2 mt-1'>
              {description}
            </p>
          )}
        </div>
        <div className='flex gap-2 shrink-0'>
          <Button
            variant='secondary'
            size='sm'
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button variant='danger' size='sm' onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
