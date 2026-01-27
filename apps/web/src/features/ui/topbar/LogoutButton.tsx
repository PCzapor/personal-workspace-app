"use client"

import { useRouter } from "next/navigation"
import _ApiService from "@/lib/api/api.service"
import { AuthApiClient } from "@/features/auth/AuthApi.client"
import { Button } from "../custom/Button"

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
    <Button
      onClick={onLogout}
    >
      Logout
    </Button>
  )
}
