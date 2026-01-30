"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ApiError } from "@/lib/helpers"
import _ApiService from "@/lib/api/api.service"
import { AuthApiClient } from "@/features/auth/AuthApi.client"
import { Button, Alert, TextInput, Card } from "@/features/ui/custom"
import Link from "next/link"

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
    <Card>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold text-white'>Create account</h1>
        <p className='text-white/70'>Start building your workspace.</p>
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
          autoComplete='new-password'
          placeholder='At least 8 characters'
          required
        />

        <TextInput
          label='Confirm password'
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete='new-password'
          placeholder='Repeat password'
          required
        />

        {error && (
          <Alert variant='error' onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Button
          type='submit'
          isLoading={isLoading}
          loadingText='Creating...'
          className='w-full'
        >
          Create account
        </Button>

        <p className='pt-2 text-sm text-white/70'>
          Already have an account?{" "}
          <Link
            className='text-white underline underline-offset-4'
            href='/login'
          >
            Sign in
          </Link>
        </p>
      </form>
    </Card>
  )
}
