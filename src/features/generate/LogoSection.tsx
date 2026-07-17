import { useRef } from 'react'
import { ImageOff, Upload } from 'lucide-react'
import { LOGO_PRESETS } from '../../lib/logoPresets'

export function LogoSection({
  logo,
  onLogoFile,
  onLogoPreset,
  onLogoClear,
  hideLogoBackground,
  onHideLogoBackgroundChange,
}: {
  logo: string | null
  onLogoFile: (file: File) => void
  onLogoPreset: (dataUri: string) => void
  onLogoClear: () => void
  hideLogoBackground: boolean
  onHideLogoBackgroundChange: (value: boolean) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onLogoFile(file)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {logo ? (
          <>
            <img
              src={logo}
              alt=""
              className="h-9 w-9 rounded-lg border border-stone-200 object-cover dark:border-stone-700"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
            >
              <Upload size={14} /> Ganti
            </button>
            <button
              type="button"
              onClick={onLogoClear}
              className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-xs font-medium text-stone-500 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-400 dark:hover:bg-stone-800"
            >
              <ImageOff size={14} /> Hapus
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-2 text-xs font-medium text-stone-600 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            <Upload size={14} /> Upload Logo
          </button>
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-stone-700 dark:text-stone-200">
        <input
          type="checkbox"
          checked={hideLogoBackground}
          onChange={(e) => onHideLogoBackgroundChange(e.target.checked)}
          className="accent-brand-600"
        />
        Hilangkan Titik QR di Belakang Logo
      </label>

      <div>
        <p className="mb-2 text-xs font-medium text-stone-600 dark:text-stone-300">
          Atau Pilih Contoh Logo
        </p>
        <div className="grid grid-cols-6 gap-2">
          {LOGO_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              title={preset.name}
              onClick={() => onLogoPreset(preset.dataUri)}
              className={`flex aspect-square items-center justify-center rounded-lg border p-1.5 transition-colors ${
                logo === preset.dataUri
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10'
                  : 'border-stone-200 hover:bg-stone-50 dark:border-stone-700 dark:hover:bg-stone-800'
              }`}
            >
              <img src={preset.dataUri} alt={preset.name} className="h-full w-full rounded" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
