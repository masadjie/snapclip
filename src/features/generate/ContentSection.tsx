import { useState } from 'react'
import { FileText, Paperclip, Repeat } from 'lucide-react'
import { FileUploadPanel } from './FileUploadPanel'
import type { AttachedFileMeta } from './useAttachedFile'

type Mode = 'text' | 'file'

const TAB_CLASS = (active: boolean) =>
  `flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-colors ${
    active
      ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-700 dark:text-white'
      : 'text-stone-500 dark:text-stone-400'
  }`

export function ContentSection({
  value,
  onChange,
  isMultiFrame,
  frameCount,
  compressedLength,
  attachedFile,
  fileError,
  onFileSelect,
  onFileClear,
}: {
  value: string
  onChange: (value: string) => void
  isMultiFrame: boolean
  frameCount: number
  compressedLength: number
  attachedFile: AttachedFileMeta | null
  fileError: string | null
  onFileSelect: (file: File) => void
  onFileClear: () => void
}) {
  const [mode, setMode] = useState<Mode>(attachedFile ? 'file' : 'text')

  return (
    <div>
      <div className="mb-3 flex gap-1 rounded-lg bg-stone-100 p-1 dark:bg-stone-800">
        <button type="button" onClick={() => setMode('text')} className={TAB_CLASS(mode === 'text')}>
          <FileText size={14} /> Teks
        </button>
        <button type="button" onClick={() => setMode('file')} className={TAB_CLASS(mode === 'file')}>
          <Paperclip size={14} /> File
        </button>
      </div>

      {mode === 'text' ? (
        <>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ketik atau paste teks di sini..."
            rows={5}
            className="w-full resize-none rounded-lg border border-stone-200 bg-white p-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-stone-800 dark:bg-stone-900 dark:focus:ring-brand-700/30"
          />
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-400">
            <span>{value.length} karakter</span>
            {value.length > 0 && (
              <span className="text-stone-300 dark:text-stone-600">
                (terkompresi ke {compressedLength} karakter)
              </span>
            )}
            {isMultiFrame && !attachedFile && (
              <span className="flex items-center gap-1 font-medium text-brand-600 dark:text-brand-400">
                <Repeat size={12} />
                Masih kepanjangan — otomatis jadi {frameCount} QR bergantian
              </span>
            )}
          </div>
        </>
      ) : (
        <FileUploadPanel
          attachedFile={attachedFile}
          fileError={fileError}
          onFileSelect={onFileSelect}
          onFileClear={onFileClear}
          isMultiFrame={isMultiFrame}
          frameCount={frameCount}
        />
      )}
    </div>
  )
}
