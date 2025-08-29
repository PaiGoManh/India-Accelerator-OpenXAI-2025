import type { SVGProps } from 'react'

export default function SentimentDashboardHero(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width={1600}
      height={900}
      viewBox="0 0 1600 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Sentiment dashboard hero</title>
      <desc>Dark dashboard with line charts and sentiment tags</desc>
      <defs>
        <radialGradient
          id="bgGlow"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(800 450) rotate(90) scale(520 900)"
        >
          <stop offset="0" stopColor="#1f2937" />
          <stop offset="1" stopColor="#0b0d12" />
        </radialGradient>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.35" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill="url(#bgGlow)" />
      {/* soft glows */}
      <circle
        cx="350"
        cy="220"
        r="160"
        fill="#22c55e"
        opacity="0.15"
        filter="url(#soft)"
      />
      <circle
        cx="1220"
        cy="690"
        r="200"
        fill="#ef4444"
        opacity="0.12"
        filter="url(#soft)"
      />
      <circle
        cx="900"
        cy="220"
        r="140"
        fill="#f97316"
        opacity="0.12"
        filter="url(#soft)"
      />

      {/* Card */}
      <g transform="translate(180,130)">
        <rect width="1240" height="640" rx="20" fill="#0f131a" stroke="#1f2937" />
        <rect
          x="0.5"
          y="0.5"
          width="1239"
          height="639"
          rx="20"
          fill="url(#areaGrad)"
          opacity="0.25"
        />

        {/* Top bar */}
        <g transform="translate(24,22)">
          <circle cx="10" cy="10" r="6" fill="#ef4444" opacity="0.9" />
          <circle cx="30" cy="10" r="6" fill="#f59e0b" opacity="0.9" />
          <circle cx="50" cy="10" r="6" fill="#22c55e" opacity="0.9" />
          <rect x="88" y="4" width="220" height="12" rx="6" fill="#111827" />
          <rect x="92" y="7" width="90" height="6" rx="3" fill="#374151" />
        </g>

        {/* Left mini cards */}
        <g transform="translate(24,90)">
          <rect width="260" height="120" rx="12" fill="#0b0f15" stroke="#1f2937" />
          <rect x="16" y="18" width="110" height="12" rx="6" fill="#374151" />
          <rect x="16" y="44" width="200" height="6" rx="3" fill="#1f2937" />
          <rect x="16" y="60" width="180" height="6" rx="3" fill="#1f2937" />
          <rect x="16" y="80" width="140" height="6" rx="3" fill="#1f2937" />
        </g>

        <g transform="translate(24,230)">
          <rect width="260" height="120" rx="12" fill="#0b0f15" stroke="#1f2937" />
          <rect x="16" y="18" width="110" height="12" rx="6" fill="#374151" />
          <rect x="16" y="54" width="200" height="8" rx="4" fill="#22c55e" />
        </g>

        <g transform="translate(24,370)">
          <rect width="260" height="120" rx="12" fill="#0b0f15" stroke="#1f2937" />
          <rect x="16" y="18" width="110" height="12" rx="6" fill="#374151" />
          <rect x="16" y="54" width="150" height="8" rx="4" fill="#a1a1aa" />
          <rect x="170" y="54" width="60" height="8" rx="4" fill="#ef4444" />
        </g>

        {/* Main chart */}
        <g transform="translate(320,90)">
          <rect width="880" height="400" rx="14" fill="#0b0f15" stroke="#1f2937" />
          {/* grid */}
          <g stroke="#1f2937" strokeWidth="1">
            <line x1="20" y1="60" x2="860" y2="60" />
            <line x1="20" y1="140" x2="860" y2="140" />
            <line x1="20" y1="220" x2="860" y2="220" />
            <line x1="20" y1="300" x2="860" y2="300" />
          </g>

          {/* area + line */}
          <path
            d="M40 300 L140 260 L220 280 L300 220 L380 240 L460 180 L540 210 L620 160 L700 190 L780 140 L860 180 L860 360 L40 360 Z"
            fill="url(#areaGrad)"
          />
          <path
            d="M40 300 L140 260 L220 280 L300 220 L380 240 L460 180 L540 210 L620 160 L700 190 L780 140 L860 180"
            stroke="#60a5fa"
            strokeWidth="2.5"
            fill="none"
          />
          {/* Sentiment pills */}
          <g transform="translate(680,24)">
            <rect width="170" height="28" rx="14" fill="#0b0f15" stroke="#1f2937" />
            <circle cx="16" cy="14" r="6" fill="#22c55e" />
            <text
              x="32"
              y="19"
              fontFamily="Inter, ui-sans-serif"
              fontSize="12"
              fill="#d1d5db"
            >
              Positive ↑ 12%
            </text>
          </g>
          <g transform="translate(680,60)">
            <rect width="170" height="28" rx="14" fill="#0b0f15" stroke="#1f2937" />
            <circle cx="16" cy="14" r="6" fill="#a1a1aa" />
            <text
              x="32"
              y="19"
              fontFamily="Inter, ui-sans-serif"
              fontSize="12"
              fill="#d1d5db"
            >
              Neutral —
            </text>
          </g>
          <g transform="translate(680,96)">
            <rect width="170" height="28" rx="14" fill="#0b0f15" stroke="#1f2937" />
            <circle cx="16" cy="14" r="6" fill="#ef4444" />
            <text
              x="32"
              y="19"
              fontFamily="Inter, ui-sans-serif"
              fontSize="12"
              fill="#d1d5db"
            >
              Negative ↓ 5%
            </text>
          </g>
        </g>

        {/* Alerts card */}
        <g transform="translate(320,510)">
          <rect width="880" height="120" rx="14" fill="#0b0f15" stroke="#1f2937" />
          <rect x="20" y="28" width="220" height="12" rx="6" fill="#374151" />
          <rect x="20" y="54" width="300" height="8" rx="4" fill="#f97316" />
          <rect x="330" y="46" width="120" height="28" rx="14" fill="#1f2937" />
          <circle cx="346" cy="60" r="6" fill="#f97316" />
          <text
            x="360"
            y="65"
            fontFamily="Inter, ui-sans-serif"
            fontSize="12"
            fill="#e5e7eb"
          >
            Alert: spike detected
          </text>
        </g>
      </g>
    </svg>
  )
}