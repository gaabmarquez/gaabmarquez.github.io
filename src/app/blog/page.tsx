import { getAllPosts } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Gabriel Márquez",
  description:
    "Thoughts on software development, Java, React, DevOps, and the developer journey.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen px-6 pt-28 pb-20">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-muted-foreground mb-12 text-lg">
          Thoughts on software development, career growth, and the tools I use
          every day.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <Card className="gradient-border border-border/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500">
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </CardTitle>
                  {post.description && (
                    <CardDescription className="mt-2 leading-relaxed">
                      {post.description}
                    </CardDescription>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.slice(0, 4).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary border-0"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
