"use client"

import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

export function Contact() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div
        ref={ref}
        className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="text-sm font-mono text-primary mb-4">
          04. What&apos;s Next?
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
          <span className="gradient-text">Let&apos;s Connect</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
          I&apos;m always open to hearing about new opportunities, interesting
          projects, or just connecting with fellow developers. Whether you have
          a question or simply want to say hello, I&apos;ll do my best to get
          back to you.
        </p>
        <Button
          size="lg"
          asChild
          className="group relative overflow-hidden bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 px-8"
        >
          <a href="mailto:gaabmarquez@gmail.com">
            <Mail className="h-4 w-4 mr-2 group-hover:animate-bounce" />
            Say Hello
          </a>
        </Button>
      </div>
    </section>
  )
}
