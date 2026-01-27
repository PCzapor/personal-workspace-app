"use client"

import { useState } from "react"
import { TopBar } from "@/features/ui/topbar/TopBar"
import { SideBarMobile } from "@/features/ui/sidebar/SideBardMobile"
import { SideBarDesktop } from "@/features/ui/sidebar/SideBarDesktop"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <TopBar onOpen={() => setMenuOpen(true)} />
      <SideBarMobile open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className='grid gap-4 md:grid-cols-[180px_1fr] md:items-start md:h-[calc(100vh-140px)]'>
        <SideBarDesktop />
        <main className='h-full'>{children}</main>
      </div>
    </>
  )
}
