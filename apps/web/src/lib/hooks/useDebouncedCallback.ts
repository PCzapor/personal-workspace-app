"use client"

import { useCallback, useRef, useEffect } from "react"

type Callback = (...args: any[]) => Promise<void> | void

export function useDebouncedCallback(callback: Callback, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isLoadingRef = useRef(false)

  const debouncedCallback = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(async () => {
        if (isLoadingRef.current) return
        isLoadingRef.current = true
        try {
          await callback(...args)
        } finally {
          isLoadingRef.current = false
        }
      }, delay)
    },
    [callback, delay]
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedCallback
}
