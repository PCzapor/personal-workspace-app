"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import ApiService from "@/lib/api/api.service"
import { ApiError } from "@/lib/helpers"
import { AuthCard } from "@/features/ui/auth/AuthCard"
import _ApiService from "@/lib/api/api.service"
import { AuthApiClient } from "@/features/auth/AuthApi.client"

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsLoading(true)
    try {
      await AuthApiClient.register(email, password)
      router.push("/app")
      router.refresh()
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 409) setError("This email is already registered.")
        else setError(err.message)
      } else {
        setError("Network error. Try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold text-white'>Create account</h1>
        <p className='text-white/70'>Start building your workspace.</p>
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
            autoComplete='new-password'
            className='mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30'
            placeholder='At least 8 characters'
          />
        </label>

        <label className='block'>
          <span className='text-sm text-white/80'>Confirm password</span>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type='password'
            autoComplete='new-password'
            className='mt-1 w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/30'
            placeholder='Repeat password'
          />
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
          {isLoading ? "Creating..." : "Create account"}
        </button>

        <p className='pt-2 text-sm text-white/70'>
          Already have an account?{" "}
          <a className='text-white underline underline-offset-4' href='/login'>
            Sign in
          </a>
        </p>
      </form>
    </AuthCard>
  )
}
