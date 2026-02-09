import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gabriel Márquez | Full Stack Engineer",
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
  ],
  authors: [{ name: "Gabriel Márquez" }],
  openGraph: {
    title: "Gabriel Márquez | Full Stack Engineer",
    description:
      "Full Stack Engineer with 10+ years building scalable software for fintech, healthcare, and retail.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
