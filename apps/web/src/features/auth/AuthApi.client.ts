import ApiService from "../../lib/api/api.service"
import type { AuthUser, LoginBody, RegisterBody } from "@/features/auth/types"

export class AuthApiClient {
  static async refreshSession() {
    try {
      const { data } = await ApiService.get<AuthUser>("/api/auth/refresh", {})
      return data
    } catch {
      return Promise.reject("Refresh tokens failed")
    }
  }

  static async authMe() {
    try {
      const { data } = await ApiService.get<AuthUser>("/api/auth/me")
      return data
    } catch {
      return null
    }
  }

  static async login(email: string, password: string, rememberMe: boolean) {
    try {
      await ApiService.post<AuthUser, LoginBody>("/api/auth/login", {
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
      await ApiService.post<RegisterBody>("/api/auth/register", {
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
      await ApiService.post("/api/auth/logout", {})
      return true
    } catch {
      return false
    }
  }
}
