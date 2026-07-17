import { useEffect, useMemo, useRef, useState } from 'react'
import QRCodeStyling, { type FileExtension } from 'qr-code-styling'
import type { CornerDotStyle, CornerSquareStyle, DotStyle } from '../../lib/qr'
import { copyPngBlob } from '../../lib/clipboard'
import { useQrFrames } from './useQrFrames'
import { useAttachedFile } from './useAttachedFile'

const MAX_QR_SIZE = 280
const MIN_QR_SIZE = 160
// Keep in sync with the wrapper's padding in PreviewPanel (p-3 = 12px per side).
const WRAPPER_PADDING = 24

export type ColorMode = 'single' | 'gradient'
export type GradientType = 'linear' | 'radial'

export function useQrCodeStyling() {
  const [text, setText] = useState('')
  const [colorMode, setColorMode] = useState<ColorMode>('single')
  const [fgColor, setFgColor] = useState('#151312')
  const [gradientColor1, setGradientColor1] = useState('#151312')
  const [gradientColor2, setGradientColor2] = useState('#de4718')
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [useCustomEyeColor, setUseCustomEyeColor] = useState(false)
  const [eyeColor, setEyeColor] = useState('#151312')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [dotStyle, setDotStyle] = useState<DotStyle>('rounded')
  const [cornerSquareStyle, setCornerSquareStyle] = useState<CornerSquareStyle>('extra-rounded')
  const [cornerDotStyle, setCornerDotStyle] = useState<CornerDotStyle>('dot')
  const [logo, setLogo] = useState<string | null>(null)
  const [hideLogoBackground, setHideLogoBackground] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrSize, setQrSize] = useState(MAX_QR_SIZE)

  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<QRCodeStyling | null>(null)

  // The QR box has a fixed pixel size (qr-code-styling requirement), so on
  // narrow screens it must shrink to whatever width the card actually has —
  // otherwise it overflows past the card behind it.
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const available = entries[0]?.contentRect.width ?? 0
      const next = Math.round(available - WRAPPER_PADDING)
      setQrSize(Math.max(MIN_QR_SIZE, Math.min(MAX_QR_SIZE, next)))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const attachedFileState = useAttachedFile()
  const qrFrames = useQrFrames(attachedFileState.fileEnvelope ?? text)
  const data = qrFrames.frameData

  const bodyColorOption = useMemo(
    () =>
      colorMode === 'gradient'
        ? {
            gradient: {
              type: gradientType,
              rotation: 0,
              colorStops: [
                { offset: 0, color: gradientColor1 },
                { offset: 1, color: gradientColor2 },
              ],
            },
          }
        : { color: fgColor },
    [colorMode, fgColor, gradientColor1, gradientColor2, gradientType],
  )

  const eyeColorOption = useMemo(
    () => (useCustomEyeColor ? { color: eyeColor } : bodyColorOption),
    [useCustomEyeColor, eyeColor, bodyColorOption],
  )

  const options = useMemo(
    () => ({
      width: qrSize,
      height: qrSize,
      data,
      margin: 8,
      qrOptions: {
        errorCorrectionLevel: (logo ? 'H' : 'Q') as 'H' | 'Q',
      },
      dotsOptions: { ...bodyColorOption, type: dotStyle },
      cornersSquareOptions: { ...eyeColorOption, type: cornerSquareStyle },
      cornersDotOptions: { ...eyeColorOption, type: cornerDotStyle },
      backgroundOptions: { color: bgColor },
      image: logo ?? undefined,
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 6,
        imageSize: 0.4,
        hideBackgroundDots: hideLogoBackground,
      },
    }),
    [
      qrSize,
      data,
      bodyColorOption,
      eyeColorOption,
      bgColor,
      dotStyle,
      cornerSquareStyle,
      cornerDotStyle,
      logo,
      hideLogoBackground,
    ],
  )

  useEffect(() => {
    qrRef.current = new QRCodeStyling(options)
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
      qrRef.current.append(containerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    qrRef.current?.update(options)
  }, [options])

  function setLogoFromFile(file: File) {
    const reader = new FileReader()
    reader.onload = () => setLogo(reader.result as string)
    reader.readAsDataURL(file)
  }

  function download(extension: FileExtension) {
    qrRef.current?.download({ name: 'snapclip-qr', extension })
  }

  async function copyImage() {
    const raw = await qrRef.current?.getRawData('png')
    if (!raw) return
    const blob = raw instanceof Blob ? raw : new Blob([raw], { type: 'image/png' })
    const ok = await copyPngBlob(blob)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return {
    qrSize,
    containerRef,
    wrapperRef,
    text,
    setText,
    attachedFile: attachedFileState.attachedFile,
    fileError: attachedFileState.fileError,
    onFileSelect: attachedFileState.selectFile,
    onFileClear: attachedFileState.clearFile,
    isMultiFrame: qrFrames.isMultiFrame,
    frameCount: qrFrames.frames.length,
    frameIndex: qrFrames.frameIndex,
    setFrameIndex: qrFrames.setFrameIndex,
    isPlaying: qrFrames.isPlaying,
    togglePlaying: qrFrames.togglePlaying,
    colorMode,
    setColorMode,
    fgColor,
    setFgColor,
    gradientColor1,
    setGradientColor1,
    gradientColor2,
    setGradientColor2,
    gradientType,
    setGradientType,
    useCustomEyeColor,
    setUseCustomEyeColor,
    eyeColor,
    setEyeColor,
    bgColor,
    setBgColor,
    dotStyle,
    setDotStyle,
    cornerSquareStyle,
    setCornerSquareStyle,
    cornerDotStyle,
    setCornerDotStyle,
    logo,
    setLogo,
    setLogoFromFile,
    hideLogoBackground,
    setHideLogoBackground,
    copied,
    download,
    copyImage,
  }
}
