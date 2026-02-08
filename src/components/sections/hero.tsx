import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center px-6 pt-16">
      <div className="max-w-5xl mx-auto w-full">
        <p className="text-sm font-mono text-muted-foreground mb-4 tracking-wide">
          Hi, my name is
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
          Gabriel Márquez.
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-muted-foreground mb-6">
          I build things for the web.
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
          Full stack developer based in Uruguay, specializing in building
          reliable, scalable web applications. Currently focused on payment
          infrastructure and fintech solutions.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-12">
          <Button size="lg" asChild>
            <a href="#experience">See my work</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">Get in touch</a>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/gaabmarquez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/gaabmarquez"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href="mailto:gaabmarquez@gmail.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <a
          href="#about"
          className="text-muted-foreground hover:text-foreground transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  )
}
