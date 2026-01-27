import axios from "axios"
import type { AxiosRequestConfig, AxiosInstance } from "axios"

class ApiService {
  private readonly axiosInstance: AxiosInstance
  private isRefreshing = false
  private refreshSubscribers: ((token: string) => void)[] = []

  constructor() {
    this.axiosInstance = axios.create({
      withCredentials: true,
      baseURL: "http://localhost:3000",
    })

    // Only set up interceptor on client-side (browser)
    if (typeof window !== "undefined") {
      this.axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config

          if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/api/auth/refresh")
          ) {
            if (this.isRefreshing) {
              return new Promise((resolve) => {
                this.refreshSubscribers.push(() => {
                  resolve(this.axiosInstance(originalRequest))
                })
              })
            }

            originalRequest._retry = true
            this.isRefreshing = true

            try {
              await this.axiosInstance.post("/api/auth/refresh", {})

              this.isRefreshing = false
              this.refreshSubscribers.forEach((callback) => callback(""))
              this.refreshSubscribers = []

              return this.axiosInstance(originalRequest)
            } catch (refreshError) {
              this.isRefreshing = false
              this.refreshSubscribers = []

              if (typeof window !== "undefined") {
                window.location.href = "/login"
              }

              return Promise.reject(refreshError)
            }
          }

          return Promise.reject(error)
        }
      )
    }
  }

  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.get<T>(url, config)
  }

  post<T = any, D = any>(url: string, payload: D, config?: AxiosRequestConfig) {
    return this.axiosInstance.post<T>(url, payload, config)
  }
  put<T = any, D = any>(url: string, payload: D, config?: AxiosRequestConfig) {
    return this.axiosInstance.put<T>(url, payload, config)
  }
  patch<T = any, D = any>(
    url: string,
    payload: D,
    config?: AxiosRequestConfig
  ) {
    return this.axiosInstance.patch<T, D>(url, payload, config)
  }
  delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.axiosInstance.delete<T>(url, config)
  }
}
const _ApiService = new ApiService()

export default _ApiService
