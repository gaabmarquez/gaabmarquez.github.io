import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition";
import "./globals.css";

const siteUrl = "https://gaabmarquez.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gabriel Márquez | Full Stack Engineer",
    template: "%s | Gabriel Márquez",
  },
  description:
    "Full Stack Engineer with 10+ years of experience building scalable, secure software for fintech, healthcare, and retail. Based in Uruguay.",
  keywords: [
    "Gabriel Márquez",
    "Full Stack Engineer",
    "React",
    "Java",
    "Golang",
    "TypeScript",
    "Angular",
    "AWS",
    "Kubernetes",
    "Uruguay",
    "Software Developer",
    "Blog",
  ],
  authors: [{ name: "Gabriel Márquez", url: siteUrl }],
  creator: "Gabriel Márquez",
  openGraph: {
    title: "Gabriel Márquez | Full Stack Engineer",
    description:
      "Full Stack Engineer with 10+ years building scalable software for fintech, healthcare, and retail.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Gabriel Márquez",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Márquez | Full Stack Engineer",
    description:
      "Full Stack Engineer with 10+ years building scalable software for fintech, healthcare, and retail.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gabriel Márquez",
    url: siteUrl,
    jobTitle: "Full Stack Engineer",
    sameAs: [
      "https://github.com/gaabmarquez",
      "https://linkedin.com/in/gaabmarquez",
    ],
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
