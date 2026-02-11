import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDir = path.join(process.cwd(), "content/posts")
const publicDir = path.join(process.cwd(), "public")
const siteUrl = "https://gaabmarquez.github.io"

function getAllPosts() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"))
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8")
    const { data } = matter(raw)
    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title || file,
      date: data.date || "",
      description: data.description || "",
    }
  })
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function generateRss(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Gabriel Márquez | Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Thoughts on software development, Java, React, DevOps, and the developer journey.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${p.slug}</guid>
      <description>${escapeXml(p.description)}</description>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>`
}

function generateSitemap(posts) {
  const staticPages = ["", "/blog"]
  const postPages = posts.map((p) => `/blog/${p.slug}`)
  const allPages = [...staticPages, ...postPages]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${siteUrl}${page}</loc>
    <changefreq>${page === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${page === "" ? "1.0" : page === "/blog" ? "0.8" : "0.6"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`
}

const posts = getAllPosts()

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })

fs.writeFileSync(path.join(publicDir, "feed.xml"), generateRss(posts))
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), generateSitemap(posts))

console.log(`Generated feed.xml and sitemap.xml (${posts.length} posts)`)
