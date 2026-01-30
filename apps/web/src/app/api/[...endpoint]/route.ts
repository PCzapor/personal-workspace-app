import { proxyToBackend } from "../_proxy/proxy"

type ParamsType = Promise<{ endpoint: string[] }>

export async function GET(
  request: Request,
  { params }: { params: ParamsType },
) {
  const { endpoint } = await params
  return proxyToBackend(request, endpoint.join("/"))
}
export async function POST(
  request: Request,
  { params }: { params: ParamsType },
) {
  const { endpoint } = await params
  return proxyToBackend(request, endpoint.join("/"))
}
export async function PATCH(
  request: Request,
  { params }: { params: ParamsType },
) {
  const { endpoint } = await params
  return proxyToBackend(request, endpoint.join("/"))
}
export async function DELETE(
  request: Request,
  { params }: { params: ParamsType },
) {
  const { endpoint } = await params
  return proxyToBackend(request, endpoint.join("/"))
}
