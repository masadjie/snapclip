import { useEffect, useState } from 'react'

const HEX_RE = /^#[0-9a-fA-F]{6}$/

export function ColorInput({
  label,
  value,
  onChange,
}: {
  label?: string
  value: string
  onChange: (value: string) => void
}) {
  const [text, setText] = useState(value)

  useEffect(() => setText(value), [value])

  function handleSwatchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
    onChange(e.target.value)
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value
    setText(next)
    if (HEX_RE.test(next)) onChange(next)
  }

  return (
    <label className="flex flex-col gap-1.5">
      {label && (
        <span className="text-xs font-medium text-stone-600 dark:text-stone-300">{label}</span>
      )}
      <div className="flex overflow-hidden rounded-lg border border-stone-200 dark:border-stone-700">
        <input
          type="color"
          value={value}
          onChange={handleSwatchChange}
          className="h-9 w-11 shrink-0 cursor-pointer border-0 p-0"
        />
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          spellCheck={false}
          className="w-full border-0 bg-white px-3 text-sm text-stone-800 outline-none dark:bg-stone-900 dark:text-stone-100"
        />
      </div>
    </label>
  )
}
