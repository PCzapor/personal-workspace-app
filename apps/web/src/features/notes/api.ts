import _ApiService from "@/lib/api/api.service"
import type { Note, CreateNoteDto, UpdateNoteDto } from "./types"

const BASE_PATH = "/api/notes"

export const notesApi = {
  async listNotes(): Promise<Note[]> {
    try {
      const { data } = await _ApiService.get<Note[]>(BASE_PATH)
      return data || []
    } catch (error) {
      console.error("Failed to list notes:", error)
      throw error
    }
  },

  async getNote(id: string): Promise<Note> {
    try {
      const { data } = await _ApiService.get<Note>(`${BASE_PATH}/${id}`)
      return data
    } catch (error) {
      console.error("Failed to get note:", error)
      throw error
    }
  },

  async createNote(payload: CreateNoteDto = {}): Promise<Note | null> {
    try {
      const { data } = await _ApiService.post<Note, CreateNoteDto>(
        BASE_PATH,
        payload,
      )
      return data
    } catch (error) {
      console.error("Failed to create note:", error)
      return null
    }
  },

  async updateNote(id: string, payload: UpdateNoteDto): Promise<Note> {
    try {
      const response = await _ApiService.patch<Note>(
        `${BASE_PATH}/${id}`,
        payload,
      )
      return response.data
    } catch (error) {
      console.error("Failed to update note:", error)
      throw error
    }
  },

  async deleteNote(id: string): Promise<void> {
    try {
      await _ApiService.delete(`${BASE_PATH}/${id}`)
    } catch (error) {
      console.error("Failed to delete note:", error)
      throw error
    }
  },
}
