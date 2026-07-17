import { useEffect, useRef, useState } from 'react'
import { BrowserQRCodeReader, type IScannerControls } from '@zxing/browser'
import { isMobileDevice } from '../../lib/device'
import { decodeScannedText } from '../../lib/textCodec'
import { createChunkAssembler } from './chunkAssembler'

export type ScanState = 'idle' | 'starting' | 'scanning' | 'result' | 'error'
export type FacingMode = 'environment' | 'user'
export type FrameProgress = { received: number; total: number } | null

export function useQrScanner() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsRef = useRef<IScannerControls | null>(null)
  const readerRef = useRef(new BrowserQRCodeReader())
  const assemblerRef = useRef(createChunkAssembler())

  const [state, setState] = useState<ScanState>('idle')
  // Mobile: back camera by default (reading QR codes in front of you).
  // Desktop: front camera, since a desktop's only camera is usually a webcam.
  const [facingMode, setFacingMode] = useState<FacingMode>(() =>
    isMobileDevice() ? 'environment' : 'user',
  )
  const [result, setResult] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [frameProgress, setFrameProgress] = useState<FrameProgress>(null)

  useEffect(() => {
    return () => controlsRef.current?.stop()
  }, [])

  async function startScanning(overrideFacingMode?: FacingMode) {
    const mode = overrideFacingMode ?? facingMode
    setErrorMsg('')
    setFrameProgress(null)
    assemblerRef.current.reset()
    setState('starting')

    if (!navigator.mediaDevices?.getUserMedia) {
      setErrorMsg(
        'Kamera butuh koneksi aman (HTTPS). Buka halaman ini lewat https:// atau localhost, bukan http:// biasa.',
      )
      setState('error')
      return
    }

    try {
      const controls = await readerRef.current.decodeFromConstraints(
        { video: { facingMode: mode } },
        videoRef.current!,
        (scanResult) => {
          if (!scanResult) return
          const outcome = assemblerRef.current.ingest(scanResult.getText())
          if (outcome.type === 'progress') {
            setFrameProgress({ received: outcome.received, total: outcome.total })
            return
          }
          setResult(outcome.type === 'complete' ? outcome.text : decodeScannedText(scanResult.getText()))
          setFrameProgress(null)
          setState('result')
          controlsRef.current?.stop()
        },
      )
      controlsRef.current = controls
      setState('scanning')
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Tidak bisa mengakses kamera. Pastikan izin kamera sudah diberikan.',
      )
      setState('error')
    }
  }

  function stopScanning() {
    controlsRef.current?.stop()
    setFrameProgress(null)
    setState('idle')
  }

  function scanAgain() {
    setResult('')
    startScanning()
  }

  async function switchCamera() {
    controlsRef.current?.stop()
    const next = facingMode === 'environment' ? 'user' : 'environment'
    setFacingMode(next)
    await startScanning(next)
  }

  async function handleFileUpload(file: File) {
    const url = URL.createObjectURL(file)
    try {
      const decoded = await readerRef.current.decodeFromImageUrl(url)
      setResult(decodeScannedText(decoded.getText()))
      setState('result')
    } catch {
      setErrorMsg('QR code tidak terdeteksi di gambar ini.')
      setState('error')
    } finally {
      URL.revokeObjectURL(url)
    }
  }

  return {
    videoRef,
    state,
    result,
    errorMsg,
    frameProgress,
    startScanning,
    stopScanning,
    scanAgain,
    switchCamera,
    handleFileUpload,
  }
}
