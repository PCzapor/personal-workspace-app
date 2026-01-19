"server-only"
import ApiService from "@/lib/api/api.service"
import { cookies } from "next/headers"
import type { Note } from "./types"

export class NotesApiServer {
  static async listNotes(): Promise<Note[]> {
    const cookie = (await cookies()).toString()
    try {
      const { data } = await ApiService.get<Note[]>("/api/notes", {
        headers: { cookie },
      })
      return data || []
    } catch (error) {
      console.error("Failed to list notes:", error)
      return []
    }
  }

  static async getNote(id: string): Promise<Note | null> {
    const cookie = (await cookies()).toString()
    try {
      const { data } = await ApiService.get<Note>(`/api/notes/${id}`, {
        headers: { cookie },
      })
      return data || null
    } catch (error) {
      console.error("Failed to get note:", error)
      return null
    }
  }
}
