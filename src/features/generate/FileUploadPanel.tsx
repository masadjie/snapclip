import { useRef } from 'react'
import { Paperclip, Repeat, X } from 'lucide-react'
import { MAX_FILE_BYTES, formatBytes } from '../../lib/fileEnvelope'
import type { AttachedFileMeta } from './useAttachedFile'

export function FileUploadPanel({
  attachedFile,
  fileError,
  onFileSelect,
  onFileClear,
  isMultiFrame,
  frameCount,
}: {
  attachedFile: AttachedFileMeta | null
  fileError: string | null
  onFileSelect: (file: File) => void
  onFileClear: () => void
  isMultiFrame: boolean
  frameCount: number
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFileSelect(file)
  }

  return (
    <div>
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />

      {attachedFile ? (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-stone-200 p-3 dark:border-stone-700">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-stone-800 dark:text-stone-100">
              {attachedFile.name}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {formatBytes(attachedFile.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={onFileClear}
            className="shrink-0 rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800"
            aria-label="Hapus file"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed border-stone-300 p-6 text-center text-sm text-stone-500 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-800"
        >
          <Paperclip size={20} />
          Klik untuk pilih file
          <span className="text-xs text-stone-400">Maks {formatBytes(MAX_FILE_BYTES)}</span>
        </button>
      )}

      {fileError && <p className="mt-2 text-xs font-medium text-red-500">{fileError}</p>}

      {isMultiFrame && attachedFile && (
        <p className="mt-2 flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400">
          <Repeat size={12} />
          File ini otomatis jadi {frameCount} QR bergantian
        </p>
      )}
    </div>
  )
}
