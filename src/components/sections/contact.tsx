import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm font-mono text-muted-foreground mb-2">
          04. What&apos;s Next?
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
          Let&apos;s Connect
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          I&apos;m always open to hearing about new opportunities, interesting
          projects, or just connecting with fellow developers. Whether you have
          a question or simply want to say hello, I&apos;ll do my best to get
          back to you.
        </p>
        <Button size="lg" asChild>
          <a href="mailto:gaabmarquez@gmail.com">
            <Mail className="h-4 w-4 mr-2" />
            Say Hello
          </a>
        </Button>
      </div>
    </section>
  )
}
