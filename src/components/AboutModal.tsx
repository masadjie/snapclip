import { siGithub } from 'simple-icons'
import { X, QrCode, Wifi, ShieldCheck } from 'lucide-react'
import { SimpleIcon } from './SimpleIcon'

export function AboutModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="h-9 w-9 rounded-lg" />
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">SnapClip</p>
              <p className="text-xs font-medium text-brand-600 dark:text-brand-400">
                Gratis &amp; Open Source
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
          >
            <X size={20} />
          </button>
        </div>

        <p className="mb-4 text-sm text-stone-600 dark:text-stone-300">
          SnapClip bikin kamu bisa salin teks di satu perangkat, lalu scan QR code untuk paste di
          perangkat lain — laptop ke HP, HP ke laptop, apa saja — tanpa akun, tanpa aplikasi
          pairing, tanpa kabel.
        </p>

        <ul className="mb-5 flex flex-col gap-2.5 text-sm text-stone-600 dark:text-stone-300">
          <li className="flex items-center gap-2.5">
            <QrCode size={16} className="shrink-0 text-brand-600 dark:text-brand-400" />
            Semua proses generate &amp; scan jalan di browser kamu
          </li>
          <li className="flex items-center gap-2.5">
            <Wifi size={16} className="shrink-0 text-brand-600 dark:text-brand-400" />
            Tidak butuh internet setelah halaman pertama kali dimuat
          </li>
          <li className="flex items-center gap-2.5">
            <ShieldCheck size={16} className="shrink-0 text-brand-600 dark:text-brand-400" />
            Teksmu tidak pernah dikirim ke server manapun
          </li>
        </ul>

        <a
          href="https://github.com/masadjie/snapclip"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg border border-stone-200 px-3 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
        >
          <SimpleIcon icon={siGithub} size={16} />
          Lihat Kode Sumber di GitHub
        </a>
      </div>
    </div>
  )
}
