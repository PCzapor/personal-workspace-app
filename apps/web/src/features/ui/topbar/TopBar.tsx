"use client"

import { useAuth } from "@/features/auth/AuthProvider"
import { LogoutButton } from "./LogoutButton"

export function TopBar() {
  const { user } = useAuth()
  return (
    <header className='flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-4 shadow-2xl'>
      <div>
        <p className='text-xs text-white/50'>Personal Workspace</p>
        <p id='user.email' className='text-sm text-white/80'>
          {user.email ?? 'Unknown User'}
        </p>
      </div>

      <div className='flex items-center gap-2'>
        <button className='rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 hover:bg-white/[0.07]'>
          Search
        </button>
        <LogoutButton />
      </div>
    </header>
  )
}
