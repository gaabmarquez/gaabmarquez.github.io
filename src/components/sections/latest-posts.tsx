"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar } from "lucide-react"
import { useAnimateOnScroll } from "@/hooks/use-animate-on-scroll"

interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export function LatestPosts({ posts }: { posts: PostMeta[] }) {
  const { ref, isVisible } = useAnimateOnScroll()

  return (
    <section className="py-24 px-6 relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full bg-accent/3 blur-3xl" />
      </div>

      <div
        ref={ref}
        className={`max-w-5xl mx-auto will-change-[transform,opacity] transition-[transform,opacity] duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <span className="text-sm font-mono text-primary font-normal">04.</span>
          Latest Posts
          <div className="h-px bg-border flex-1 ml-4" />
        </h2>
        <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-accent rounded-full mb-10" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <Card className="h-full flex flex-col gradient-border border-border/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500">
                <CardHeader>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  {post.description && (
                    <CardDescription className="mt-2 leading-relaxed line-clamp-3">
                      {post.description}
                    </CardDescription>
                  )}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
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

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4 transition-all"
          >
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
