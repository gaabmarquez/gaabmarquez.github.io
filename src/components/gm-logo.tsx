"use client"

import { useState } from "react"

export function GMLogo() {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href="#"
      className="group relative block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Home"
    >
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 animate-float transition-all duration-500 ease-out"
        style={{
          filter: hovered
            ? "drop-shadow(0 0 16px hsl(243 75% 59% / 0.6))"
            : "drop-shadow(0 0 4px hsl(243 75% 59% / 0.2))",
          transform: hovered
            ? "translateY(-2px) rotate(-3deg) scale(1.1)"
            : undefined,
        }}
      >
        <defs>
          <linearGradient id="gm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(243 75% 59%)" />
            <stop offset="50%" stopColor="hsl(262 83% 58%)" />
            <stop offset="100%" stopColor="hsl(16 90% 58%)" />
          </linearGradient>
        </defs>
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="12"
          fill="none"
          stroke="url(#gm-grad)"
          strokeWidth="2.5"
          className="transition-all duration-500"
          style={{
            strokeDasharray: hovered ? "0 0" : "160 20",
            strokeDashoffset: hovered ? 0 : 0,
          }}
        />
        <text
          x="24"
          y="32"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize="20"
          fontWeight="800"
          letterSpacing="-1"
          fill="url(#gm-grad)"
        >
          GM
        </text>
      </svg>
    </a>
  )
}
