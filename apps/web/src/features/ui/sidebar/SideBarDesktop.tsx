import { Card } from "../custom/Card"
import { SideBarContent } from "./SideBarContent"

export function SideBarDesktop() {
  return (
    <div className="hidden md:block">
      <Card title="Workspace">
        <aside className="md:sticky md:top-6">
          <SideBarContent />
        </aside>
      </Card>
    </div>
  )
}
