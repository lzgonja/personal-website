"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Project } from "@/data/projects";

const projectOrder = ["parallax", "multi-armed-bandits", "ekgram", "shortest-path-algorithms", "polyglot"];

const descriptions: Record<string, string> = {
  parallax: "A monocular visual odometry system that estimates vehicle trajectories from a single camera and reduces drift using temporal rotation correction.",
  "multi-armed-bandits": "Implemented Explore-Then-Commit (ETC) and Upper Confidence Bound (UCB) algorithms to compare exploration and exploitation strategies in sequential decision-making.",
};

const displayTitles: Record<string, string> = {
  "shortest-path-algorithms": "Shortest-Path Algorithms",
};

const findings: Record<string, string> = {
  parallax: "Reduced final accumulated orientation error by 69.3% over the first 1,000 KITTI frames.",
  "multi-armed-bandits": "UCB generally accumulated less regret than ETC at longer decision horizons.",
};

const repositoryUrls: Record<string, string> = {
  parallax: "https://github.com/lanazgonjanin/parallax",
};

function NodeIllustration({ slug }: { slug: string }) {
  if (slug === "parallax") {
    return (
      <svg aria-hidden="true" viewBox="0 0 170 110">
        <path className="node-static" d="M24 12v76h128M20 20l4-8 4 8M144 84l8 4-8 4" />
        <path className="node-animated node-trajectory" d="M28 83C45 57 58 45 77 38s36-14 62-16" />
        <g className="node-markers"><circle cx="49" cy="58" r="4"/><circle cx="78" cy="38" r="4"/><circle cx="108" cy="28" r="4"/><circle cx="139" cy="22" r="4"/></g>
      </svg>
    );
  }

  if (slug === "multi-armed-bandits") {
    return (
      <svg aria-hidden="true" viewBox="0 0 170 110">
        <g className="node-static"><circle cx="85" cy="15" r="7"/><circle cx="52" cy="53" r="6"/><circle cx="118" cy="53" r="6"/><circle cx="32" cy="91" r="6"/><circle cx="68" cy="91" r="6"/><circle cx="102" cy="91" r="6"/><circle cx="138" cy="91" r="6"/></g>
        <g className="node-branches"><path d="M80 21L57 47"/><path d="M90 21l23 26"/><path d="M49 59L35 85"/><path d="M55 59l10 26"/><path d="M115 59l-10 26"/><path d="M121 59l14 26"/></g>
      </svg>
    );
  }

  if (slug === "ekgram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 170 110">
        <path className="node-static" d="M10 62h21l8-12 9 32 12-67 14 86 13-50 11 11h62" />
        <path className="node-animated node-pulse" d="M10 62h21l8-12 9 32 12-67 14 86 13-50 11 11h62" />
      </svg>
    );
  }

  if (slug === "shortest-path-algorithms") {
    return (
      <svg aria-hidden="true" viewBox="0 0 170 110">
        <g className="node-static"><path d="M25 66L58 19l48 13 36 52-63 11zM58 19l21 76m27-63L25 66m117 18L79 95"/><circle cx="25" cy="66" r="7"/><circle cx="58" cy="19" r="7"/><circle cx="106" cy="32" r="7"/><circle cx="142" cy="84" r="7"/><circle cx="79" cy="95" r="7"/></g>
        <path className="node-animated node-route" d="M25 66L58 19l48 13 36 52" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 190 110">
      <path className="node-static" d="M8 57h12m150 0h12" />
      <g className="node-waveform">
        {[18, 32, 52, 75, 94, 110, 132, 153, 126, 94, 67, 43, 26, 17].map((height, index) => (
          <line key={index} x1={32 + index * 9} x2={32 + index * 9} y1={55 - height / 2} y2={55 + height / 2} />
        ))}
      </g>
    </svg>
  );
}

function ResultImage({ slug }: { slug: string }) {
  if (slug === "parallax") {
    return <Image alt="Parallax trajectory comparison over the first 1,000 KITTI frames" height={1554} src="/images/parallax-temporal-rotation-correction-1000.png" unoptimized width={1547} />;
  }

  return <Image alt="Cumulative regret comparison between ETC and UCB over 500 to 20,000 rounds" height={701} src="/images/bandits-regret-comparison.png" unoptimized width={1160} />;
}

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const orderedProjects = projectOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [resultsSlug, setResultsSlug] = useState<string | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !selectedSlug) return;
      const previousSlug = selectedSlug;
      setSelectedSlug(null);
      setResultsSlug(null);
      window.requestAnimationFrame(() => triggerRefs.current[previousSlug]?.focus());
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [selectedSlug]);

  const closePanel = () => {
    setSelectedSlug(null);
    setResultsSlug(null);
  };

  return (
    <div className="project-constellation" onClick={closePanel}>
      <svg aria-hidden="true" className="constellation-trails" preserveAspectRatio="none" viewBox="0 0 1200 620">
        <path d="M155 144C260 170 208 292 342 297S510 212 632 165S800 160 918 110" />
        <path d="M150 328C265 290 350 390 467 385S575 302 672 326S835 392 928 466" />
        <path d="M285 517C440 470 508 565 680 535S810 465 965 486" />
      </svg>

      {orderedProjects.map((project) => {
        const title = displayTitles[project.slug] ?? project.title;
        const isSelected = selectedSlug === project.slug;
        const hasResults = project.slug === "parallax" || project.slug === "multi-armed-bandits";

        return (
          <div className={`constellation-item constellation-item-${project.slug} ${isSelected ? "is-selected" : ""}`} key={project.slug}>
            <button
              aria-expanded={isSelected}
              aria-label={`${isSelected ? "Close" : "Open"} details for ${title}`}
              className="constellation-node"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedSlug((current) => current === project.slug ? null : project.slug);
                setResultsSlug(null);
              }}
              ref={(element) => { triggerRefs.current[project.slug] = element; }}
              type="button"
            >
              <span className="constellation-illustration"><NodeIllustration slug={project.slug} /></span>
              <span className="constellation-label"><i aria-hidden="true" />{title}</span>
            </button>

            {isSelected && (
              <aside className="constellation-panel" onClick={(event) => event.stopPropagation()}>
                <button aria-label={`Close ${title} details`} className="constellation-panel-close" onClick={closePanel} type="button">×</button>
                <h2>{title}</h2>
                <p>{descriptions[project.slug] ?? project.summary}</p>
                <ul aria-label={`${title} technologies`}>
                  {project.topics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
                {findings[project.slug] && <p className="constellation-finding">{findings[project.slug]}</p>}
                <div className="constellation-panel-actions">
                  {hasResults && (
                    <button aria-expanded={resultsSlug === project.slug} onClick={() => setResultsSlug((current) => current === project.slug ? null : project.slug)} type="button">
                      {resultsSlug === project.slug ? "Hide results" : "View results"}
                    </button>
                  )}
                  {repositoryUrls[project.slug] && (
                    <a href={repositoryUrls[project.slug]} rel="noreferrer" target="_blank">GitHub <span aria-hidden="true">↗</span></a>
                  )}
                </div>
                {resultsSlug === project.slug && (
                  <figure className="constellation-result"><ResultImage slug={project.slug} /></figure>
                )}
              </aside>
            )}
          </div>
        );
      })}
    </div>
  );
}
