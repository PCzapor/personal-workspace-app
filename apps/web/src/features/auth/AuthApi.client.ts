import type { AuthUser, LoginBody, RegisterBody } from "@/features/auth/types"
import _ApiService from "@/lib/api/api.service"

export class AuthApiClient {
  static async refreshSession() {
    try {
      const { data } = await _ApiService.get<AuthUser>("/api/auth/refresh", {})
      return data
    } catch {
      return Promise.reject("Refresh tokens failed")
    }
  }

  static async authMe() {
    try {
      const { data } = await _ApiService.get<AuthUser>("/api/auth/me")
      return data
    } catch {
      return null
    }
  }

  static async login(email: string, password: string, rememberMe: boolean) {
    try {
      await _ApiService.post<AuthUser, LoginBody>("/api/auth/login", {
        email,
        password,
        rememberMe,
      })
      return true
    } catch {
      return false
    }
  }

  static async register(email: string, password: string) {
    try {
      await _ApiService.post<RegisterBody>("/api/auth/register", {
        email,
        password,
      })
      return true
    } catch {
      return false
    }
  }

  static async logout() {
    try {
      await _ApiService.post("/api/auth/logout", {})
      return true
    } catch {
      return false
    }
  }
}
