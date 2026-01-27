import Link from "next/link"

const nav = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/notes", label: "Notes" },
  { href: "/app/links", label: "Links" },
  { href: "/app/checklists", label: "Checklists" },
]

export function SideBarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <nav className="space-y-1 text-sm">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate ?? (() => {})}
            className="block rounded-2xl px-3 py-2 text-white/75 hover:bg-white/6 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/4 p-3">
        <p className="text-sm text-white/80">✨ Tip</p>
        <p className="mt-1 text-xs text-white/50">
          Start with Notes — it’s the core of the hub.
        </p>
      </div>
    </>
  )
}
