"server-only"
import ApiService from "@/lib/api/api.service"
import { cookies } from "next/headers"
import type { SavedLink } from "./types"

export class LinksApiServer {
  static async listLinks(): Promise<SavedLink[]> {
    const cookie = (await cookies()).toString()
    try {
      const { data } = await ApiService.get<SavedLink[]>("/api/links", {
        headers: { cookie },
      })
      return data || []
    } catch (error) {
      console.error("Failed to list links:", error)
      return []
    }
  }

  static async getLink(id: string): Promise<SavedLink | null> {
    const cookie = (await cookies()).toString()
    try {
      const { data } = await ApiService.get<SavedLink>(`/api/links/${id}`, {
        headers: { cookie },
      })
      return data || null
    } catch (error) {
      console.error("Failed to get link:", error)
      return null
    }
  }
}
