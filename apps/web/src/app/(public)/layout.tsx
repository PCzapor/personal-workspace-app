"use server"
import type { ReactNode } from "react"
import BackgroundImage from "@/features/ui/backgroundImage/BackgroundImage"

export default async function PublicLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className='min-h-dvh'>
      <BackgroundImage imgSrc='/Register_background.jpg' />
      <main className='relative z-10 min-h-dvh grid place-items-center p-6'>
        {children}
      </main>
    </div>
  )
}
