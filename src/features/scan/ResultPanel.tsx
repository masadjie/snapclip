import { Check, ClipboardCopy, RotateCcw } from 'lucide-react'

export function ResultPanel({
  result,
  copied,
  onCopy,
  onScanAgain,
}: {
  result: string
  copied: boolean
  onCopy: () => void
  onScanAgain: () => void
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-stone-900/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.12)] dark:border-white/5 dark:bg-stone-900">
      <div>
        <h2 className="mb-2 font-display text-xs font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
          Hasil
        </h2>
        <p className="max-h-64 overflow-y-auto whitespace-pre-wrap break-words rounded-lg bg-stone-50 p-3 text-sm dark:bg-stone-800">
          {result}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onCopy}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
        >
          {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
          {copied ? 'Tersalin!' : 'Salin Teks'}
        </button>
        <button
          type="button"
          onClick={onScanAgain}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
        >
          <RotateCcw size={16} /> Scan Lagi
        </button>
      </div>
    </div>
  )
}
