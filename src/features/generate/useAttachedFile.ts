import { useState } from 'react'
import { MAX_FILE_BYTES, encodeFileEnvelope, formatBytes, readFileAsBase64 } from '../../lib/fileEnvelope'

export type AttachedFileMeta = { name: string; size: number }

/**
 * Lets a small file (well under QR's practical capacity) ride through the
 * exact same compress + multi-frame pipeline as regular text — it's just a
 * specially-tagged string (see lib/fileEnvelope) under the hood.
 */
export function useAttachedFile() {
  const [attachedFile, setAttachedFile] = useState<AttachedFileMeta | null>(null)
  const [fileEnvelope, setFileEnvelope] = useState<string | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  async function selectFile(file: File) {
    if (file.size > MAX_FILE_BYTES) {
      setFileError(
        `File terlalu besar (${formatBytes(file.size)}). Maksimal ${formatBytes(MAX_FILE_BYTES)} untuk dikirim lewat QR — coba AirDrop/Bluetooth/cloud share untuk file yang lebih besar.`,
      )
      return
    }
    setFileError(null)
    const base64 = await readFileAsBase64(file)
    setFileEnvelope(encodeFileEnvelope(file.name, file.type || 'application/octet-stream', base64))
    setAttachedFile({ name: file.name, size: file.size })
  }

  function clearFile() {
    setAttachedFile(null)
    setFileEnvelope(null)
    setFileError(null)
  }

  return { attachedFile, fileEnvelope, fileError, selectFile, clearFile }
}
