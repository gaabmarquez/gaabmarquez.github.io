import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeHighlight from "rehype-highlight"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface TocItem {
  id: string
  text: string
  level: number
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  categories: string[]
  readingTime: number
  content: string
  toc: TocItem[]
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  categories: string[]
  readingTime: number
}

function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 230))
}

function extractToc(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = []
  const updated = html.replace(
    /<(h[23])>(.*?)<\/h[23]>/g,
    (_match, tag: string, text: string) => {
      const level = parseInt(tag[1])
      const plain = text.replace(/<[^>]*>/g, "")
      const id = plain
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      toc.push({ id, text: plain, level })
      return `<${tag} id="${id}">${text}</${tag}>`
    }
  )
  return { html: updated, toc }
}

export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(postsDirectory)
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs()
  const posts = slugs.map((slug) => getPostMeta(slug))
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getPostMeta(slug: string): BlogPostMeta {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    tags: data.tags || [],
    categories: data.categories || [],
    readingTime: calculateReadingTime(content),
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content: rawContent } = matter(fileContents)

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(rawContent)

  const { html, toc } = extractToc(String(result))

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    tags: data.tags || [],
    categories: data.categories || [],
    readingTime: calculateReadingTime(rawContent),
    content: html,
    toc,
  }
}
