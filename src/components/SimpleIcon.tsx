export function SimpleIcon({
  icon,
  size = 16,
  className,
}: {
  icon: { path: string }
  size?: number
  className?: string
}) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="currentColor">
      <path d={icon.path} />
    </svg>
  )
}
