import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gabriel Márquez | Full Stack Developer",
  description:
    "Full stack developer based in Uruguay, specializing in building reliable, scalable web applications. Currently focused on payment infrastructure and fintech solutions.",
  keywords: [
    "Gabriel Márquez",
    "Software Developer",
    "Full Stack",
    "React",
    "TypeScript",
    "Java",
    "Uruguay",
  ],
  authors: [{ name: "Gabriel Márquez" }],
  openGraph: {
    title: "Gabriel Márquez | Full Stack Developer",
    description:
      "Full stack developer specializing in building reliable, scalable web applications.",
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
