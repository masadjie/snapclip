import { FileText, Palette, Image, LayoutGrid } from 'lucide-react'
import { Accordion } from '../../components/Accordion'
import { useQrCodeStyling } from './useQrCodeStyling'
import { ContentSection } from './ContentSection'
import { ColorSection } from './ColorSection'
import { LogoSection } from './LogoSection'
import { DesignSection } from './DesignSection'
import { PreviewPanel } from './PreviewPanel'

export function GeneratePage() {
  const qr = useQrCodeStyling()

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6 p-4 md:p-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Buat QR Code
        </h1>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Ketik atau tempel teks, lalu scan hasilnya di perangkat lain untuk paste.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_360px]">
        <div className="order-2 md:order-1">
          <Accordion
            defaultOpen={['content']}
            sections={[
              {
                id: 'content',
                title: 'Isi Teks',
                icon: <FileText size={16} />,
                content: (
                  <ContentSection
                    value={qr.text}
                    onChange={qr.setText}
                    isMultiFrame={qr.isMultiFrame}
                    frameCount={qr.frameCount}
                    compressedLength={qr.compressedLength}
                    attachedFile={qr.attachedFile}
                    fileError={qr.fileError}
                    onFileSelect={qr.onFileSelect}
                    onFileClear={qr.onFileClear}
                  />
                ),
              },
              {
                id: 'colors',
                title: 'Set Warna',
                icon: <Palette size={16} />,
                content: (
                  <ColorSection
                    colorMode={qr.colorMode}
                    onColorModeChange={qr.setColorMode}
                    fgColor={qr.fgColor}
                    onFgColorChange={qr.setFgColor}
                    gradientColor1={qr.gradientColor1}
                    onGradientColor1Change={qr.setGradientColor1}
                    gradientColor2={qr.gradientColor2}
                    onGradientColor2Change={qr.setGradientColor2}
                    gradientType={qr.gradientType}
                    onGradientTypeChange={qr.setGradientType}
                    useCustomEyeColor={qr.useCustomEyeColor}
                    onUseCustomEyeColorChange={qr.setUseCustomEyeColor}
                    eyeColor={qr.eyeColor}
                    onEyeColorChange={qr.setEyeColor}
                    bgColor={qr.bgColor}
                    onBgColorChange={qr.setBgColor}
                  />
                ),
              },
              {
                id: 'logo',
                title: 'Tambah Logo',
                icon: <Image size={16} />,
                content: (
                  <LogoSection
                    logo={qr.logo}
                    onLogoFile={qr.setLogoFromFile}
                    onLogoPreset={qr.setLogo}
                    onLogoClear={() => qr.setLogo(null)}
                    hideLogoBackground={qr.hideLogoBackground}
                    onHideLogoBackgroundChange={qr.setHideLogoBackground}
                  />
                ),
              },
              {
                id: 'design',
                title: 'Kustomisasi Bentuk',
                icon: <LayoutGrid size={16} />,
                content: (
                  <DesignSection
                    dotStyle={qr.dotStyle}
                    onDotStyleChange={qr.setDotStyle}
                    cornerSquareStyle={qr.cornerSquareStyle}
                    onCornerSquareStyleChange={qr.setCornerSquareStyle}
                    cornerDotStyle={qr.cornerDotStyle}
                    onCornerDotStyleChange={qr.setCornerDotStyle}
                  />
                ),
              },
            ]}
          />
        </div>

        <PreviewPanel
          containerRef={qr.containerRef}
          wrapperRef={qr.wrapperRef}
          size={qr.qrSize}
          copied={qr.copied}
          onDownload={qr.download}
          onCopyImage={qr.copyImage}
          isMultiFrame={qr.isMultiFrame}
          frameCount={qr.frameCount}
          frameIndex={qr.frameIndex}
          isPlaying={qr.isPlaying}
          onTogglePlaying={qr.togglePlaying}
          hasContent={qr.text.trim().length > 0 || qr.attachedFile !== null}
          onClearContent={qr.clearContent}
        />
      </div>
    </div>
  )
}
