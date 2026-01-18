import axios from "axios"
import type { AxiosRequestConfig, AxiosInstance } from "axios"

class ApiService {
  private readonly axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      withCredentials: true,
      baseURL: "http://localhost:3000",
    })
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
