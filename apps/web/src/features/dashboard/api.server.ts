import { DashboardSummary } from "./../../../../api/src/modules/dashboard/misc/dashboard.types"
import _ApiService from "@/lib/api/api.service"
import { cookies } from "next/headers"

const BASE_PATH = "/api/dashboard"
export class DashboardApiServer {
  static async getSummary(): Promise<DashboardSummary | null> {
    const cookie = (await cookies()).toString()
    try {
      const { data } = await _ApiService.get<DashboardSummary | null>(
        `${BASE_PATH}/summary`,
        {
          headers: { cookie },
        },
      )
      return data || null
    } catch (error) {
      console.error("Failed to get dashboard data:", error)
      return null
    }
  }
}
