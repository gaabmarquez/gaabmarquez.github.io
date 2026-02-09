"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

interface Position {
  title: string
  company: string
  period: string
  highlights: string[]
  tech: string[]
}

const positions: Position[] = [
  {
    title: "Full Stack Developer",
    company: "dLocal",
    period: "Mar 2020 -- Present",
    highlights: [
      "Build and maintain payment processing features powering transactions across 40+ emerging markets",
      "Develop merchant-facing dashboards and internal tools using React, Redux, and TypeScript",
      "Design and implement backend microservices with Java and Spring Boot, handling high-throughput payment flows",
      "Collaborate with cross-functional teams to deliver payment solutions for global merchants",
      "Drive improvements in CI/CD pipelines and development workflows to accelerate delivery",
    ],
    tech: ["React", "TypeScript", "Java", "Spring Boot", "Microservices", "Docker"],
  },
  {
    title: "Full Stack Developer",
    company: "Blue Trail Software",
    period: "Jan 2018 -- Feb 2020",
    highlights: [
      "Delivered full-stack features for US-based clients across diverse industries and tech stacks",
      "Built responsive web applications with Angular and React, backed by Node.js and PHP services",
      "Implemented RESTful APIs, integrated third-party services, and managed database schemas",
      "Participated in code reviews and mentored junior developers on best practices",
    ],
    tech: ["Angular", "React", "Node.js", "PHP", "PostgreSQL", "REST APIs"],
  },
  {
    title: "Software Engineer",
    company: "Netlabs",
    period: "May 2016 -- Jan 2018",
    highlights: [
      "Developed enterprise web applications for government and logistics clients in Uruguay",
      "Built frontend interfaces with Angular and backend services with Java and Spring",
      "Contributed to system design decisions and database modeling for greenfield projects",
      "Worked within Agile/Scrum teams delivering iterative releases",
    ],
    tech: ["Angular", "Java", "Spring", "Oracle DB", "Agile"],
  },
  {
    title: "Java Developer",
    company: "GEOCOM",
    period: "Aug 2014 -- May 2016",
    highlights: [
      "Built GIS-based web applications for geographic data visualization and analysis",
      "Developed backend services in Java and integrated mapping APIs for spatial data processing",
      "Gained foundational experience in software development practices, version control, and team collaboration",
    ],
    tech: ["Java", "Spring", "GIS", "JavaScript", "SQL"],
  },
]

export function Experience() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/3 blur-3xl" />
      </div>

      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <span className="text-sm font-mono text-primary font-normal">02.</span>
          Where I&apos;ve Worked
          <div className="h-px bg-border flex-1 ml-4" />
        </h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-accent rounded-full mb-10" />

        <div className="relative space-y-6">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent hidden md:block ml-[11px]" />

          {positions.map((position) => (
            <div
              key={`${position.company}-${position.period}`}
              className="relative md:pl-10"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-7 w-6 h-6 rounded-full border-2 border-primary bg-background hidden md:flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <Card className="gradient-border border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <CardTitle className="text-lg">
                      {position.title}{" "}
                      <span className="text-primary">@ {position.company}</span>
                    </CardTitle>
                    <CardDescription className="text-sm font-mono whitespace-nowrap text-primary/70">
                      {position.period}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {position.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground pl-4 relative before:content-['▸'] before:absolute before:left-0 before:text-primary"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {position.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary border-0"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
