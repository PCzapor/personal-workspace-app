"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthCard } from "@/features/ui/auth/AuthCard"
import { AuthApiClient } from "@/features/auth/AuthApi.client"

export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await AuthApiClient.login(email, password, rememberMe)
      router.push("/app")
    } catch {
      setError("Network error. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold text-white'>Welcome back</h1>
        <p className='text-white/70'>Sign in to your workspace.</p>
      </div>

      <form className='mt-6 space-y-3' onSubmit={onSubmit}>
        <label className='block'>
          <span className='text-sm text-white/80'>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
            inputMode='email'
            className='mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30'
            placeholder='you@domain.com'
          />
        </label>

        <label className='block'>
          <span className='text-sm text-white/80'>Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            autoComplete='current-password'
            className='mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30'
            placeholder='••••••••'
          />
        </label>

        <label className='mt-1 flex items-center gap-2 text-sm text-white/80'>
          <input
            type='checkbox'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className='h-4 w-4 rounded border-white/20 bg-white/10 text-white accent-white/90'
          />
          Remember me
        </label>

        {error ? (
          <p className='text-sm text-red-300' role='alert'>
            {error}
          </p>
        ) : null}

        <button
          type='submit'
          disabled={isLoading}
          className='mt-2 w-full rounded-xl bg-white/90 px-4 py-2 font-medium text-black hover:bg-white disabled:cursor-not-allowed disabled:opacity-70'
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
        <p className='pt-2 text-sm text-white/70'>
          Don’t have an account?{" "}
          <a
            className='text-white underline underline-offset-4'
            href='/register'
          >
            Create one
          </a>
        </p>
      </form>
    </AuthCard>
  )
}
