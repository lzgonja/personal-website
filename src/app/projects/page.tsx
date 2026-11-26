import type { Metadata } from "next";

import { ProjectExplorer } from "@/components/projects/project-explorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Experiments and engineering projects by Lana Zgonjanin across computer vision, machine learning, algorithms, and systems.",
};

export default function ProjectsPage() {
  return (
    <section className="pcb-explorer" aria-label="Engineering projects printed circuit board">
      <ProjectExplorer projects={projects} />
    </section>
  );
}
