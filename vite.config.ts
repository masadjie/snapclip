import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { VitePWA } from 'vite-plugin-pwa'

// HTTPS is opt-in via `npm run dev:https` — only needed to test camera
// access from another device on the same Wi-Fi (getUserMedia requires a
// secure context on any origin other than localhost). Plain `npm run dev`
// stays on HTTP.
const useHttps = process.env.HTTPS === 'true'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    ...(useHttps ? [basicSsl()] : []),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'SnapClip - Copy Paste Teks & File via QR Code',
        short_name: 'SnapClip',
        description:
          'Salin teks atau file kecil di satu perangkat, scan QR code untuk paste di perangkat lain. Gratis, open source, tanpa akun, tanpa internet.',
        theme_color: '#151312',
        background_color: '#151312',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
})
