export type DotStyle =
  | 'square'
  | 'dots'
  | 'rounded'
  | 'classy'
  | 'classy-rounded'
  | 'extra-rounded'

export type CornerSquareStyle = DotStyle | 'dot'
export type CornerDotStyle = DotStyle | 'dot'

/** Preview swatch class per shape — a rough visual cue, not a pixel-accurate QR render. */
export const SHAPE_PREVIEW_CLASS: Record<string, string> = {
  square: 'rounded-none',
  dots: 'rounded-full',
  dot: 'rounded-full',
  rounded: 'rounded-[35%]',
  classy: 'rounded-none rotate-45',
  'classy-rounded': 'rounded-[35%] rotate-45',
  'extra-rounded': 'rounded-[42%]',
}

export const BODY_SHAPE_OPTIONS: { value: DotStyle; label: string }[] = [
  { value: 'square', label: 'Kotak' },
  { value: 'dots', label: 'Bulat' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
]

export const EYE_FRAME_SHAPE_OPTIONS: { value: CornerSquareStyle; label: string }[] = [
  { value: 'square', label: 'Kotak' },
  { value: 'dot', label: 'Bulat' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
]

export const EYE_BALL_SHAPE_OPTIONS: { value: CornerDotStyle; label: string }[] = [
  { value: 'square', label: 'Kotak' },
  { value: 'dot', label: 'Bulat' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy Rounded' },
  { value: 'extra-rounded', label: 'Extra Rounded' },
]
