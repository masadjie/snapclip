import { useState } from 'react'
import type { ReactNode } from 'react'
import { Info, QrCode, ScanLine } from 'lucide-react'
import { AboutModal } from './AboutModal'

export type Tab = 'generate' | 'scan'

const NAV_ITEMS: { id: Tab; label: string; icon: typeof QrCode }[] = [
  { id: 'generate', label: 'Buat QR', icon: QrCode },
  { id: 'scan', label: 'Scan QR', icon: ScanLine },
]

export function AppShell({
  active,
  onChange,
  children,
}: {
  active: Tab
  onChange: (tab: Tab) => void
  children: ReactNode
}) {
  const [showAbout, setShowAbout] = useState(false)

  return (
    <div className="flex h-full min-h-dvh text-stone-900 dark:text-stone-100">
      {/* Desktop sidebar — always ink, regardless of theme */}
      <aside className="hidden md:flex md:w-60 md:flex-col md:bg-[#151312]">
        <div className="flex items-center gap-2.5 px-6 py-7">
          <img src="/favicon.svg" alt="" className="h-8 w-8 rounded-lg" />
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            SnapClip
          </span>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 px-3">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`relative flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                active === id
                  ? 'bg-white/[0.06] text-brand-400'
                  : 'text-stone-400 hover:bg-white/[0.04] hover:text-stone-200'
              }`}
            >
              {active === id && (
                <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-brand-500" />
              )}
              <Icon size={19} strokeWidth={2} />
              {label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setShowAbout(true)}
          className="flex items-center gap-2 px-6 py-5 text-xs text-stone-500 hover:text-stone-300"
        >
          <Info size={14} />
          Gratis &amp; Open Source
        </button>
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-2.5 bg-[#151312] px-4 py-4 md:hidden">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="h-7 w-7 rounded-lg" />
            <span className="font-display text-base font-semibold tracking-tight text-white">
              SnapClip
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowAbout(true)}
            className="text-stone-400 hover:text-stone-200"
            aria-label="Tentang SnapClip"
          >
            <Info size={20} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">{children}</main>

        {/* Mobile bottom nav */}
        <nav className="fixed inset-x-0 bottom-0 z-10 flex border-t border-stone-200 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)] md:hidden dark:border-stone-800 dark:bg-stone-900/95">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium ${
                active === id
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-stone-500 dark:text-stone-400'
              }`}
            >
              <Icon size={22} />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  )
}
