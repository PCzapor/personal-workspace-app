"use client"

import React, { useState } from "react"
import { SavedLink } from "../types"
import { linksApi } from "../api"
import { Button, Alert, EmptyState } from "@/features/ui/custom"
import { LinkCard } from "./LinkCard"
import { useCallback } from "react"
import { TextInput } from "@/features/ui/custom/TextInput"

interface LinksGridProps {
  initialLinks: SavedLink[]
}

export function LinksGrid({ initialLinks }: LinksGridProps) {
  const [links, setLinks] = useState<SavedLink[]>(initialLinks)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const [newUrl, setNewUrl] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredLinks = links.filter((link) => {
    const query = searchTerm.toLowerCase()
    return (
      link.title?.toLowerCase().includes(query) ||
      false ||
      link.url.toLowerCase().includes(query) ||
      link.description?.toLowerCase().includes(query) ||
      false
    )
  })

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUrl.trim()) return

    setIsLoading(true)
    setError(null)
    try {
      const link = await linksApi.createLink({
        url: newUrl,
        title: newTitle,
      })
      setLinks([link, ...links])
      setNewUrl("")
      setNewTitle("")
      setIsAdding(false)
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("This link already exists")
      } else {
        setError(err.message || "Failed to add link")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = useCallback(
    async (id: string, title?: string, description?: string) => {
      try {
        const updateData: Record<string, string> = {}
        if (title !== undefined) updateData.title = title
        if (description !== undefined) updateData.description = description
        const updated = await linksApi.updateLink(id, updateData)
        setLinks((prev) => prev.map((l) => (l.id === id ? updated : l)))
      } catch (err) {
        console.error("Failed to update link:", err)
        throw err
      }
    },
    []
  )

  const handleDelete = useCallback(async (id: string) => {
    try {
      await linksApi.deleteLink(id)
      setLinks((prev) => prev.filter((l) => l.id !== id))
    } catch (err) {
      console.error("Failed to delete link:", err)
    }
  }, [])

  return (
    <div className='space-y-6'>
      <TextInput
        type='text'
        placeholder='Search links...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!isAdding ? (
        <Button onClick={() => setIsAdding(true)}>+ Add Link</Button>
      ) : (
        <form onSubmit={handleAddLink} className='space-y-3'>
          <TextInput
            type='text'
            placeholder='https://example.com'
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            required
            label='URL'
          />
          <TextInput
            type='text'
            placeholder='Optional title'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            label='Title'
          />
          {error && (
            <Alert variant='error' onClose={() => setError(null)}>
              {error}
            </Alert>
          )}
          <div className='flex gap-2'>
            <Button type='submit' isLoading={isLoading} loadingText='Adding...'>
              Add
            </Button>
            <Button
              type='button'
              variant='secondary'
              onClick={() => {
                setIsAdding(false)
                setNewUrl("")
                setNewTitle("")
                setError(null)
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {filteredLinks.length === 0 ? (
        <EmptyState
          title={
            links.length === 0 ? "No links yet" : "No links match your search"
          }
          description={
            links.length === 0
              ? "Add one to get started"
              : "Try a different search term"
          }
        />
      ) : (
        <div className='grid gap-3'>
          {filteredLinks.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              onEdit={() => {}}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  )
}
