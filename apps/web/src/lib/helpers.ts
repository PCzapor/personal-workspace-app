import { clsx } from "clsx"
export class ApiError extends Error {
  status: number
  data?: unknown

  constructor(message: string, status: number, data?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.data = data
  }
}

export function cn(...inputs: any[]) {
  return clsx(inputs)
}

export function getCookie(name: string) {
  if (typeof document !== undefined) {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
    if (match && match[1]) {
      return match ? decodeURIComponent(match[1]) : null
    }
    return null
  }
  return null
}
export function formatDate(date: string) {
  return new Date(date).toLocaleString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
