"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { ParticleBackground } from "@/components/three-background"

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-16 overflow-x-hidden">
      {/* Three.js particle background */}
      <ParticleBackground />

      <div className="max-w-5xl mx-auto w-full">
        <p className="text-sm font-mono text-primary mb-6 tracking-wide animate-fade-in">
          Hi, my name is
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 animate-slide-up">
          <span className="gradient-text">Gabriel Márquez.</span>
        </h1>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-muted-foreground mb-6 animate-slide-up"
          style={{ animationDelay: "150ms" }}
        >
          I engineer scalable software.
        </h2>
        <p
          className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          Full Stack Engineer with 10+ years of experience building secure,
          maintainable systems for fintech, healthcare, and retail. Passionate
          about leveraging cutting-edge technologies to solve complex challenges.
        </p>

        <div
          className="flex flex-wrap items-center gap-4 mb-14 animate-slide-up"
          style={{ animationDelay: "450ms" }}
        >
          <Button
            size="lg"
            asChild
            className="group relative overflow-hidden bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            <a href="#experience">
              <span className="relative z-10">See my work</span>
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
          >
            <a href="#contact">Get in touch</a>
          </Button>
        </div>

        <div
          className="flex items-center gap-5 animate-slide-up"
          style={{ animationDelay: "600ms" }}
        >
          {[
            { href: "https://github.com/gaabmarquez", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com/in/gaabmarquez", icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:gaabmarquez@gmail.com", icon: Mail, label: "Email" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel={label !== "Email" ? "noopener noreferrer" : undefined}
              className="text-muted-foreground hover:text-primary hover:-translate-y-1 transition-all duration-300"
              aria-label={label}
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
          <div className="h-px w-24 bg-border ml-2" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block animate-fade-in" style={{ animationDelay: "800ms" }}>
        <a
          href="#about"
          className="text-muted-foreground hover:text-primary transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}
