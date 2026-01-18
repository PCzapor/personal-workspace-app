"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export default function BackgroundImage({ imgSrc }: { imgSrc: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.setProperty("--tx", "0px")
    el.style.setProperty("--ty", "0px")

    if (prefersReducedMotion()) return

    const onMove = (e: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        const { innerWidth: w, innerHeight: h } = window

        const nx = e.clientX / w - 0.5
        const ny = e.clientY / h - 0.5

        const tx = Math.round(nx * 18)
        const ty = Math.round(ny * 14)

        el.style.setProperty("--tx", `${tx}px`)
        el.style.setProperty("--ty", `${ty}px`)
      })
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div ref={ref} className='fixed inset-0 z-0 overflow-hidden'>
      <div className='absolute inset-0'>
        <Image
          src={imgSrc}
          alt=''
          fill
          priority
          sizes='100vw'
          className='object-cover'
          style={{
            transform: "translate3d(var(--tx), var(--ty), 0) scale(1.08)",
            transition: prefersReducedMotion()
              ? "none"
              : "transform 150ms ease-out",
            willChange: "transform",
          }}
        />
      </div>

      <div className='absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50' />

      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.18),transparent_55%)]' />

      <div
        className='absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none'
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
