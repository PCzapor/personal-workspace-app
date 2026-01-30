"server-only"
import _ApiService from "@/lib/api/api.service"
import { cookies } from "next/headers"
import { AuthUser } from "@/features/auth/types"
export class AuthApiServer {
  static async authMe() {
    const cookie = (await cookies()).toString()
    try {
      const { data } = await _ApiService.get<AuthUser>("/api/auth/me", {
        headers: { cookie },
      })
      if (!data) return false
      return data
    } catch (e) {
      return console.log("Error in auth me: ", e)
    }
  }

  static async refreshSession() {
    const cookie = (await cookies()).toString()
    try {
      const { data } = await _ApiService.post<AuthUser>(
        "/api/auth/refresh",
        {},
        {
          headers: { cookie },
        }
      )
      if (!data) return false
      return data
    } catch (e) {
      return console.log("Error in refresh me: ", e)
    }
  }
}
