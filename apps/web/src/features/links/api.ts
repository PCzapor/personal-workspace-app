import __ApiService from "@/lib/api/api.service"
import { SavedLink, CreateLinkInput, UpdateLinkInput } from "./types"

const BASE_PATH = "/api/links"

export const linksApi = {
  async listLinks(): Promise<SavedLink[]> {
    try {
      const { data } = await __ApiService.get<SavedLink[]>(BASE_PATH)
      return data || []
    } catch (error) {
      console.error("Failed to fetch links:", error)
      throw error
    }
  },

  async getLink(id: string): Promise<SavedLink> {
    try {
      const { data } = await __ApiService.get<SavedLink>(`${BASE_PATH}/${id}`)
      return data!
    } catch (error) {
      console.error("Failed to fetch link:", error)
      throw error
    }
  },

  async createLink(input: CreateLinkInput): Promise<SavedLink> {
    try {
      const { data } = await __ApiService.post<SavedLink>(BASE_PATH, input)
      return data!
    } catch (error) {
      console.error("Failed to create link:", error)
      throw error
    }
  },

  async updateLink(id: string, input: UpdateLinkInput): Promise<SavedLink> {
    try {
      const { data } = await __ApiService.patch<SavedLink>(
        `${BASE_PATH}/${id}`,
        input
      )
      return data!
    } catch (error) {
      console.error("Failed to update link:", error)
      throw error
    }
  },

  async deleteLink(id: string): Promise<void> {
    try {
      await __ApiService.delete(`${BASE_PATH}/${id}`)
    } catch (error) {
      console.error("Failed to delete link:", error)
      throw error
    }
  },
}
