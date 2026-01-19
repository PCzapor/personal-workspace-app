import ApiService from "@/lib/api/api.service"
import { SavedLink, CreateLinkInput, UpdateLinkInput } from "./types"

const BASE_PATH = "/api/links"

export const linksApi = {
  listLinks: async (): Promise<SavedLink[]> => {
    try {
      const { data } = await ApiService.get<SavedLink[]>(BASE_PATH)
      return data || []
    } catch (error) {
      console.error("Failed to fetch links:", error)
      throw error
    }
  },

  getLink: async (id: string): Promise<SavedLink> => {
    const { data } = await ApiService.get<SavedLink>(`${BASE_PATH}/${id}`)
    return data!
  },

  createLink: async (input: CreateLinkInput): Promise<SavedLink> => {
    const { data } = await ApiService.post<SavedLink>(BASE_PATH, input)
    return data!
  },

  updateLink: async (id: string, input: UpdateLinkInput): Promise<SavedLink> => {
    const { data } = await ApiService.patch<SavedLink>(`${BASE_PATH}/${id}`, input)
    return data!
  },

  deleteLink: async (id: string): Promise<void> => {
    await ApiService.delete(`${BASE_PATH}/${id}`)
  },
}
