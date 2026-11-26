"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Project } from "@/data/projects";
import { withBasePath } from "@/lib/site-path";

const projectOrder = ["parallax", "burstormer", "multi-armed-bandits", "ekgram", "polyglot"];

const moduleSubtitles: Record<string, string> = {
  parallax: "Monocular Visual Odometry",
  burstormer: "Burst Image Reconstruction",
  "multi-armed-bandits": "Sequential Decision-Making",
  ekgram: "EKG Digitization",
  polyglot: "Real-Time Multilingual Speech",
};

const descriptions: Record<string, string> = {
  burstormer: "Working in a three-person team to extend existing algorithm Burstormer to investigate whether adaptive reference-frame selection can improve burst super-resolution by choosing stronger reference images before alignment and fusion.",
  ekgram: "Built an end-to-end MLOps system in a four-person team that converts images of EKG printouts into structured 12-lead signals, covering data preparation, model training and evaluation, model registry, API serving, continuous deployment, and a live web interface.",
  parallax: "A monocular visual odometry system that estimates vehicle trajectories from a single camera and reduces drift using temporal rotation correction.",
  "multi-armed-bandits": "Implemented Explore-Then-Commit (ETC) and Upper Confidence Bound (UCB) algorithms to compare exploration and exploitation strategies in sequential decision-making.",
  polyglot: "Developed a real-time conversational AI application in a four-person team, supporting 85 languages and switching between languages mid-sentence while maintaining natural speech.",
};

const popupTechnologies: Record<string, string[]> = {
  burstormer: ["Python", "PyTorch", "OpenCV", "NumPy"],
  ekgram: ["Python", "PyTorch", "FastAPI", "W&B", "Docker", "Google Cloud Run"],
  polyglot: ["TypeScript", "React", "Express", "WebSocket", "LiveKit", "Higgs AI"],
};

const findings: Record<string, string> = {
  burstormer: "Designed and implemented a gradient-based reference-selection algorithm using patch-level SVD to favour sharp, coherent image structure over blur and noise, then integrated three reference strategies into an automated evaluation pipeline using PSNR, SSIM, and LPIPS.",
  "multi-armed-bandits": "Found that UCB achieved lower cumulative regret than ETC over longer decision horizons by continuing to explore promising actions instead of committing early to a potentially suboptimal choice. Regret measures the reward lost compared with always selecting the best action.",
  polyglot: "Built and tested the server-side Higgs TTS integration, developed the multilingual conversation interface with per-turn language detection and language-coloured transcripts, and improved realtime reliability by addressing stale responses, session state, and connection errors.",
};

const repositoryUrls: Record<string, string> = {
  burstormer: "https://github.com/lzgonja/burstormer-optimization",
  ekgram: "https://github.com/sophiamjiali/ekg-digitizer",
  parallax: "https://github.com/lzgonja/parallax",
  polyglot: "https://github.com/stanley-cao/polyglot",
};

const deployedUrls: Record<string, string> = {
  ekgram: "https://ekg-digitizer-575857603253.northamerica-northeast2.run.app/",
};

const desktopTraces = [
  { slug: "parallax", path: "M452 394H416V238H378" },
  { slug: "burstormer", path: "M748 394H786V238H824" },
  { slug: "multi-armed-bandits", path: "M452 510H392L344 558" },
  { slug: "ekgram", path: "M748 510H808L856 558" },
  { slug: "polyglot", path: "M600 530V657" },
];

