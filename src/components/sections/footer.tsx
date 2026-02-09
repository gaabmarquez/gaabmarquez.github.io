import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center gap-5">
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
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/60 font-mono">
          Built with Next.js & shadcn/ui
        </p>
      </div>
    </footer>
  )
}
