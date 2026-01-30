"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AuthApiClient } from "@/features/auth/AuthApi.client"
import { Card, TextInput, Alert, Button } from "@/features/ui/custom"
import Link from "next/link"

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
    <Card>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold text-white'>Welcome back</h1>
        <p className='text-white/70'>Sign in to your workspace.</p>
      </div>

      <form className='mt-6 space-y-3' onSubmit={onSubmit}>
        <TextInput
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='email'
          inputMode='email'
          placeholder='you@domain.com'
          required
        />

        <TextInput
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
          placeholder='••••••••'
          required
        />

        <label className='flex items-center gap-2 text-sm text-white/80'>
          <input
            type='checkbox'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className='h-4 w-4 rounded border-white/20 bg-white/10 text-white accent-white/90'
          />
          Remember me
        </label>

        {error && (
          <Alert variant='error' onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Button
          type='submit'
          isLoading={isLoading}
          loadingText='Signing in...'
          className='w-full mt-2'
        >
          Sign in
        </Button>
        <p className='pt-2 text-sm text-white/70'>
          Don’t have an account?{" "}
          <Link
            className='text-white underline underline-offset-4'
            href='/register'
          >
            Create one
          </Link>
        </p>
      </form>
    </Card>
  )
}
