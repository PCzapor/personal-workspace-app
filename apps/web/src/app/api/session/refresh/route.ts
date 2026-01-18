import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import _ApiService from "@/lib/api/api.service"

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001"

export async function GET() {
  const cookie = (await cookies()).toString()

  const backendRes = await fetch(`${API}/auth/refresh`, {
    method: "POST",
    headers: { cookie: cookie },
    cache: "no-store",
  })
  if (!backendRes.ok) {
    return NextResponse.redirect(new URL("/login", "http://localhost:3000"))
  }

  const res = NextResponse.redirect(new URL("/app", "http://localhost:3000"))
  const setCookies = backendRes.headers.getSetCookie()
  for (const c of setCookies) res.headers.append("set-cookie", c)

  return res
}
