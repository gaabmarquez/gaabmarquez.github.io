"use client"

import { Badge } from "@/components/ui/badge"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

const techCategories = [
  {
    label: "Front End",
    items: ["JavaScript", "React", "Redux", "Angular", "HTML", "CSS", "SASS"],
  },
  {
    label: "Back End",
    items: ["Java", "Golang", "Node.js", "Express", "Spring", "Hibernate", "REST APIs", "gRPC", "RabbitMQ"],
  },
  {
    label: "Data Stores",
    items: ["PostgreSQL", "MySQL", "Oracle", "MongoDB"],
  },
  {
    label: "DevOps",
    items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Jenkins", "CI/CD", "Nginx"],
  },
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
        className={`max-w-5xl mx-auto will-change-[transform,opacity] transition-[transform,opacity] duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
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
              I&apos;m a Full Stack Engineer with over 10 years of experience
              designing and building software that scales. I enjoy working
              across the entire stack&mdash;from crafting intuitive user
              interfaces to architecting robust backend services and
              infrastructure&mdash;and I&apos;m always looking for better ways
              to solve problems and deliver value.
            </p>
            <p>
              I thrive in collaborative, cross-functional teams where I can
              contribute technically while also mentoring others and raising the
              bar on code quality. I care deeply about writing clean,
              maintainable code and building systems that hold up in production
              at real-world scale.
            </p>
          </div>

          <div className="space-y-5">
            {techCategories.map((cat) => (
              <div key={cat.label}>
                <h3 className="text-xs font-semibold mb-2 uppercase tracking-wider text-primary">
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs hover:bg-primary/10 hover:text-primary hover:border-primary/20 border border-transparent transition-all duration-300 cursor-default"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
