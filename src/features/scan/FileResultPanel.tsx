import { Download, File as FileIcon, RotateCcw } from 'lucide-react'
import { formatBytes, type FileEnvelope } from '../../lib/fileEnvelope'

function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteChars = atob(base64)
  const byteNumbers = new Array(byteChars.length)
  for (let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i)
  return new Blob([new Uint8Array(byteNumbers)], { type: mimeType })
}

export function FileResultPanel({
  file,
  onScanAgain,
}: {
  file: FileEnvelope
  onScanAgain: () => void
}) {
  function handleDownload() {
    const blob = base64ToBlob(file.base64Data, file.mimeType)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = file.filename
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const sizeBytes = Math.round((file.base64Data.length * 3) / 4)

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-stone-900/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.12)] dark:border-white/5 dark:bg-stone-900">
      <div className="flex items-center gap-3 rounded-lg border border-stone-200 p-3 dark:border-stone-700">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
          <FileIcon size={20} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-stone-800 dark:text-stone-100">
            {file.filename}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">{formatBytes(sizeBytes)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleDownload}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Download size={16} /> Download File
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
