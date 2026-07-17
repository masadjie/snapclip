import { ArrowLeftRight } from 'lucide-react'
import { ColorInput } from './ColorInput'
import type { ColorMode, GradientType } from './useQrCodeStyling'

export function ColorSection({
  colorMode,
  onColorModeChange,
  fgColor,
  onFgColorChange,
  gradientColor1,
  onGradientColor1Change,
  gradientColor2,
  onGradientColor2Change,
  gradientType,
  onGradientTypeChange,
  useCustomEyeColor,
  onUseCustomEyeColorChange,
  eyeColor,
  onEyeColorChange,
  bgColor,
  onBgColorChange,
}: {
  colorMode: ColorMode
  onColorModeChange: (value: ColorMode) => void
  fgColor: string
  onFgColorChange: (value: string) => void
  gradientColor1: string
  onGradientColor1Change: (value: string) => void
  gradientColor2: string
  onGradientColor2Change: (value: string) => void
  gradientType: GradientType
  onGradientTypeChange: (value: GradientType) => void
  useCustomEyeColor: boolean
  onUseCustomEyeColorChange: (value: boolean) => void
  eyeColor: string
  onEyeColorChange: (value: string) => void
  bgColor: string
  onBgColorChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="mb-2.5 text-xs font-medium text-stone-600 dark:text-stone-300">
          Warna Depan
        </p>
        <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-stone-700 dark:text-stone-200">
          <label className="flex items-center gap-1.5">
            <input
              type="radio"
              checked={colorMode === 'single'}
              onChange={() => onColorModeChange('single')}
              className="accent-brand-600"
            />
            Warna Tunggal
          </label>
          <label className="flex items-center gap-1.5">
            <input
              type="radio"
              checked={colorMode === 'gradient'}
              onChange={() => onColorModeChange('gradient')}
              className="accent-brand-600"
            />
            Gradasi
          </label>
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={useCustomEyeColor}
              onChange={(e) => onUseCustomEyeColorChange(e.target.checked)}
              className="accent-brand-600"
            />
            Warna Eye Custom
          </label>
        </div>

        {colorMode === 'single' ? (
          <ColorInput value={fgColor} onChange={onFgColorChange} />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <ColorInput value={gradientColor1} onChange={onGradientColor1Change} />
            <ColorInput value={gradientColor2} onChange={onGradientColor2Change} />
            <button
              type="button"
              onClick={() => onGradientTypeChange(gradientType === 'linear' ? 'radial' : 'linear')}
              className="flex items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-stone-100 dark:bg-stone-800">
                <ArrowLeftRight size={13} />
              </span>
              {gradientType === 'linear' ? 'Gradasi Linear' : 'Gradasi Radial'}
            </button>
          </div>
        )}
      </div>

      {useCustomEyeColor && (
        <ColorInput label="Warna Eye" value={eyeColor} onChange={onEyeColorChange} />
      )}

      <ColorInput label="Warna Latar" value={bgColor} onChange={onBgColorChange} />
    </div>
  )
}
