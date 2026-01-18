"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import { AuthUser } from "./types"
import { useRouter } from "next/navigation"
import { AuthApiClient } from "@/features/auth/AuthApi.client"

type AuthStatus = "loading" | "auth" | "guest"

type AuthCtx = {
  status: AuthStatus
  user: AuthUser
  refresh: () => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [status, setStatus] = useState<AuthStatus>("loading")
  const [user, setUser] = useState<AuthUser | null>(null)
  const didInit = useRef(false)

  const loadSession = async () => {
    setStatus("loading")
    if (!user) {
      const me = await AuthApiClient.authMe()
      if (me) {
        setUser(me)
        setStatus("auth")
        return
      }
    }
    setUser(null)
    setStatus("guest")
    router.replace("/login")
  }

  useEffect(() => {
    if (didInit.current) return
    didInit.current = true
    void loadSession()
  }, [])

  const refresh = async () => {
    await loadSession()
  }

  const logout = async () => {
    await AuthApiClient.logout()
    setUser(null)
    setStatus("guest")
    router.replace("/login")
    router.refresh()
  }
  if (!user) return null
  return (
    <AuthContext.Provider value={{ status, user, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used withing AuthProvider")
  return ctx
}
