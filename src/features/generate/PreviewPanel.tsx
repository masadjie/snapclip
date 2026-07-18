import type { RefObject } from 'react'
import type { FileExtension } from 'qr-code-styling'
import { Check, ClipboardCopy, Download, Eraser, Pause, Play } from 'lucide-react'

const CORNER = 'absolute h-5 w-5 border-brand-500'

export function PreviewPanel({
  containerRef,
  wrapperRef,
  size,
  copied,
  onDownload,
  onCopyImage,
  isMultiFrame,
  frameCount,
  frameIndex,
  isPlaying,
  onTogglePlaying,
  hasContent,
  onClearContent,
}: {
  containerRef: RefObject<HTMLDivElement | null>
  wrapperRef: RefObject<HTMLDivElement | null>
  size: number
  copied: boolean
  onDownload: (extension: FileExtension) => void
  onCopyImage: () => void
  isMultiFrame: boolean
  frameCount: number
  frameIndex: number
  isPlaying: boolean
  onTogglePlaying: () => void
  hasContent: boolean
  onClearContent: () => void
}) {
  return (
    <div className="order-1 flex flex-col items-center gap-4 md:order-2">
      <div className="flex w-full flex-col items-center gap-4 rounded-2xl border border-stone-900/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.12)] dark:border-white/5 dark:bg-stone-900">
        <div ref={wrapperRef} className="relative w-full max-w-[304px] p-3">
          <span className={`${CORNER} top-0 left-0 border-t-2 border-l-2 rounded-tl-md`} />
          <span className={`${CORNER} top-0 right-0 border-t-2 border-r-2 rounded-tr-md`} />
          <span className={`${CORNER} bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md`} />
          <span className={`${CORNER} bottom-0 right-0 border-b-2 border-r-2 rounded-br-md`} />
          <div
            ref={containerRef}
            className="mx-auto flex items-center justify-center overflow-hidden rounded-lg"
            style={{ width: size, height: size }}
          />
        </div>

        {isMultiFrame ? (
          <div className="flex w-full flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onTogglePlaying}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700"
                aria-label={isPlaying ? 'Jeda' : 'Lanjutkan'}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <span className="text-sm font-medium text-stone-700 dark:text-stone-200">
                Frame {frameIndex + 1} / {frameCount}
              </span>
            </div>
            <div className="flex w-full gap-1">
              {Array.from({ length: frameCount }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full ${
                    i === frameIndex ? 'bg-brand-500' : 'bg-stone-200 dark:bg-stone-700'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-xs text-stone-500 dark:text-stone-400">
              Teks panjang — scan langsung dari layar ini sampai semua frame terbaca. Tidak bisa
              didownload sebagai satu gambar statis.
            </p>
          </div>
        ) : (
          <>
            <div className="grid w-full grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onDownload('png')}
                className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
              >
                <Download size={16} /> PNG
              </button>
              <button
                type="button"
                onClick={() => onDownload('svg')}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                <Download size={16} /> SVG
              </button>
            </div>
            <button
              type="button"
              onClick={onCopyImage}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
              {copied ? 'Tersalin!' : 'Salin sebagai Gambar'}
            </button>
          </>
        )}

        {hasContent && (
          <button
            type="button"
            onClick={onClearContent}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300"
          >
            <Eraser size={13} /> Selesai & Hapus
          </button>
        )}
      </div>
    </div>
  )
}
