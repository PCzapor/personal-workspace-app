import type { ReactNode } from "react"
import BackgroundImage from "@/features/ui/backgroundImage/BackgroundImage"
import { AuthApiServer } from "@/features/auth/AuthApi.server"
import { redirect } from "next/navigation"
import { AuthProvider } from "@/features/auth/AuthProvider"
import { AppShell } from "./AppShell"

export default async function AppLayout({ children }: { children: ReactNode }) {
  const me = await AuthApiServer.authMe()
  if (me) {
    return (
      <AuthProvider>
        <div className='min-h-dvh'>
          <BackgroundImage imgSrc='/Dashboard_background.jpg' />
          <div className='absolute inset-0 bg-black/35' />
          <div className='relative mx-auto max-w-6xl px-6 py-6 space-y-4'>
            <AppShell>{children}</AppShell>
          </div>
        </div>
      </AuthProvider>
    )
  }
  redirect("/api/session/refresh")
}
