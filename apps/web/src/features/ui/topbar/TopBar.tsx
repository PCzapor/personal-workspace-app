"use client"

import { useAuth } from "@/features/auth/AuthProvider"
import { LogoutButton } from "./LogoutButton"
import { Card } from "../custom/Card"
import { Menu } from "lucide-react"

export function TopBar({onOpen}: {onOpen: () => void}) {
  const { user } = useAuth()
  return (
      <Card>
    <header className='flex items-center justify-between align-middle'>
      <button
        className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-2xl text-white/80 transition"
        aria-label="Open menu"
        onClick={onOpen}>
       <Menu className="h-5 w-5" />
      </button>

      <div>
        <p className='text-xs text-white'>Welcome,</p>
        <p id='user.email' className='text-sm text-white/80'>
          {user.email ?? 'Unknown User'}
        </p>
      </div>

      <div className='flex items-center gap-2'>
        <button className='rounded-2xl border border-white/10 bg-white/4 px-4 py-2 text-sm text-white/80 hover:bg-white/[0.07]'>
          Search
        </button>
        <LogoutButton />
      </div>
    </header>
      </Card>
  )
}
