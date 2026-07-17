import { SHAPE_PREVIEW_CLASS } from '../../lib/qr'

export function ShapePicker<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium text-stone-600 dark:text-stone-300">{label}</p>
      <div className="grid grid-cols-6 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            title={opt.label}
            onClick={() => onChange(opt.value)}
            className={`flex aspect-square items-center justify-center rounded-lg border p-2 transition-colors ${
              value === opt.value
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                : 'border-stone-200 hover:bg-stone-50 dark:border-stone-700 dark:hover:bg-stone-800'
            }`}
          >
            <span
              className={`h-5 w-5 bg-stone-800 dark:bg-stone-200 ${SHAPE_PREVIEW_CLASS[opt.value] ?? ''}`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