function ProjectVisual({ slug }: { slug: string }) {
  if (slug === "parallax") {
    return (
      <svg aria-hidden="true" viewBox="0 0 260 130">
        <path className="pcb-road" d="M28 113 100 55h60l72 58M68 113l53-58M192 113l-53-58" />
        <path className="pcb-road-centre" d="M130 110V61" />
        <g className="pcb-vehicle">
          <rect x="112" y="83" width="36" height="25" rx="8" />
          <path d="M118 86h24l4 9h-32zM118 108v5m24-5v5" />
        </g>
        <path className="pcb-camera-field" d="M130 83 88 55M130 83l42-28" />
        <g className="pcb-feature-points">
          {[32, 47, 62, 79, 181, 198, 215, 229].map((x, index) => (
            <circle cx={x} cy={38 + (index % 3) * 15} key={x} r="2.4" />
          ))}
        </g>
        <rect className="pcb-sensor" x="116" y="16" width="28" height="20" rx="2" />
        <circle className="pcb-sensor-lens" cx="130" cy="26" r="6" />
      </svg>
    );
  }

  if (slug === "burstormer") {
    return (
      <svg aria-hidden="true" viewBox="0 0 270 130">
        <g className="burst-inputs">
          <rect x="16" y="34" width="76" height="58" rx="3" />
          <rect x="31" y="27" width="76" height="58" rx="3" />
          <rect x="46" y="20" width="76" height="58" rx="3" />
          <path d="m54 69 19-20 13 12 14-16 14 18" />
        </g>
        <path className="burst-pipeline" d="M128 58h32m-8-8 8 8-8 8" />
        <g className="burst-output">
          <rect x="170" y="17" width="84" height="76" rx="4" />
          <path d="m178 83 23-30 13 15 14-25 18 40M178 83h68" />
          <circle cx="230" cy="35" r="6" />
        </g>
        <path className="burst-quality" d="M182 108h60M182 108v-8m20 8V96m20 12V91m20 17V86" />
      </svg>
    );
  }

  if (slug === "multi-armed-bandits") {
    return (
      <svg aria-hidden="true" viewBox="0 0 250 130">
        {[24, 94, 164].map((x, index) => (
          <g className={`bandit-action bandit-action-${index + 1}`} key={x}>
            <rect x={x} y="36" width="54" height="66" rx="4" />
            <rect x={x + 9} y="48" width="36" height="28" rx="2" />
            <path className="bandit-lever" d={`M${x + 54} 54h9V34`} />
            <circle cx={x + 63} cy="30" r="4" />
            {index === 0 && <circle className="bandit-reward" cx={x + 27} cy="62" r="7" />}
            {index === 1 && <path className="bandit-reward" d={`m${x + 27} 53 9 9-9 9-9-9z`} />}
            {index === 2 && <path className="bandit-reward" d={`m${x + 27} 52 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1z`} />}
            <circle className="bandit-indicator" cx={x + 27} cy="89" r="4" />
          </g>
        ))}
      </svg>
    );
  }

  if (slug === "ekgram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 270 130">
        <defs>
          <pattern id="ecg-grid" width="14" height="14" patternUnits="userSpaceOnUse">
            <path d="M14 0H0V14" />
          </pattern>
        </defs>
        <rect className="ecg-screen" x="12" y="16" width="246" height="96" rx="4" />
        <rect className="ecg-grid" x="12" y="16" width="246" height="96" fill="url(#ecg-grid)" />
        <path className="ecg-base" d="M20 69h24c7 0 8-9 15-9s8 9 15 9h10l7-17 9 40 10-68 12 84 10-49 10 10h16c7 0 8-10 15-10s8 10 15 10h10l6-14 8 31 10-58 11 72 9-41 9 10h20" />
        <path className="ecg-live" d="M20 69h24c7 0 8-9 15-9s8 9 15 9h10l7-17 9 40 10-68 12 84 10-49 10 10h16c7 0 8-10 15-10s8 10 15 10h10l6-14 8 31 10-58 11 72 9-41 9 10h20" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 300 130">
      <g className="polyglot-mic">
        <rect x="25" y="36" width="31" height="45" rx="15" />
        <path d="M18 65c0 17 10 26 23 26s23-9 23-26M41 91v17M28 108h26" />
      </g>
      <g className="polyglot-wave">
        {[22, 34, 54, 78, 48, 30, 66, 92, 62, 35, 50, 76, 45, 26].map((height, index) => (
          <line key={index} x1={88 + index * 13} x2={88 + index * 13} y1={65 - height / 2} y2={65 + height / 2} />
        ))}
      </g>
      <g className="polyglot-signals">
        <circle cx="278" cy="34" r="3" />
        <circle cx="286" cy="48" r="3" />
        <circle cx="278" cy="62" r="3" />
      </g>
    </svg>
  );
}

