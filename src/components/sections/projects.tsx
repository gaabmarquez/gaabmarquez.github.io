"use client"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Folder } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

interface Project {
  name: string
  description: string
  tech: string[]
}

const projects: Project[] = [
  {
    name: "Client Onboarding System",
    description:
      "End-to-end digital onboarding platform for a US bank. Features identity verification, document management, Google Maps integration, and automated Cypress testing across multiple onboarding flows.",
    tech: ["React", "Java", "AWS", "Cypress", "Material UI"],
  },
  {
    name: "Healthcare Messaging Platform",
    description:
      "Secure doctor-patient communication platform with text, call, and video. Integrated Twilio, EHR providers, and built with circuit breakers and 800+ unit tests for reliability.",
    tech: ["Java", "Spring", "Kubernetes", "RabbitMQ", "JUnit"],
  },
  {
    name: "Telecom Microservices Platform",
    description:
      "Architected and deployed microservices for Movistar using Docker, Kubernetes, and OpenShift. Built CSV parsers, external service integrations, and internal web applications with Angular.",
    tech: ["Java", "Kubernetes", "OpenShift", "Angular", "Docker"],
  },
]

export function Projects() {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full bg-chart-3/3 blur-3xl" />
      </div>

      <div
        ref={ref}
        className={`max-w-5xl mx-auto will-change-[transform,opacity] transition-[transform,opacity] duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <span className="text-sm font-mono text-primary font-normal">03.</span>
          Notable Projects
          <div className="h-px bg-border flex-1 ml-4" />
        </h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-accent rounded-full mb-10" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.name}
              className="flex flex-col gradient-border border-border/50 group hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <Folder className="h-9 w-9 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                  {project.name}
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs border-border/50 text-muted-foreground">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
