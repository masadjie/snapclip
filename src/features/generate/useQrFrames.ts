import { useEffect, useMemo, useState } from 'react'
import { buildFrames, compressText, FRAME_INTERVAL_MS } from '../../lib/textCodec'

/**
 * Turns text into one or more QR payload frames (see lib/textCodec) and, when
 * there's more than one, cycles through them on a timer so a second device
 * can scan the whole sequence and reassemble the original text.
 */
export function useQrFrames(text: string) {
  const normalizedText = text.trim().length > 0 ? text : ' '
  const frames = useMemo(() => buildFrames(normalizedText), [normalizedText])
  const compressedLength = useMemo(() => compressText(normalizedText).length, [normalizedText])
  const [frameIndex, setFrameIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    setFrameIndex(0)
  }, [frames])

  useEffect(() => {
    if (frames.length <= 1 || !isPlaying) return
    const id = setInterval(() => {
      setFrameIndex((i) => (i + 1) % frames.length)
    }, FRAME_INTERVAL_MS)
    return () => clearInterval(id)
  }, [frames, isPlaying])

  return {
    frames,
    compressedLength,
    frameData: frames[frameIndex],
    frameIndex,
    setFrameIndex,
    isMultiFrame: frames.length > 1,
    isPlaying,
    togglePlaying: () => setIsPlaying((p) => !p),
  }
}
