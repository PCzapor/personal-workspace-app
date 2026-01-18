"use client"

import { useRouter } from "next/navigation"
import _ApiService from "@/lib/api/api.service"
import { AuthApiClient } from "@/features/auth/AuthApi.client"

export function LogoutButton() {
  const router = useRouter()

  const onLogout = async () => {
    try {
      await AuthApiClient.logout()
    } finally {
      router.replace("/login")
      router.refresh()
    }
  }

  return (
    <button
      onClick={onLogout}
      className='rounded-2xl bg-white/90 px-4 py-2 text-sm font-medium text-black hover:bg-white'
    >
      Logout
    </button>
  )
}
