import { proxyToBackend } from "../_proxy/proxy"

export async function GET(req: Request) {
  return proxyToBackend(req, "app")
}
