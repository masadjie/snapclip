import {
  siFacebook,
  siX,
  siInstagram,
  siWhatsapp,
  siTelegram,
  siPinterest,
  siYoutube,
  siTiktok,
  siSnapchat,
  siDiscord,
  siGithub,
} from 'simple-icons'

export type LogoPreset = { name: string; dataUri: string }

function toDataUri(icon: { path: string; hex: string }): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#${icon.hex}"/><path fill="#fff" d="${icon.path}"/></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const ICONS = [
  siFacebook,
  siX,
  siInstagram,
  siWhatsapp,
  siTelegram,
  siPinterest,
  siYoutube,
  siTiktok,
  siSnapchat,
  siDiscord,
  siGithub,
]

export const LOGO_PRESETS: LogoPreset[] = ICONS.map((icon) => ({
  name: icon.title,
  dataUri: toDataUri(icon),
}))
