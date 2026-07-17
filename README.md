# SnapClip

Copy text on one device, scan a QR code, paste it on another. No account, no network pairing — everything runs client-side in the browser.

## Features (v1)

- Generate a customizable QR code from any text (color, dot style, optional logo)
- Scan a QR code with your camera, or upload an image, to recover the text
- Installable PWA, works offline after first load

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) for generation
- [@zxing/browser](https://github.com/zxing-js/browser) for scanning
- vite-plugin-pwa for the service worker / manifest

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## License

MIT
