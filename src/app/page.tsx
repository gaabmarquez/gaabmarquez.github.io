import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { LatestPosts } from "@/components/sections/latest-posts";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <LatestPosts posts={latestPosts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
