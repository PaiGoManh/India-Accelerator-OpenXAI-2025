// components/VibeCheckAIIcon.tsx
import * as React from 'react'

export type VibeCheckAIIconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string
  gradient?: boolean
  title?: string
}

export default function VibeCheckAIIcon({
  size = 28,
  gradient = true,
  title = 'VibeCheckAI icon',
  ...props
}: VibeCheckAIIconProps) {
  // Unique, SSR-safe gradient id to avoid collisions if multiple icons are on the page
  const reactId = React.useId()
  const gradId = React.useMemo(() => `vcai-g-${reactId.replace(/:/g, '')}`, [reactId])

  const stroke = gradient ? `url(#${gradId})` : 'currentColor'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label={props['aria-label'] ?? title}
      {...props}
    >
      {gradient && (
        <defs>
          <linearGradient id={gradId} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8B5CF6" />
            <stop offset=".5" stopColor="#6366F1" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      )}

      {title ? <title>{title}</title> : null}

      <circle
        cx="12"
        cy="12"
        r="9.25"
        stroke={stroke}
        strokeWidth="2.5"
        fill="none"
        opacity={gradient ? 0.9 : 0.35}
      />
      <path
        d="M7 12.5l3.5 3.5L17 9"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}