import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  const hasAccess = !!req.cookies.get("pw_access")?.value
  const hasRefresh = !!req.cookies.get("pw_refresh")?.value
  const hasAnySession = hasAccess || hasRefresh

  if (pathname.startsWith("/login") && hasAnySession) {
    const url = req.nextUrl.clone()
    url.pathname = "/app"
    return NextResponse.redirect(url)
  }

  if (pathname.startsWith("/app") && !hasAnySession) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/app/:path*"],
}
