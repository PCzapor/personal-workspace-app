import crypto from "crypto"
import { NextResponse } from "next/server"

export async function GET() {
  const token = crypto.randomBytes(32).toString("hex")

  const res = NextResponse.json({ token })

  res.cookies.set("csrf_token", token, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  })
  return res
}
