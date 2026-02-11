import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="text-8xl sm:text-9xl font-bold gradient-text mb-4">404</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild size="lg">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back home
          </Link>
        </Button>
      </main>
      <Footer />
    </>
  )
}
