import type { Metadata } from "next";
import { CurriculumVitae } from "@/components/cv/curriculum-vitae";

export const metadata: Metadata = {
  title: "Jeferson Siqueira — CV",
  description: "Curriculum vitae of Jeferson Siqueira, Senior Full Stack Engineer.",
  // A CV is for people who were sent the link, not for search results.
  robots: { index: false, follow: false },
};

export default function CurriculumPage() {
  return <CurriculumVitae />;
}
