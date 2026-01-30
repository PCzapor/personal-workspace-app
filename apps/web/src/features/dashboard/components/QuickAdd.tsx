"use client"
import React from "react"
import { Alert, Button, Card, TextArea } from "../../ui/custom"
import { notesApi } from "@/features/notes/api"

export function QuickAdd() {
  const [quickNote, setQuickNote] = React.useState("")
  const [status, setStatus] = React.useState<"error" | "success" | null>(null)
  const handleSaveNote = async () => {
    const res = await notesApi.createNote({ content: quickNote })
    if (!res) {
      setStatus("error")
    }
    setStatus("success")
    setQuickNote("")
    setTimeout(() => setStatus(null), 5000)
  }
  return (
    <Card title='Quick add'>
      <div className='space-y-3'>
        <TextArea
          value={quickNote}
          onChange={(e) => setQuickNote(e.target.value)}
          placeholder='Write a thought, idea, or task...'
          className='resize-y'
        />
        <div className='flex justify-end'>
          {status ? (
            <Alert variant={status} size='sm' className='mr-auto'>
              {status === "success" ? "Note saved." : "Failed to save note."}
            </Alert>
          ) : null}
          <Button size='sm' disabled={!quickNote} onClick={handleSaveNote}>
            Save
          </Button>
        </div>
      </div>
    </Card>
  )
}
