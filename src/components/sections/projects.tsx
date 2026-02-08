import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Folder } from "lucide-react"

interface Project {
  name: string
  description: string
  tech: string[]
  github?: string
  live?: string
}

const projects: Project[] = [
  {
    name: "Trello Clone",
    description:
      "A fully functional Kanban board app inspired by Trello. Features drag-and-drop cards, multiple boards, and persistent state management with Redux.",
    tech: ["React", "Redux", "CSS Grid", "Local Storage"],
    github: "https://github.com/gaabmarquez/trello-clone",
    live: "https://gaabmarquez.github.io/trello-clone",
  },
  {
    name: "Book Worms",
    description:
      "A book discovery platform that lets users search, browse, and save their favorite reads. Built with a clean UI and responsive layout.",
    tech: ["Angular 7", "Bootstrap", "REST API"],
    github: "https://github.com/gaabmarquez/book-worms",
  },
  {
    name: "Cool Music",
    description:
      "A music discovery app powered by the Last.fm API. Users can search for artists, explore top tracks, and browse album details.",
    tech: ["Angular 7", "Last.fm API", "RxJS"],
    github: "https://github.com/gaabmarquez/cool-music",
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <span className="text-sm font-mono text-muted-foreground font-normal">03.</span>
          Things I&apos;ve Built
        </h2>
        <div className="h-px bg-border flex-1 mb-10" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.name}
              className="flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Folder className="h-8 w-8 text-primary" />
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`${project.name} GitHub`}
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`${project.name} live demo`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="outline" className="text-xs">
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
