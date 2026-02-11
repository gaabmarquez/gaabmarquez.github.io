"use client"

import { useEffect, useState } from "react"
import type { TocItem } from "@/lib/blog"

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  if (items.length < 3) return null

  return (
    <nav className="hidden xl:block" aria-label="Table of contents">
      <div className="sticky top-24">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
          On this page
        </p>
        <ul className="space-y-1.5 text-sm border-l border-border pl-3">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block transition-colors duration-200 hover:text-primary ${
                  item.level === 3 ? "pl-3" : ""
                } ${
                  activeId === item.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
