import { NextResponse } from "next/server"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001"

export async function proxyToBackend(request: Request, pathname: string) {
  const targetUrl = `${API_BASE_URL}/${pathname}`

  const method = request.method.toUpperCase()
  const isMutating = ["POST", "PUT", "PATCH", "DELETE"].includes(method)

  const csrfExemptPrefixes = [
    "csrf",
    "auth/login",
    "auth/refresh",
    "auth/logout",
  ]
  const isCsrfExempt = csrfExemptPrefixes.some((p) => pathname.startsWith(p))

  if (isMutating && !isCsrfExempt) {
    const cookieHeader = request.headers.get("cookie") ?? ""
    const match = cookieHeader.match(
      new RegExp(`(?:^|;\\s*)csrf_token=([^;]+)`),
    )
    const value = match?.[1]
    if (!value) return new NextResponse("Missing CSRF cookie", { status: 403 })
    const cookieToken = decodeURIComponent(value)
    const headerToken = request.headers.get("x-csrf-token")

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
      return new NextResponse("Invalid CSRF token", { status: 403 })
    }
  }

  const headers = new Headers(request.headers)
  headers.delete("host")

  const cookieToSend = request.headers.get("cookie")
  if (cookieToSend) headers.set("cookie", cookieToSend)

  const hasBody = !["GET", "HEAD", "DELETE", "OPTIONS"].includes(method)

  let body: BodyInit | undefined

  if (hasBody) {
    const contentType = request.headers.get("content-type") ?? ""

    if (contentType.includes("application/json")) {
      const json = await request.json()
      body = JSON.stringify(json)
      headers.set("content-type", "application/json")
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await request.text()
      body = text
      headers.set("content-type", "application/x-www-form-urlencoded")
    } else if (contentType.includes("multipart/form-data")) {
      const form = await request.formData()
      body = form as any
      headers.delete("content-type")
    } else {
      const buf = await request.arrayBuffer()
      body = buf as any
    }
  }
  const init: RequestInit = {
    method,
    headers,
    cache: "no-store",
    redirect: "manual",
  }

  if (typeof body !== "undefined") {
    init.body = body
  }

  const backendRes = await fetch(targetUrl, init)

  const res = new NextResponse(backendRes.body, {
    status: backendRes.status,
    statusText: backendRes.statusText,
  })

  backendRes.headers.forEach((value, key) => {
    const k = key.toLowerCase()
    if (
      k === "set-cookie" ||
      k === "content-encoding" ||
      k === "transfer-encoding"
    )
      return
    res.headers.set(key, value)
  })

  const setCookies = backendRes.headers.getSetCookie()
  for (const c of setCookies) res.headers.append("set-cookie", c)

  return res
}
