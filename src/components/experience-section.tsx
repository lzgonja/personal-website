"use client";

import Image from "next/image";
import { type KeyboardEvent, useState } from "react";

import { experience } from "@/data/profile";

const defaultRole = "Data Analyst";

function tabId(role: string) {
  return `experience-tab-${role.toLowerCase().replaceAll(" ", "-")}`;
}

function panelId(role: string) {
  return `experience-panel-${role.toLowerCase().replaceAll(" ", "-")}`;
}

export function ExperienceSection() {
  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const selectedExperience = experience.find((entry) => entry.role === selectedRole) ?? experience[0];

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % experience.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + experience.length) % experience.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = experience.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    const nextExperience = experience[nextIndex];
    setSelectedRole(nextExperience.role);
    document.getElementById(tabId(nextExperience.role))?.focus();
  }

  return (
    <section className="profile-section experience-profile-section" aria-labelledby="experience-title">
      <Image
        alt=""
        aria-hidden="true"
        className="experience-background-image"
        fill
        sizes="(max-width: 639px) 280vw, 100vw"
        src="/images/magda-ehlers-ocean-waves.jpg"
      />
      <div className="experience-overlay" aria-hidden="true" />
      <div className="experience-content page-shell">
        <header className="profile-section-heading">
          <h2 id="experience-title">Experience</h2>
        </header>

        <div className="experience-selector">
          <div aria-label="Select an experience" className="experience-tabs" role="tablist">
            {experience.map((entry, index) => {
              const selected = entry.role === selectedExperience.role;

              return (
                <button
                  aria-controls={panelId(entry.role)}
                  aria-selected={selected}
                  className="experience-tab"
                  id={tabId(entry.role)}
                  key={entry.role}
                  onClick={() => setSelectedRole(entry.role)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  role="tab"
                  tabIndex={selected ? 0 : -1}
                  type="button"
                >
                  <span>{entry.organization}</span>
                  <span>{entry.dates.slice(-4)}</span>
                </button>
              );
            })}
          </div>

          <div className="experience-panels">
            {experience.map((entry) => {
              const selected = entry.role === selectedExperience.role;

              return (
                <article
                  aria-hidden={!selected}
                  aria-labelledby={tabId(entry.role)}
                  className={`experience-panel ${selected ? "is-active" : ""}`}
                  id={panelId(entry.role)}
                  key={entry.role}
                  role="tabpanel"
                  tabIndex={selected ? 0 : -1}
                >
                  <h3>{entry.role}</h3>
                  <p className="experience-meta">
                    <span>{entry.organization}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{entry.location}</span>
                  </p>
                  <p className="experience-date">{entry.dates}</p>
                  <ul className="experience-details">
                    {entry.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>
                        {detail.map((segment, segmentIndex) => "emphasis" in segment && segment.emphasis
                          ? <strong key={segmentIndex}>{segment.text}</strong>
                          : <span key={segmentIndex}>{segment.text}</span>)}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
