import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001"
const BASE = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "http://localhost:3000"

export async function GET(req: NextRequest) {
  const cookie = (await cookies()).toString()

  const backendRes = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    headers: { cookie: cookie },
    cache: "no-store",
  })
  if (!backendRes.ok) {
    const res = NextResponse.redirect(new URL("/login", BASE))
    res.cookies.set("pw_access", "", { path: "/", maxAge: 0 })
    res.cookies.set("pw_refresh", "", { path: "/", maxAge: 0 })
    return res
  }

  const next = req.nextUrl.searchParams.get("next") || "/app"
  const safeNext = next.startsWith("/") ? next : "/app"

  const res = NextResponse.redirect(new URL(safeNext, BASE))
  const setCookies = backendRes.headers.getSetCookie()
  for (const c of setCookies) res.headers.append("set-cookie", c)

  return res
}
