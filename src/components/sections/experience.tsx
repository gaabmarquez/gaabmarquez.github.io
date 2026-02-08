import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <span className="text-sm font-mono text-muted-foreground font-normal">02.</span>
          Where I&apos;ve Worked
        </h2>
        <div className="h-px bg-border flex-1 mb-10" />

        <div className="space-y-6">
          {positions.map((position) => (
            <Card key={`${position.company}-${position.period}`}>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <CardTitle className="text-lg">
                    {position.title}{" "}
                    <span className="text-primary">@ {position.company}</span>
                  </CardTitle>
                  <CardDescription className="text-sm font-mono whitespace-nowrap">
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
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
