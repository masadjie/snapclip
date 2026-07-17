import { useMemo, useState } from 'react'
import { useQrScanner } from './useQrScanner'
import { ScannerView } from './ScannerView'
import { ResultPanel } from './ResultPanel'
import { FileResultPanel } from './FileResultPanel'
import { copyText } from '../../lib/clipboard'
import { parseFileEnvelope } from '../../lib/fileEnvelope'

export function ScanPage() {
  const scanner = useQrScanner()
  const [copied, setCopied] = useState(false)
  const fileResult = useMemo(() => parseFileEnvelope(scanner.result), [scanner.result])

  async function handleCopy() {
    const ok = await copyText(scanner.result)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 p-4 md:p-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Scan QR Code
        </h1>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Arahkan kamera ke QR code untuk mengambil teksnya.
        </p>
      </div>

      {scanner.state === 'result' && fileResult ? (
        <FileResultPanel file={fileResult} onScanAgain={scanner.scanAgain} />
      ) : scanner.state === 'result' ? (
        <ResultPanel
          result={scanner.result}
          copied={copied}
          onCopy={handleCopy}
          onScanAgain={scanner.scanAgain}
        />
      ) : (
        <ScannerView
          videoRef={scanner.videoRef}
          state={scanner.state}
          errorMsg={scanner.errorMsg}
          frameProgress={scanner.frameProgress}
          onStart={() => scanner.startScanning()}
          onStop={scanner.stopScanning}
          onSwitchCamera={scanner.switchCamera}
          onFileUpload={scanner.handleFileUpload}
        />
      )}
    </div>
  )
}
