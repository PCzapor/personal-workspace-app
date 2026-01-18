export type AuthUser = {
  id: string
  email: string
  displayName: string | null
}

export type LoginBody = {
  email: string
  password: string
  rememberMe: boolean
}

export type RegisterBody = {
  email: string
  password: string
}

export type RequestOptions<TBody> = {
  body?: TBody
  headers?: Record<string, string>
  signal?: AbortSignal
  cache?: string
}
