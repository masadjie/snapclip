import { ShapePicker } from './ShapePicker'
import {
  BODY_SHAPE_OPTIONS,
  EYE_BALL_SHAPE_OPTIONS,
  EYE_FRAME_SHAPE_OPTIONS,
  type CornerDotStyle,
  type CornerSquareStyle,
  type DotStyle,
} from '../../lib/qr'

export function DesignSection({
  dotStyle,
  onDotStyleChange,
  cornerSquareStyle,
  onCornerSquareStyleChange,
  cornerDotStyle,
  onCornerDotStyleChange,
}: {
  dotStyle: DotStyle
  onDotStyleChange: (value: DotStyle) => void
  cornerSquareStyle: CornerSquareStyle
  onCornerSquareStyleChange: (value: CornerSquareStyle) => void
  cornerDotStyle: CornerDotStyle
  onCornerDotStyleChange: (value: CornerDotStyle) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <ShapePicker label="Bentuk Body" value={dotStyle} options={BODY_SHAPE_OPTIONS} onChange={onDotStyleChange} />
      <ShapePicker
        label="Bentuk Eye Frame"
        value={cornerSquareStyle}
        options={EYE_FRAME_SHAPE_OPTIONS}
        onChange={onCornerSquareStyleChange}
      />
      <ShapePicker
        label="Bentuk Eye Ball"
        value={cornerDotStyle}
        options={EYE_BALL_SHAPE_OPTIONS}
        onChange={onCornerDotStyleChange}
      />
    </div>
  )
}
