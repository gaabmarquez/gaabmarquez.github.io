import { getPostBySlug, getAllPostSlugs } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { CodeCopyButton } from "@/components/code-copy-button"
import { ReadingProgress } from "@/components/reading-progress"
import { TableOfContents } from "@/components/table-of-contents"

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  return {
    title: `${post.title} | Gabriel Márquez`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["Gabriel Márquez"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Gabriel Márquez",
      url: "https://gaabmarquez.github.io",
    },
    keywords: post.tags.join(", "),
  }

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen px-6 pt-28 pb-20">
        <div className="max-w-7xl mx-auto flex gap-10">
          <article className="max-w-3xl mx-auto xl:mx-0 xl:flex-1 min-w-0">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
            >
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>

            <header className="mb-10">
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime} min read
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
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
            </header>

            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <CodeCopyButton />
          </article>

          <aside className="hidden xl:block w-56 shrink-0">
            <TableOfContents items={post.toc} />
          </aside>
        </div>
      </main>
    </>
  )
}
