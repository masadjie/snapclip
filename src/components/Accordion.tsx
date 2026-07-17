import { useState } from 'react'
import type { ReactNode } from 'react'
import { Plus, Minus } from 'lucide-react'

export type AccordionSection = {
  id: string
  title: string
  icon: ReactNode
  content: ReactNode
}

export function Accordion({
  sections,
  defaultOpen = [],
}: {
  sections: AccordionSection[]
  defaultOpen?: string[]
}) {
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpen))

  function toggle(id: string) {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-2">
      {sections.map((section) => {
        const isOpen = open.has(section.id)
        return (
          <div
            key={section.id}
            className="rounded-lg border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900"
          >
            <button
              type="button"
              onClick={() => toggle(section.id)}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
            >
              <span className="text-stone-400 dark:text-stone-500">{section.icon}</span>
              <span className="font-display flex-1 text-xs font-semibold tracking-wide text-stone-600 uppercase dark:text-stone-300">
                {section.title}
              </span>
              {isOpen ? (
                <Minus size={16} className="text-stone-400" />
              ) : (
                <Plus size={16} className="text-stone-400" />
              )}
            </button>
            {isOpen && <div className="border-t border-stone-100 p-4 dark:border-stone-800">{section.content}</div>}
          </div>
        )
      })}
    </div>
  )
}
