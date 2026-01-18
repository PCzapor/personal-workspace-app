"server-only"
import ApiService from "@/lib/api/api.service"
import { cookies } from "next/headers"
import { AuthUser } from "@/features/auth/types"

const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "http://localhost:3000"

export class AuthApiServer {
  static async authMe() {
    const cookie = (await cookies()).toString()
    try {
      const { data } = await ApiService.get<AuthUser>("/api/auth/me", {
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
      const { data } = await ApiService.post<AuthUser>(
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

  static async logout() {
    const cookie = (await cookies()).toString()

    const res = await fetch(`${APP_ORIGIN}/api/auth/refresh`, {
      method: "POST",
      headers: { cookie },
      cache: "no-store",
    })
    if (!res.ok) return null
    return res.json()
  }
}
