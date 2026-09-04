import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Timeline } from "@/components/sections/timeline";
import { Stats } from "@/components/sections/stats";
import { Architecture } from "@/components/sections/architecture";
import { Brands } from "@/components/sections/brands";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Playground } from "@/components/sections/playground";
import { Notes } from "@/components/sections/notes";
import { Services } from "@/components/sections/services";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Timeline />
      <Stats />
      <Architecture />
      <Brands />
      <Skills />
      <Projects />
      <Playground />
      <Notes />
      <Services />
      <Footer />
    </>
  );
}
