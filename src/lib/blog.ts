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

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  categories: string[]
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  categories: string[]
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
  const { data } = matter(fileContents)
  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    tags: data.tags || [],
    categories: data.categories || [],
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

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    tags: data.tags || [],
    categories: data.categories || [],
    content: String(result),
  }
}
