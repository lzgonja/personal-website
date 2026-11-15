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
        sizes="100vw"
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

          <article
            aria-labelledby={tabId(selectedExperience.role)}
            className="experience-panel"
            id={panelId(selectedExperience.role)}
            key={selectedExperience.role}
            role="tabpanel"
            tabIndex={0}
          >
            <h3>{selectedExperience.role}</h3>
            <p className="experience-meta">
              <span>{selectedExperience.organization}</span>
              <span aria-hidden="true"> · </span>
              <span>{selectedExperience.location}</span>
            </p>
            <p className="experience-date">{selectedExperience.dates}</p>
            <ul className="experience-details">
              {selectedExperience.details.map((detail, detailIndex) => (
                <li key={detailIndex}>
                  {detail.map((segment, segmentIndex) => "emphasis" in segment && segment.emphasis
                    ? <strong key={segmentIndex}>{segment.text}</strong>
                    : <span key={segmentIndex}>{segment.text}</span>)}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
