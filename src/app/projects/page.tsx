import type { Metadata } from "next";

import { ProjectExplorer } from "@/components/projects/project-explorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Experiments and engineering projects by Lana Zgonjanin across computer vision, machine learning, algorithms, and systems.",
};

export default function ProjectsPage() {
  return (
    <section className="forest-section forest-explorer page-shell" aria-label="Technical projects trail map">
      <ProjectExplorer projects={projects} />
    </section>
  );
}
