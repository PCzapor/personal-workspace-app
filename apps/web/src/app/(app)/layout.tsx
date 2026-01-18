import type { ReactNode } from "react"
import BackgroundImage from "@/features/ui/backgroundImage/BackgroundImage"
import { TopBar } from "@/features/ui/topbar/TopBar"
import { SideBar } from "@/features/ui/sidebar/SideBar"
import { AuthApiServer } from "@/features/auth/AuthApi.server"
import { redirect } from "next/navigation"
import { AuthProvider } from "@/features/auth/AuthProvider"

export default async function AppLayout({ children }: { children: ReactNode }) {
  const me = await AuthApiServer.authMe()
  if (me) {
    return (
      <AuthProvider>
        <div className='min-h-dvh'>
          <BackgroundImage imgSrc='/Dashboard_background.jpg' />
          <div className='relative mx-auto max-w-6xl px-6 py-6 space-y-4'>
            <TopBar />
            <div className='grid gap-4 md:grid-cols-[180px_1fr] md:items-start h-[calc(100vh-140px)]'>
              <SideBar />
              <main className='h-full'>{children}</main>
            </div>
          </div>
        </div>
      </AuthProvider>
    )
  }
  redirect("/api/session/refresh")
}
