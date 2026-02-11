"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { GMLogo } from "@/components/gm-logo"
import { Menu, X } from "lucide-react"

const sectionLinks = [
  { label: "About", anchor: "#about" },
  { label: "Experience", anchor: "#experience" },
  { label: "Projects", anchor: "#projects" },
  { label: "Contact", anchor: "#contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getHref = (anchor: string) => (isHome ? anchor : `/${anchor}`)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-all duration-300 ${
        scrolled
          ? "glass border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <GMLogo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {sectionLinks.map((link, i) => (
            <Button
              key={link.anchor}
              variant="ghost"
              size="sm"
              asChild
              className="animate-slide-down"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <a href={getHref(link.anchor)}>
                <span className="text-primary font-mono text-xs mr-1">
                  0{i + 1}.
                </span>
                {link.label}
              </a>
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="animate-slide-down"
            style={{ animationDelay: `${sectionLinks.length * 100}ms` }}
          >
            <Link href="/blog">
              <span className="text-primary font-mono text-xs mr-1">
                0{sectionLinks.length + 1}.
              </span>
              Blog
            </Link>
          </Button>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t glass px-6 py-4 flex flex-col gap-2 animate-slide-down">
          {sectionLinks.map((link, i) => (
            <a
              key={link.anchor}
              href={getHref(link.anchor)}
              className="py-2 text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-primary font-mono text-xs">0{i + 1}.</span>
              {link.label}
            </a>
          ))}
          <Link
            href="/blog"
            className="py-2 text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-primary font-mono text-xs">0{sectionLinks.length + 1}.</span>
            Blog
          </Link>
        </nav>
      )}
    </header>
  )
}
