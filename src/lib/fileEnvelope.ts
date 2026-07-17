/** Files are only realistic over QR up to a few tens of KB — beyond that,
 * even animated multi-QR would need hundreds of frames to scan. */
export const MAX_FILE_BYTES = 20 * 1024

const FILE_MAGIC = 'SCFILE1'

export type FileEnvelope = { filename: string; mimeType: string; base64Data: string }

export function encodeFileEnvelope(filename: string, mimeType: string, base64Data: string): string {
  return `${FILE_MAGIC}|${encodeURIComponent(filename)}|${encodeURIComponent(mimeType)}|${base64Data}`
}

export function parseFileEnvelope(text: string): FileEnvelope | null {
  if (!text.startsWith(FILE_MAGIC + '|')) return null
  const rest = text.slice(FILE_MAGIC.length + 1)

  const firstPipe = rest.indexOf('|')
  if (firstPipe === -1) return null
  const filename = decodeURIComponent(rest.slice(0, firstPipe))

  const afterFilename = rest.slice(firstPipe + 1)
  const secondPipe = afterFilename.indexOf('|')
  if (secondPipe === -1) return null
  const mimeType = decodeURIComponent(afterFilename.slice(0, secondPipe))
  const base64Data = afterFilename.slice(secondPipe + 1)

  return { filename, mimeType, base64Data }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Reads a File as a data URL and returns the base64 payload (without the `data:...;base64,` prefix). */
export function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const commaIndex = result.indexOf(',')
      resolve(commaIndex === -1 ? result : result.slice(commaIndex + 1))
    }
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
