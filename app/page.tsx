import { Hero } from "@/components/sections/hero";
import { Timeline } from "@/components/sections/timeline";
import { Stats } from "@/components/sections/stats";
import { Brands } from "@/components/sections/brands";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Timeline />
      <Stats />
      <Brands />
      <Skills />
      <Projects />
      <Footer />
    </>
  );
}
