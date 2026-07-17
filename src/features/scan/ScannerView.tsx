import { useRef } from 'react'
import type { RefObject } from 'react'
import { Camera, CameraOff, Upload } from 'lucide-react'
import type { ScanState } from './useQrScanner'

export function ScannerView({
  videoRef,
  state,
  errorMsg,
  frameProgress,
  onStart,
  onStop,
  onSwitchCamera,
  onFileUpload,
}: {
  videoRef: RefObject<HTMLVideoElement | null>
  state: ScanState
  errorMsg: string
  frameProgress: { received: number; total: number } | null
  onStart: () => void
  onStop: () => void
  onSwitchCamera: () => void
  onFileUpload: (file: File) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onFileUpload(file)
  }

  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-stone-900/5 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-16px_rgba(0,0,0,0.12)] dark:border-white/5 dark:bg-stone-900">
      <div className="relative flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-xl bg-stone-900">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover ${state === 'scanning' ? '' : 'hidden'}`}
          muted
          playsInline
        />
        {state !== 'scanning' && (
          <div className="flex flex-col items-center gap-2 p-6 text-center text-sm text-stone-300">
            {state === 'error' ? <CameraOff size={32} /> : <Camera size={32} />}
            <p>
              {state === 'error'
                ? errorMsg
                : state === 'starting'
                  ? 'Membuka kamera...'
                  : 'Kamera belum aktif'}
            </p>
          </div>
        )}
        {state === 'scanning' && (
          <div className="pointer-events-none absolute inset-8">
            <span className="absolute top-0 left-0 h-6 w-6 rounded-tl-md border-t-2 border-l-2 border-brand-400" />
            <span className="absolute top-0 right-0 h-6 w-6 rounded-tr-md border-t-2 border-r-2 border-brand-400" />
            <span className="absolute bottom-0 left-0 h-6 w-6 rounded-bl-md border-b-2 border-l-2 border-brand-400" />
            <span className="absolute right-0 bottom-0 h-6 w-6 rounded-br-md border-r-2 border-b-2 border-brand-400" />
          </div>
        )}
        {state === 'scanning' && frameProgress && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center">
            <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
              Menerima bagian {frameProgress.received} / {frameProgress.total}...
            </span>
          </div>
        )}
      </div>

      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        {state === 'scanning' ? (
          <>
            <button
              type="button"
              onClick={onStop}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              Berhenti
            </button>
            <button
              type="button"
              onClick={onSwitchCamera}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              Ganti Kamera
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onStart}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-brand-700 sm:col-span-2"
          >
            <Camera size={16} /> Mulai Scan
          </button>
        )}
      </div>

      <div className="flex w-full items-center gap-3">
        <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
        <span className="text-xs text-stone-400">atau</span>
        <div className="h-px flex-1 bg-stone-200 dark:bg-stone-700" />
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
      >
        <Upload size={16} /> Upload Gambar QR
      </button>
    </div>
  )
}
