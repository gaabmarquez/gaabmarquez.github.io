"use client"

import { useEffect } from "react"

export function CodeCopyButton() {
  useEffect(() => {
    const pres = document.querySelectorAll<HTMLPreElement>(".prose pre")
    pres.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return
      const btn = document.createElement("button")
      btn.className = "copy-btn"
      btn.textContent = "Copy"
      btn.addEventListener("click", () => {
        const code = pre.querySelector("code")
        if (code) {
          navigator.clipboard.writeText(code.textContent || "")
          btn.textContent = "Copied!"
          setTimeout(() => {
            btn.textContent = "Copy"
          }, 2000)
        }
      })
      pre.appendChild(btn)
    })
  }, [])

  return null
}
