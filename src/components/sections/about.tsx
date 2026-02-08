import { Badge } from "@/components/ui/badge"

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
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <span className="text-sm font-mono text-muted-foreground font-normal">01.</span>
          About Me
        </h2>
        <div className="h-px bg-border flex-1 mb-10" />

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I&apos;m a software developer who thrives on turning complex
              problems into clean, maintainable solutions. My work spans the
              full stack -- from designing intuitive user interfaces to
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
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">
              Technologies I work with
            </h3>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
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
