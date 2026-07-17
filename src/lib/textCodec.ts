import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

/** Above this many *compressed* characters, a single QR gets too dense to scan reliably. */
export const SINGLE_QR_SAFE_LENGTH = 1200
/** Compressed characters per animated-frame chunk (leaves room for the frame header). */
export const CHUNK_DATA_SIZE = 600
export const FRAME_INTERVAL_MS = 1200

const CHUNK_MAGIC = 'SC1'
const CHUNK_RE = /^SC1\|([a-z0-9]+)\|(\d+)\|(\d+)\|([\s\S]*)$/i

export function compressText(text: string): string {
  return compressToEncodedURIComponent(text)
}

export function decompressText(compressed: string): string | null {
  try {
    return decompressFromEncodedURIComponent(compressed)
  } catch {
    return null
  }
}

function randomSessionId(): string {
  return Math.random().toString(36).slice(2, 6)
}

/**
 * Turns text into one or more QR payload strings. Text is always compressed
 * first (transparent to the user, ~40-60% smaller for typical prose). If it
 * still doesn't fit a single scannable QR, it's split into a sequence of
 * frames meant to be shown one after another and reassembled on scan.
 */
export function buildFrames(text: string): string[] {
  const compressed = compressText(text)
  if (compressed.length <= SINGLE_QR_SAFE_LENGTH) {
    return [compressed]
  }

  const sessionId = randomSessionId()
  const chunks: string[] = []
  for (let i = 0; i < compressed.length; i += CHUNK_DATA_SIZE) {
    chunks.push(compressed.slice(i, i + CHUNK_DATA_SIZE))
  }
  return chunks.map(
    (chunk, index) => `${CHUNK_MAGIC}|${sessionId}|${index}|${chunks.length}|${chunk}`,
  )
}

export type ParsedChunk = { sessionId: string; index: number; total: number; data: string }

export function parseChunk(raw: string): ParsedChunk | null {
  const match = CHUNK_RE.exec(raw)
  if (!match) return null
  const [, sessionId, indexStr, totalStr, data] = match
  return { sessionId, index: Number(indexStr), total: Number(totalStr), data }
}

/** Decode whatever a scanner read: our compressed payload, or arbitrary third-party QR text. */
export function decodeScannedText(raw: string): string {
  return decompressText(raw) ?? raw
}
