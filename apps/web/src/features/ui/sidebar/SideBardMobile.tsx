import { Card } from "../custom/Card"
import { SideBarContent } from "./SideBarContent"

export function SideBarMobile({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="md:hidden">
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50"
      />

      <div className="fixed left-0 top-0 z-50 h-dvh w-[85vw] max-w-sm p-4">
        <Card title="Workspace">
          <aside className="max-h-[calc(100dvh-120px)] overflow-y-auto">
            <SideBarContent onNavigate={onClose} />
          </aside>
        </Card>
      </div>
    </div>
  )
}
