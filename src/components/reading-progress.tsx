"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-0.5">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
