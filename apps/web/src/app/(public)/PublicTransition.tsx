"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

export function PublicTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={pathname}
        className='absolute inset-0 grid place-items-center'
        style={{
          willChange: "transform",
        }}
        initial={{ rotateY: -90, scale: 0.98, transformPerspective: 1200 }}
        animate={{ rotateY: 0, scale: 1, transformPerspective: 1200 }}
        exit={{ rotateY: 90, scale: 0.98, transformPerspective: 1200 }}
        transition={{ duration: 0.45, ease: ["linear"] }}
      >
        <div
          className='w-full [transform:translateZ(0)]'
          style={{
            isolation: "isolate",
          }}
        >
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
