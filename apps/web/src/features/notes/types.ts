export type Note = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export type CreateNoteDto = {
  title?: string
  content?: string
}

export type UpdateNoteDto = {
  title?: string
  content?: string
}

export type NotesError = {
  message: string
  code?: string
}
