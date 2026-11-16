import Image from "next/image";

import { EducationSection } from "@/components/education-section";
import { ExperienceSection } from "@/components/experience-section";
import { publications, technologyGroups } from "@/data/profile";

function SectionHeading({ id, title }: { id: string; title: string }) {
  return (
    <header className="profile-section-heading">
      <h2 id={id}>{title}</h2>
    </header>
  );
}

export default function Home() {
  return (
    <div className="profile-home">
      <section className="home-intro" aria-labelledby="home-heading">
        <Image
          alt=""
          aria-hidden="true"
          className="home-intro-image"
          fill
          priority
          sizes="(max-width: 639px) 165vw, 100vw"
          src="/images/radomir-moysia-mountains.jpg"
        />
        <div className="home-intro-content page-shell">
          <h1 id="home-heading">Hi, I&apos;m Lana.</h1>
          <p className="home-introduction">
            I&apos;m a Master&apos;s student at the University of Toronto who loves building things, figuring
            out how they work, and fixing them when they don&apos;t. My current interests include reinforcement
            learning, robotics, control systems, and embedded software.
          </p>
        </div>
      </section>

      <div className="professional-profile-area">
        <section className="profile-section credentials-section page-shell" aria-label="Education and technical skills">
          <div className="credentials-grid">
            <EducationSection />

            <div className="technology-column">
              <SectionHeading id="tech-title" title="Tech Stack" />
              <div className="technology-panel" aria-labelledby="tech-title">
                <div className="technology-grid">
                  {technologyGroups.map((group) => (
                    <div className="technology-group" key={group.label}>
                      <h3>{group.label}</h3>
                      <ul>{group.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <ExperienceSection />

      <section className="profile-section publications-profile-section page-shell" aria-labelledby="publications-title">
        <SectionHeading id="publications-title" title="Publications" />
        <div className="compact-publication-list">
          {publications.map((publication) => (
            <article className="compact-publication" key={publication.title}>
              <div>
                <h3><a href={publication.href}>{publication.title}<span aria-hidden="true"> ↗</span></a></h3>
                <p className="publication-meta">
                  <span>{publication.venue}</span>
                  <span className="publication-date">{publication.date}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
