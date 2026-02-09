"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { GMLogo } from "@/components/gm-logo"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-all duration-300 ${
        scrolled
          ? "glass border-b shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <GMLogo />

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              asChild
              className="animate-slide-down"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <a href={link.href}>
                <span className="text-primary font-mono text-xs mr-1">
                  0{i + 1}.
                </span>
                {link.label}
              </a>
            </Button>
          ))}
          <ThemeToggle />
          <Button
            size="sm"
            asChild
            className="ml-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 animate-slide-down"
            style={{ animationDelay: "400ms" }}
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
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
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2 text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-primary font-mono text-xs">0{i + 1}.</span>
              {link.label}
            </a>
          ))}
          <Button
            size="sm"
            asChild
            className="mt-2 w-fit bg-primary/10 text-primary border border-primary/20"
          >
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </Button>
        </nav>
      )}
    </header>
  )
}
