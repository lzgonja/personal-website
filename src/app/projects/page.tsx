import type { Metadata } from "next";

import { ProjectExplorer } from "@/components/projects/project-explorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Experiments and engineering projects by Lana Zgonjanin across computer vision, machine learning, algorithms, and systems.",
};

export default function ProjectsPage() {
  return (
    <>
      <header className="forest-hero">
        <div className="forest-hero-overlay" aria-hidden="true" />
        <div className="forest-hero-content page-shell">
          <h1>Things I’ve built.</h1>
          <p>Select a project to explore.</p>
        </div>
      </header>

      <section className="forest-section forest-explorer page-shell" aria-label="Technical projects gallery">
        <ProjectExplorer projects={projects} />
      </section>
    </>
  );
}