function PcbConnections({ activeSlug }: { activeSlug: string | null }) {
  return (
    <svg aria-hidden="true" className="pcb-connections" preserveAspectRatio="none" viewBox="0 0 1200 900">
      {desktopTraces.map((trace) => (
        <g className={`pcb-trace ${activeSlug === trace.slug ? "is-active" : ""}`} key={trace.slug}>
          <path className="pcb-trace-shadow" d={trace.path} />
          <path className="pcb-trace-line" d={trace.path} />
          <circle className="pcb-trace-node" cx={trace.slug === "polyglot" ? 600 : trace.slug === "parallax" || trace.slug === "multi-armed-bandits" ? 452 : 748} cy={trace.slug === "polyglot" ? 530 : trace.slug === "parallax" || trace.slug === "burstormer" ? 394 : 510} r="4" />
          <circle className="pcb-trace-pulse" r="4">
            <animateMotion dur="1.35s" path={trace.path} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      <g className="pcb-background-traces">
        <path d="M0 176H118L166 128H332" />
        <path d="M1200 154h-112l-54-54H882" />
        <path d="M0 730h136l58-58h126" />
        <path d="M1200 748h-164l-62-62H858" />
        <path d="M220 900v-96l48-48h80" />
        <path d="M980 900v-86l-54-54h-92" />
      </g>
    </svg>
  );
}

function BoardDetails() {
  return (
    <div aria-hidden="true" className="pcb-board-details">
      <span className="pcb-mount pcb-mount-1" />
      <span className="pcb-mount pcb-mount-2" />
      <span className="pcb-mount pcb-mount-3" />
      <span className="pcb-mount pcb-mount-4" />
      <span className="pcb-chip pcb-chip-1" />
      <span className="pcb-chip pcb-chip-2" />
      <span className="pcb-chip pcb-chip-3" />
      <span className="pcb-capacitor pcb-capacitor-1" />
      <span className="pcb-capacitor pcb-capacitor-2" />
      <span className="pcb-pin-array pcb-pin-array-1" />
      <span className="pcb-pin-array pcb-pin-array-2" />
    </div>
  );
}

function ResultImage() {
  return (
    <Image
      alt="Cumulative regret comparison between ETC and UCB over 500 to 20,000 rounds"
      height={701}
      src={withBasePath("/images/bandits-regret-comparison.png")}
      unoptimized
      width={1160}
    />
  );
}

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const orderedProjects = projectOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [resultsSlug, setResultsSlug] = useState<string | null>(null);
  const [panelPosition, setPanelPosition] = useState({ left: 16, top: 16 });
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeSlug = selectedSlug ?? hoveredSlug;

  const positionPanel = useCallback((slug: string) => {
    const trigger = triggerRefs.current[slug];
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const widePanel = slug === "ekgram" || slug === "burstormer";
    const panelWidth = Math.min(widePanel ? 560 : 430, window.innerWidth - 32);
    const desiredRight = rect.right + 18;
    const left = desiredRight + panelWidth <= window.innerWidth - 16
      ? desiredRight
      : Math.max(16, rect.left - panelWidth - 18);
    const top = Math.max(16, Math.min(rect.top, window.innerHeight - 500));
    setPanelPosition({ left, top });
  }, []);

  const closePanel = useCallback(() => {
    const previousSlug = selectedSlug;
    setSelectedSlug(null);
    setResultsSlug(null);
    if (previousSlug) window.requestAnimationFrame(() => triggerRefs.current[previousSlug]?.focus());
  }, [selectedSlug]);

  useEffect(() => {
    if (!selectedSlug) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    const onResize = () => positionPanel(selectedSlug);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [closePanel, positionPanel, selectedSlug]);

  return (
    <div className={`pcb-board active-${activeSlug ?? "none"}`}>
      <BoardDetails />
      <PcbConnections activeSlug={activeSlug} />
      <div aria-hidden="true" className="pcb-mobile-bus" />

      <header className="pcb-processor">
        <span aria-hidden="true" className="processor-led" />
        <span className="processor-kicker">PROJECT INDEX</span>
        <h1>THINGS I&apos;VE BUILT</h1>
      </header>

      {orderedProjects.map((project) => {
        const isSelected = selectedSlug === project.slug;
        return (
          <article className={`pcb-module pcb-module-${project.slug} ${isSelected ? "is-selected" : ""}`} key={project.slug}>
            <button
              aria-controls={`project-panel-${project.slug}`}
              aria-expanded={isSelected}
              className="pcb-module-trigger"
              onBlur={() => setHoveredSlug(null)}
              onClick={() => {
                if (isSelected) {
                  closePanel();
                  return;
                }
                positionPanel(project.slug);
                setSelectedSlug(project.slug);
                setResultsSlug(null);
              }}
              onFocus={() => setHoveredSlug(project.slug)}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              ref={(element) => { triggerRefs.current[project.slug] = element; }}
              type="button"
            >
              <span aria-hidden="true" className="pcb-screw pcb-screw-a" />
              <span aria-hidden="true" className="pcb-screw pcb-screw-b" />
              <span aria-hidden="true" className="pcb-screw pcb-screw-c" />
              <span aria-hidden="true" className="pcb-screw pcb-screw-d" />
              <span className="pcb-module-heading">
                <span className="pcb-module-title">{project.title}</span>
                <span aria-hidden="true" className="pcb-module-arrow">↗</span>
                <span className="pcb-module-subtitle">{moduleSubtitles[project.slug]}</span>
              </span>
              <span className="pcb-module-visual"><ProjectVisual slug={project.slug} /></span>
            </button>
          </article>
        );
      })}

      {selectedSlug && (() => {
        const project = orderedProjects.find((item) => item.slug === selectedSlug);
        if (!project) return null;
        const technologies = popupTechnologies[project.slug] ?? project.topics;
        const hasResults = project.slug === "multi-armed-bandits";
        const isOngoing = project.slug === "burstormer";
        return (
          <div className="pcb-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) closePanel(); }}>
            <aside
              aria-labelledby={`project-title-${project.slug}`}
              className={`pcb-panel pcb-panel-${project.slug}`}
              id={`project-panel-${project.slug}`}
              role="dialog"
              style={panelPosition}
            >
              <button aria-label={`Close ${project.title} details`} className="pcb-panel-close" onClick={closePanel} ref={closeButtonRef} type="button">×</button>
              <h2 id={`project-title-${project.slug}`}>{project.title}</h2>
              {project.slug === "polyglot" && <p className="pcb-panel-subtitle">Boson AI Higgs Audio Hackathon</p>}
              {isOngoing && <p className="pcb-panel-status"><span aria-hidden="true" />IN PROGRESS</p>}
              <p>{descriptions[project.slug] ?? project.summary}</p>
              {technologies.length > 0 ? (
                <ul aria-label={`${project.title} technologies`}>
                  {technologies.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
              ) : null}
              {project.slug === "ekgram" ? (
                <p className="pcb-panel-finding">Stabilized the training and data pipeline by adding multi-rate signal resampling and robust image conversion, corrected a model architecture issue that discarded temporal information, and built and tested the web workflow from image upload through inference, 12-lead visualization, and CSV export.</p>
              ) : project.slug === "parallax" ? (
                <p className="pcb-panel-finding">Achieved a <strong>69.3% reduction</strong> in final accumulated orientation error across 1,000 driving sequence frames using temporal rotation correction.</p>
              ) : findings[project.slug] ? (
                <p className="pcb-panel-finding">{findings[project.slug]}</p>
              ) : null}
              <div className="pcb-panel-actions">
                {hasResults && (
                  <button aria-expanded={resultsSlug === project.slug} onClick={() => setResultsSlug((current) => current === project.slug ? null : project.slug)} type="button">
                    {resultsSlug === project.slug ? "Hide results" : "View results"}
                  </button>
                )}
                {repositoryUrls[project.slug] && <a href={repositoryUrls[project.slug]} rel="noreferrer" target="_blank">GitHub <span aria-hidden="true">↗</span></a>}
                {deployedUrls[project.slug] && <a href={deployedUrls[project.slug]} rel="noreferrer" target="_blank">Live UI <span aria-hidden="true">↗</span></a>}
              </div>
              {resultsSlug === project.slug && <figure className="pcb-result"><ResultImage /></figure>}
            </aside>
          </div>
        );
      })()}
    </div>
  );
}
