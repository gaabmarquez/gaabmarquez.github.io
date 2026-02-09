"use client"

import { Badge } from "@/components/ui/badge"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const technologies = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Angular",
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Docker",
  "AWS",
  "REST APIs",
  "CI/CD",
]

export function About() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <span className="text-sm font-mono text-primary font-normal">01.</span>
          About Me
          <div className="h-px bg-border flex-1 ml-4" />
        </h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-accent rounded-full mb-10" />

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a software developer who thrives on turning complex
              problems into clean, maintainable solutions. My work spans the
              full stack&mdash;from designing intuitive user interfaces to
              architecting robust backend services that handle real-world scale.
            </p>
            <p>
              Over the past decade, I&apos;ve worked across fintech, logistics,
              and enterprise software, giving me a broad perspective on what
              makes software truly reliable. I care deeply about code quality,
              thoughtful architecture, and shipping features that actually solve
              user problems.
            </p>
            <p>
              When I&apos;m not writing code, you&apos;ll find me exploring new
              technologies, contributing to side projects, or digging into
              system design challenges. I believe the best engineers never stop
              learning.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-primary">
              Technologies I work with
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="hover:bg-primary/10 hover:text-primary hover:border-primary/20 border border-transparent transition-all duration-300 cursor-default"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
