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
  location: string
  period: string
  summary?: string
  highlights: string[]
  tech: string[]
}

const positions: Position[] = [
  {
    title: "Full Stack Engineer",
    company: "American Bank",
    location: "Remote",
    period: "Mar 2023 -- Present",
    summary:
      "Contractor for a Texas-based bank, contributing to the Client Onboarding System and Bank Staff Backoffice.",
    highlights: [
      "Designed and implemented an intuitive, responsive client onboarding experience using React and Material UI",
      "Integrated third-party APIs for identity verification, document management, and Google Maps to ensure regulatory compliance",
      "Developed new backend endpoints in Java and automated SFTP file processing with SendGrid notifications",
      "Introduced Cypress test automation for onboarding flows, delivering substantial time savings during a major platform overhaul",
      "Collaborated with cross-functional teams for requirements gathering and system architecture design",
    ],
    tech: ["Java", "React", "Redux", "REST", "MySQL", "AWS", "S3", "CloudFront", "Cypress"],
  },
  {
    title: "Backend Engineer",
    company: "TrueNorth",
    location: "Remote",
    period: "Jul 2022 -- Mar 2023",
    summary:
      "Staff augmentation engineer on a US-based fintech team, maintaining and enhancing backend services in Go.",
    highlights: [
      "Developed new features and maintained backend applications in Go with a focus on code quality and test coverage",
      "Integrated with diverse third-party providers using REST and designed gRPC endpoints for internal service communication",
      "Collaborated with the product team in weekly grooming sessions to deliver high-demand features",
      "Implemented automated unit tests using Go testing framework and testify library",
    ],
    tech: ["Golang", "gRPC", "REST", "Google Cloud", "Apache Kafka", "PostgreSQL"],
  },
  {
    title: "Backend Engineer",
    company: "Medici",
    location: "Remote",
    period: "Jul 2021 -- Jul 2022",
    summary:
      "Austin-based healthcare platform enabling doctor-patient communication via secure messaging, calls, and video.",
    highlights: [
      "Maintained and developed backend features for a healthcare platform with 800+ unit tests and rigorous PR review processes",
      "Integrated third-party providers including Twilio for messaging and Doctor Chrono for EHR tasks",
      "Built redundancy, availability, and circuit breaker patterns for critical integrations",
      "Created Node.js scripts to generate reports from multiple APIs",
      "Followed trunk-based development where approved PRs deploy through test, pre-prod, and prod in a single pipeline",
    ],
    tech: ["Java", "Spring", "Hibernate", "Node.js", "Kubernetes", "PostgreSQL", "RabbitMQ", "JUnit"],
  },
  {
    title: "Full Stack Engineer / Technical Interviewer",
    company: "Contractor",
    location: "Montevideo, Uruguay",
    period: "Feb 2021 -- Aug 2021",
    highlights: [
      "Delivered backend services in Java with Spring, Hibernate, and Kubernetes for government clients",
      "Built web applications using React and Angular 10 for eCommerce and enterprise clients",
      "Conducted technical interviews for Angular and full-stack positions, evaluating candidates on core web fundamentals",
    ],
    tech: ["Java", "Spring", "React", "Angular", "Kubernetes", "PostgreSQL"],
  },
  {
    title: "Full Stack Engineer",
    company: "dLocal",
    location: "Montevideo, Uruguay",
    period: "Mar 2020 -- Feb 2021",
    summary:
      "360 payments platform handling mass online payments across LATAM, APAC, and EMEA growth markets.",
    highlights: [
      "Migrated a monolithic PHP codebase to a microservices architecture with React frontend and Java backend",
      "Implemented responsive and print design for payment tickets and vouchers",
      "Developed reusable React component libraries to improve cross-team maintainability",
      "Maintained existing applications across Java, Spring Boot, PHP, and vanilla JavaScript",
    ],
    tech: ["React", "Java", "Spring Boot", "Node.js", "PHP", "CSS", "SASS"],
  },
  {
    title: "Full Stack Engineer",
    company: "Blue Trail Software",
    location: "Montevideo, Uruguay",
    period: "Jan 2018 -- Feb 2020",
    summary:
      "San Francisco-based software company. Worked with US clients across education, fintech, and project management.",
    highlights: [
      "Built Angular libraries and reusable components for Center for Collaborative Classroom&apos;s educational platform",
      "Implemented ADA compliance in GWT/mGWT applications for Sharetec credit union management",
      "Completed SCRUMe, a Jira addon built with JavaScript and React for sprint analytics",
      "Developed and maintained Node.js, MongoDB, and Angular applications for multiple clients",
    ],
    tech: ["Angular", "React", "Java", "Node.js", "MongoDB", "GWT", "Bootstrap"],
  },
  {
    title: "Full Stack Engineer",
    company: "NetLabs",
    location: "Montevideo, Uruguay",
    period: "May 2016 -- Jan 2018",
    summary:
      "Software company serving major telecom clients including Movistar.",
    highlights: [
      "Migrated monolithic architecture to microservices using Docker, Kubernetes, and OpenShift",
      "Developed web applications with Angular 2+, Bootstrap, and Java/Spring backend",
      "Implemented CI/CD pipelines with Jenkins, Nexus, and SonarQube",
      "Deployed and maintained Kubernetes and OpenShift platforms for production workloads",
    ],
    tech: ["Java", "Spring", "Angular", "Docker", "Kubernetes", "OpenShift", "Jenkins", "MySQL"],
  },
  {
    title: "Java Engineer",
    company: "GEOCOM",
    location: "Montevideo, Uruguay",
    period: "Aug 2014 -- May 2016",
    summary:
      "Retail software company. Worked on the Alkosto project, one of the biggest retailers in Colombia.",
    highlights: [
      "Maintained and developed POS system features for 100+ retail locations across Colombia",
      "Built backend systems with Java, Spring, Hibernate, and Apache Camel for system integration via queues",
      "Created reports, promotion handling, and web components using JSP, JSF, and Primefaces",
    ],
    tech: ["Java", "Spring", "Hibernate", "Apache Camel", "MySQL", "Oracle", "Shell"],
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
                  {position.summary && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {position.summary}
                    </p>
                  )}
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
