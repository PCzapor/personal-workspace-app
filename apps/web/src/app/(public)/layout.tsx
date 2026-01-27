"use server"
import type { ReactNode } from "react"
import BackgroundImage from "@/features/ui/backgroundImage/BackgroundImage"
import { PublicTransition } from "./PublicTransition"

export default async function PublicLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className='min-h-dvh'>
      <BackgroundImage imgSrc='/Register_background.jpg' />
      <div className='absolute inset-0 bg-black/35' />
      <main className='relative z-10 min-h-dvh grid place-items-center p-6'>
        <div className='w-full max-w-md '>
          <div className='relative min-h-130'>
            <PublicTransition>{children}</PublicTransition>
          </div>
        </div>
      </main>
    </div>
  )
}
