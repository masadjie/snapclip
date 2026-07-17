import { decompressText, parseChunk } from '../../lib/textCodec'

export type ChunkOutcome =
  | { type: 'not-chunk' }
  | { type: 'progress'; received: number; total: number }
  | { type: 'complete'; text: string }

/** Accumulates multi-frame QR chunks (see lib/textCodec) scanned in any order. */
export function createChunkAssembler() {
  let sessionId: string | null = null
  let total = 0
  const parts = new Map<number, string>()

  function ingest(raw: string): ChunkOutcome {
    const chunk = parseChunk(raw)
    if (!chunk) return { type: 'not-chunk' }

    if (chunk.sessionId !== sessionId) {
      sessionId = chunk.sessionId
      total = chunk.total
      parts.clear()
    }
    parts.set(chunk.index, chunk.data)

    if (parts.size >= total) {
      const joined = Array.from({ length: total }, (_, i) => parts.get(i) ?? '').join('')
      return { type: 'complete', text: decompressText(joined) ?? joined }
    }
    return { type: 'progress', received: parts.size, total }
  }

  function reset() {
    sessionId = null
    total = 0
    parts.clear()
  }

  return { ingest, reset }
}
