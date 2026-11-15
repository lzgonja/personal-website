"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Project } from "@/data/projects";

const projectOrder = ["parallax", "multi-armed-bandits", "ekgram", "shortest-path-algorithms", "polyglot"];

const descriptions: Record<string, string> = {
  ekgram: "Developing a deep learning system that reconstructs digital ECG waveforms from electrocardiogram images, enabling computational analysis of paper-based medical records.",
  parallax: "A monocular visual odometry system that estimates vehicle trajectories from a single camera and reduces drift using temporal rotation correction.",
  "multi-armed-bandits": "Implemented Explore-Then-Commit (ETC) and Upper Confidence Bound (UCB) algorithms to compare exploration and exploitation strategies in sequential decision-making.",
  "shortest-path-algorithms": "Developed a modular framework implementing Dijkstra, constrained Bellman-Ford, Floyd-Warshall, and A* to evaluate runtime, space complexity, and accuracy across varying graph structures.",
};

const popupTechnologies: Record<string, string[]> = {
  ekgram: ["Python", "PyTorch", "OpenCV", "NumPy", "Pandas", "SciPy"],
  polyglot: ["TypeScript", "React", "Express", "WebSocket", "LiveKit", "Higgs AI"],
  "shortest-path-algorithms": ["Python", "Matplotlib", "heapq", "timeit"],
};

const displayTitles: Record<string, string> = {
  "shortest-path-algorithms": "Shortest-Path Algorithms",
};

const findings: Record<string, string> = {
  "multi-armed-bandits": "UCB generally achieved lower cumulative regret than ETC at longer decision horizons. Since regret measures the expected reward lost by selecting suboptimal actions, this indicates that UCB benefited from continued exploration rather than committing prematurely to a single action.",
};

const repositoryUrls: Record<string, string> = {
  ekgram: "https://github.com/sophiamjiali/ekg-digitizer",
  parallax: "https://github.com/lanazgonjanin/parallax",
  polyglot: "https://github.com/stanley-cao/polyglot",
  "shortest-path-algorithms": "https://github.com/lanazgonjanin/shortest-path-algorithms",
};

type TrailGeometry = {
  height: number;
  mobilePaths: Record<string, string>;
  paths: Record<string, string>;
  width: number;
};

function NodeIllustration({ slug }: { slug: string }) {
  if (slug === "parallax") {
    return (
      <svg aria-hidden="true" preserveAspectRatio="xMidYMax meet" viewBox="5 18 175 72">
        <path className="node-trajectory" d="M8 81C27 66 30 36 60 29c17-4 29 0 42 9" />
        <g className="parallax-car-motion">
          <g className="parallax-car">
            <rect className="vehicle-wheel" x="50" y="37" width="17" height="7" rx="3" />
            <rect className="vehicle-wheel" x="50" y="76" width="17" height="7" rx="3" />
            <rect className="vehicle-wheel" x="101" y="37" width="17" height="7" rx="3" />
            <rect className="vehicle-wheel" x="101" y="76" width="17" height="7" rx="3" />
            <path className="vehicle-body" d="M43 60c0-13 6-22 17-25h47c13 2 22 11 22 25s-9 23-22 25H60C49 82 43 73 43 60Z" />
            <path className="vehicle-cabin" d="M68 38c-6 6-8 14-8 22s2 16 8 22h31c7-6 9-14 9-22s-2-16-9-22Z" />
            <path className="vehicle-windshield" d="M96 39c5 7 7 14 7 21s-2 14-7 21" />
          </g>
          <path className="camera-field" d="M129 54 174 34M129 66l45 20" />
        </g>
        <g className="node-markers"><circle cx="15" cy="55" r="3"/><circle cx="38" cy="24" r="3"/><circle cx="77" cy="22" r="3"/><circle cx="174" cy="34" r="3"/><circle cx="174" cy="86" r="3"/></g>
      </svg>
    );
  }

  if (slug === "multi-armed-bandits") {
    return (
      <svg aria-hidden="true" preserveAspectRatio="xMidYMax meet" viewBox="20 52 150 50">
        {[27, 73, 119].map((x, index) => (
          <g className={`mini-machine mini-machine-${index + 1}`} key={x}>
            <path d={`M${x} 98V64h38v34zM${x - 3} 98h44M${x + 5} 70h28v18H${x + 5}z`} />
            <path className="slot-lever" d={`M${x + 38} 70h7V58`} />
            <circle cx={x + 45} cy="56" r="3" />
            {index === 0 && <><circle className="reward reward-a" cx={x + 19} cy="79" r="5" /><path className="reward reward-b" d={`m${x + 19} 73 6 6-6 6-6-6z`} /></>}
            {index === 1 && <><path className="reward reward-a" d={`m${x + 19} 73 6 6-6 6-6-6z`} /><circle className="reward reward-b" cx={x + 19} cy="79" r="5" /></>}
            {index === 2 && <><path className="reward reward-a" d={`m${x + 19} 72 2 5 6 .5-4 4 1 6-5-3-5 3 1-6-4-4 6-.5z`} /><circle className="reward reward-b" cx={x + 19} cy="79" r="5" /></>}
          </g>
        ))}
      </svg>
    );
  }

  if (slug === "ekgram") {
    return (
      <svg aria-hidden="true" preserveAspectRatio="xMidYMax meet" viewBox="0 12 190 90">
        <path className="node-static ecg-base" d="M5 64h15c5 0 6-9 12-9s7 9 13 9h8l5-12 7 31 9-67 10 82 9-42 8 8h9c6 0 7-13 15-13s9 13 16 13h9l5-10 6 24 8-53 9 67 8-36 7 8h13" />
        <path className="node-animated node-pulse" d="M5 64h15c5 0 6-9 12-9s7 9 13 9h8l5-12 7 31 9-67 10 82 9-42 8 8h9c6 0 7-13 15-13s9 13 16 13h9l5-10 6 24 8-53 9 67 8-36 7 8h13" />
        <circle className="ecg-marker" cx="0" cy="0" r="3" />
      </svg>
    );
  }

  if (slug === "shortest-path-algorithms") {
    return (
      <svg aria-hidden="true" preserveAspectRatio="xMidYMax meet" viewBox="15 12 140 95">
        <g className="node-static"><path d="M25 66L58 19l48 13 36 52-63 11zM58 19l21 76m27-63L25 66m117 18L79 95"/><circle cx="25" cy="66" r="7"/><circle cx="58" cy="19" r="7"/><circle cx="106" cy="32" r="7"/><circle cx="142" cy="84" r="7"/><circle cx="79" cy="95" r="7"/></g>
        <path className="node-route route-edge route-edge-1" d="M25 66 58 19" />
        <path className="node-route route-edge route-edge-2" d="M58 19 106 32" />
        <path className="node-route route-edge route-edge-3" d="M106 32 142 84" />
        <circle className="route-marker" cx="0" cy="0" r="4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" preserveAspectRatio="xMidYMax meet" viewBox="5 -24 180 158">
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
  const [panelPosition, setPanelPosition] = useState({ left: 16, top: 16 });
  const [trailGeometry, setTrailGeometry] = useState<TrailGeometry | null>(null);
  const constellationRef = useRef<HTMLDivElement | null>(null);
  const centreRef = useRef<HTMLElement | null>(null);
  const illustrationRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const positionPanel = useCallback((slug: string) => {
    const trigger = triggerRefs.current[slug];
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const panelWidth = Math.min(slug === "ekgram" ? 600 : 390, window.innerWidth - 32);
    const desiredRight = rect.right + 20;
    const left = desiredRight + panelWidth <= window.innerWidth - 16
      ? desiredRight
      : Math.max(16, rect.left - panelWidth - 20);
    const top = Math.max(16, Math.min(rect.top, window.innerHeight - 460));
    setPanelPosition({ left, top });
  }, []);

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

  useEffect(() => {
    if (!selectedSlug) return;
    const onResize = () => positionPanel(selectedSlug);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [positionPanel, selectedSlug]);

  useEffect(() => {
    const constellation = constellationRef.current;
    const centre = centreRef.current;
    if (!constellation || !centre) return;

    let animationFrame = 0;
    const updateTrails = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const containerRect = constellation.getBoundingClientRect();
        const centreRect = centre.getBoundingClientRect();
        const illustrationRects = Object.fromEntries(
          projectOrder.map((slug) => [slug, illustrationRefs.current[slug]?.getBoundingClientRect()]),
        );
        if (Object.values(illustrationRects).some((rect) => !rect) || projectOrder.some((slug) => !triggerRefs.current[slug])) return;

        const local = (rect: DOMRect) => ({
          bottom: rect.bottom - containerRect.top,
          centreX: rect.left - containerRect.left + rect.width / 2,
          left: rect.left - containerRect.left,
          right: rect.right - containerRect.left,
          top: rect.top - containerRect.top,
        });
        const hub = local(centreRect);
        const parallax = local(illustrationRects.parallax as DOMRect);
        const bandits = local(illustrationRects["multi-armed-bandits"] as DOMRect);
        const ekgram = local(illustrationRects.ekgram as DOMRect);
        const shortest = local(illustrationRects["shortest-path-algorithms"] as DOMRect);
        const polyglot = local(illustrationRects.polyglot as DOMRect);
        const edgeOffset = 12;

        const offsetPoint = (
          start: { x: number; y: number },
          end: { x: number; y: number },
          progress: number,
          offset: number,
        ) => {
          const deltaX = end.x - start.x;
          const deltaY = end.y - start.y;
          const length = Math.max(Math.hypot(deltaX, deltaY), 1);
          return {
            x: start.x + deltaX * progress - deltaY / length * offset,
            y: start.y + deltaY * progress + deltaX / length * offset,
          };
        };

        const hubWidth = hub.right - hub.left;
        const upperLeft = { x: hub.left + hubWidth / 3, y: hub.top - 22 };
        const upperRight = { x: hub.left + hubWidth * 2 / 3, y: hub.top - 22 };
        const lowerLeft = { x: hub.left + hubWidth / 3, y: hub.bottom + 22 };
        const lowerRight = { x: hub.left + hubWidth * 2 / 3, y: hub.bottom + 22 };
        const lowerCentre = { x: hub.centreX, y: hub.bottom + 22 };
        const parallaxEnd = { x: parallax.right + edgeOffset, y: parallax.bottom + edgeOffset };
        const banditsEnd = { x: bandits.left - edgeOffset, y: bandits.bottom + edgeOffset };
        const ekgramEnd = { x: ekgram.right + edgeOffset, y: ekgram.top - edgeOffset };
        const shortestEnd = { x: shortest.left - edgeOffset, y: shortest.top - edgeOffset };
        const polyglotEnd = { x: polyglot.centreX, y: polyglot.top - edgeOffset };

        const parallaxC1 = offsetPoint(upperLeft, parallaxEnd, 0.18, 25);
        const parallaxC2 = offsetPoint(upperLeft, parallaxEnd, 0.38, 29);
        const parallaxMid = offsetPoint(upperLeft, parallaxEnd, 0.52, 3);
        const parallaxC3 = offsetPoint(upperLeft, parallaxEnd, 0.67, -20);
        const parallaxC4 = offsetPoint(upperLeft, parallaxEnd, 0.86, -14);

        const banditsC1 = { x: upperRight.x + (banditsEnd.x - upperRight.x) * 0.08, y: upperRight.y + (banditsEnd.y - upperRight.y) * 0.34 };
        const banditsC2 = offsetPoint(upperRight, banditsEnd, 0.34, -35);
        const banditsMid = offsetPoint(upperRight, banditsEnd, 0.55, -22);
        const banditsC3 = offsetPoint(upperRight, banditsEnd, 0.72, 5);
        const banditsC4 = offsetPoint(upperRight, banditsEnd, 0.9, 12);

        const ekgramC1 = offsetPoint(lowerLeft, ekgramEnd, 0.22, 18);
        const ekgramC2 = offsetPoint(lowerLeft, ekgramEnd, 0.4, 20);
        const ekgramMid = offsetPoint(lowerLeft, ekgramEnd, 0.55, 7);
        const ekgramC3 = offsetPoint(lowerLeft, ekgramEnd, 0.7, -9);
        const ekgramC4 = offsetPoint(lowerLeft, ekgramEnd, 0.9, -6);

        const shortestC1 = offsetPoint(lowerRight, shortestEnd, 0.16, -12);
        const shortestC2 = offsetPoint(lowerRight, shortestEnd, 0.37, -45);
        const shortestMid = offsetPoint(lowerRight, shortestEnd, 0.58, -38);
        const shortestC3 = offsetPoint(lowerRight, shortestEnd, 0.78, -25);
        const shortestC4 = offsetPoint(lowerRight, shortestEnd, 0.93, -5);

        const polyglotC1 = offsetPoint(lowerCentre, polyglotEnd, 0.2, 5);
        const polyglotC2 = offsetPoint(lowerCentre, polyglotEnd, 0.42, 6);
        const polyglotMid = offsetPoint(lowerCentre, polyglotEnd, 0.55, 0);
        const polyglotC3 = offsetPoint(lowerCentre, polyglotEnd, 0.7, -5);
        const polyglotC4 = offsetPoint(lowerCentre, polyglotEnd, 0.9, -3);

        const nodeBounds = (slug: string) => local(triggerRefs.current[slug]?.getBoundingClientRect() as DOMRect);
        const ekgramNode = nodeBounds("ekgram");
        const parallaxNode = nodeBounds("parallax");
        const polyglotNode = nodeBounds("polyglot");
        const banditsNode = nodeBounds("multi-armed-bandits");
        const mobileStarts = {
          ekgram: { x: hub.centreX, y: hub.bottom + 12 },
          parallax: { x: ekgramNode.centreX, y: ekgramNode.bottom + 10 },
          polyglot: { x: parallaxNode.centreX, y: parallaxNode.bottom + 10 },
          bandits: { x: polyglotNode.centreX, y: polyglotNode.bottom + 10 },
          shortest: { x: banditsNode.centreX, y: banditsNode.bottom + 10 },
        };
        const mobileEnds = {
          ekgram: { x: ekgram.centreX, y: ekgram.top - 10 },
          parallax: { x: parallax.centreX, y: parallax.top - 10 },
          polyglot: { x: polyglot.centreX, y: polyglot.top - 10 },
          bandits: { x: bandits.centreX, y: bandits.top - 10 },
          shortest: { x: shortest.centreX, y: shortest.top - 10 },
        };

        const mobileEkC1 = offsetPoint(mobileStarts.ekgram, mobileEnds.ekgram, 0.16, -22);
        const mobileEkC2 = offsetPoint(mobileStarts.ekgram, mobileEnds.ekgram, 0.35, -28);
        const mobileEkMid = offsetPoint(mobileStarts.ekgram, mobileEnds.ekgram, 0.52, 0);
        const mobileEkC3 = offsetPoint(mobileStarts.ekgram, mobileEnds.ekgram, 0.7, 25);
        const mobileEkC4 = offsetPoint(mobileStarts.ekgram, mobileEnds.ekgram, 0.88, 17);

        const mobileParallaxC1 = offsetPoint(mobileStarts.parallax, mobileEnds.parallax, 0.12, 48);
        const mobileParallaxC2 = offsetPoint(mobileStarts.parallax, mobileEnds.parallax, 0.34, 56);
        const mobileParallaxMid = offsetPoint(mobileStarts.parallax, mobileEnds.parallax, 0.58, 10);
        const mobileParallaxC3 = offsetPoint(mobileStarts.parallax, mobileEnds.parallax, 0.77, -21);
        const mobileParallaxC4 = offsetPoint(mobileStarts.parallax, mobileEnds.parallax, 0.92, -11);

        const mobilePolyC1 = offsetPoint(mobileStarts.polyglot, mobileEnds.polyglot, 0.2, -30);
        const mobilePolyC2 = offsetPoint(mobileStarts.polyglot, mobileEnds.polyglot, 0.4, -38);
        const mobilePolyMid = offsetPoint(mobileStarts.polyglot, mobileEnds.polyglot, 0.54, -4);
        const mobilePolyC3 = offsetPoint(mobileStarts.polyglot, mobileEnds.polyglot, 0.72, 23);
        const mobilePolyC4 = offsetPoint(mobileStarts.polyglot, mobileEnds.polyglot, 0.9, 13);

        const mobileBanditsC1 = offsetPoint(mobileStarts.bandits, mobileEnds.bandits, 0.15, 25);
        const mobileBanditsC2 = offsetPoint(mobileStarts.bandits, mobileEnds.bandits, 0.37, 36);
        const mobileBanditsMid = offsetPoint(mobileStarts.bandits, mobileEnds.bandits, 0.58, 5);
        const mobileBanditsC3 = offsetPoint(mobileStarts.bandits, mobileEnds.bandits, 0.76, -31);
        const mobileBanditsC4 = offsetPoint(mobileStarts.bandits, mobileEnds.bandits, 0.92, -20);

        const mobileShortestDeltaX = mobileEnds.shortest.x - mobileStarts.shortest.x;
        const mobileShortestDeltaY = mobileEnds.shortest.y - mobileStarts.shortest.y;
        const mobileShortestC1 = { x: mobileStarts.shortest.x + mobileShortestDeltaX * 0.16, y: mobileStarts.shortest.y + mobileShortestDeltaY * 0.25 };
        const mobileShortestC2 = offsetPoint(mobileStarts.shortest, mobileEnds.shortest, 0.38, -38);
        const mobileShortestMid = offsetPoint(mobileStarts.shortest, mobileEnds.shortest, 0.57, -12);
        const mobileShortestC3 = offsetPoint(mobileStarts.shortest, mobileEnds.shortest, 0.75, 34);
        const mobileShortestC4 = offsetPoint(mobileStarts.shortest, mobileEnds.shortest, 0.92, 14);

        setTrailGeometry({
          width: containerRect.width,
          height: containerRect.height,
          mobilePaths: {
            ekgram: `M${mobileStarts.ekgram.x} ${mobileStarts.ekgram.y}C${mobileEkC1.x} ${mobileEkC1.y} ${mobileEkC2.x} ${mobileEkC2.y} ${mobileEkMid.x} ${mobileEkMid.y}C${mobileEkC3.x} ${mobileEkC3.y} ${mobileEkC4.x} ${mobileEkC4.y} ${mobileEnds.ekgram.x} ${mobileEnds.ekgram.y}`,
            parallax: `M${mobileStarts.parallax.x} ${mobileStarts.parallax.y}C${mobileParallaxC1.x} ${mobileParallaxC1.y} ${mobileParallaxC2.x} ${mobileParallaxC2.y} ${mobileParallaxMid.x} ${mobileParallaxMid.y}C${mobileParallaxC3.x} ${mobileParallaxC3.y} ${mobileParallaxC4.x} ${mobileParallaxC4.y} ${mobileEnds.parallax.x} ${mobileEnds.parallax.y}`,
            polyglot: `M${mobileStarts.polyglot.x} ${mobileStarts.polyglot.y}C${mobilePolyC1.x} ${mobilePolyC1.y} ${mobilePolyC2.x} ${mobilePolyC2.y} ${mobilePolyMid.x} ${mobilePolyMid.y}C${mobilePolyC3.x} ${mobilePolyC3.y} ${mobilePolyC4.x} ${mobilePolyC4.y} ${mobileEnds.polyglot.x} ${mobileEnds.polyglot.y}`,
            "multi-armed-bandits": `M${mobileStarts.bandits.x} ${mobileStarts.bandits.y}C${mobileBanditsC1.x} ${mobileBanditsC1.y} ${mobileBanditsC2.x} ${mobileBanditsC2.y} ${mobileBanditsMid.x} ${mobileBanditsMid.y}C${mobileBanditsC3.x} ${mobileBanditsC3.y} ${mobileBanditsC4.x} ${mobileBanditsC4.y} ${mobileEnds.bandits.x} ${mobileEnds.bandits.y}`,
            "shortest-path-algorithms": `M${mobileStarts.shortest.x} ${mobileStarts.shortest.y}C${mobileShortestC1.x} ${mobileShortestC1.y} ${mobileShortestC2.x} ${mobileShortestC2.y} ${mobileShortestMid.x} ${mobileShortestMid.y}C${mobileShortestC3.x} ${mobileShortestC3.y} ${mobileShortestC4.x} ${mobileShortestC4.y} ${mobileEnds.shortest.x} ${mobileEnds.shortest.y}`,
          },
          paths: {
            parallax: `M${upperLeft.x} ${upperLeft.y}C${parallaxC1.x} ${parallaxC1.y} ${parallaxC2.x} ${parallaxC2.y} ${parallaxMid.x} ${parallaxMid.y}C${parallaxC3.x} ${parallaxC3.y} ${parallaxC4.x} ${parallaxC4.y} ${parallaxEnd.x} ${parallaxEnd.y}`,
            "multi-armed-bandits": `M${upperRight.x} ${upperRight.y}C${banditsC1.x} ${banditsC1.y} ${banditsC2.x} ${banditsC2.y} ${banditsMid.x} ${banditsMid.y}C${banditsC3.x} ${banditsC3.y} ${banditsC4.x} ${banditsC4.y} ${banditsEnd.x} ${banditsEnd.y}`,
            ekgram: `M${lowerLeft.x} ${lowerLeft.y}C${ekgramC1.x} ${ekgramC1.y} ${ekgramC2.x} ${ekgramC2.y} ${ekgramMid.x} ${ekgramMid.y}C${ekgramC3.x} ${ekgramC3.y} ${ekgramC4.x} ${ekgramC4.y} ${ekgramEnd.x} ${ekgramEnd.y}`,
            "shortest-path-algorithms": `M${lowerRight.x} ${lowerRight.y}C${shortestC1.x} ${shortestC1.y} ${shortestC2.x} ${shortestC2.y} ${shortestMid.x} ${shortestMid.y}C${shortestC3.x} ${shortestC3.y} ${shortestC4.x} ${shortestC4.y} ${shortestEnd.x} ${shortestEnd.y}`,
            polyglot: `M${lowerCentre.x} ${lowerCentre.y}C${polyglotC1.x} ${polyglotC1.y} ${polyglotC2.x} ${polyglotC2.y} ${polyglotMid.x} ${polyglotMid.y}C${polyglotC3.x} ${polyglotC3.y} ${polyglotC4.x} ${polyglotC4.y} ${polyglotEnd.x} ${polyglotEnd.y}`,
          },
        });
      });
    };

    const resizeObserver = new ResizeObserver(updateTrails);
    resizeObserver.observe(constellation);
    resizeObserver.observe(centre);
    projectOrder.forEach((slug) => {
      const illustration = illustrationRefs.current[slug];
      if (illustration) resizeObserver.observe(illustration);
    });
    window.addEventListener("resize", updateTrails);
    updateTrails();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateTrails);
    };
  }, []);

  const closePanel = () => {
    setSelectedSlug(null);
    setResultsSlug(null);
  };

  return (
    <div className={`project-constellation selected-${selectedSlug ?? "none"}`} onClick={closePanel} ref={constellationRef}>
      <header className="constellation-centre" ref={centreRef}>
        <h1>Things I’ve built.</h1>
        <p>Select a project to explore.</p>
      </header>
      <svg aria-hidden="true" className="constellation-trails" preserveAspectRatio="none" viewBox={`0 0 ${trailGeometry?.width ?? 1} ${trailGeometry?.height ?? 1}`}>
        <path className="trail trail-parallax" d={trailGeometry?.paths.parallax} />
        <path className="trail trail-multi-armed-bandits" d={trailGeometry?.paths["multi-armed-bandits"]} />
        <path className="trail trail-ekgram" d={trailGeometry?.paths.ekgram} />
        <path className="trail trail-shortest-path-algorithms" d={trailGeometry?.paths["shortest-path-algorithms"]} />
        <path className="trail trail-polyglot" d={trailGeometry?.paths.polyglot} />
      </svg>
      <svg aria-hidden="true" className="mobile-constellation-trails" preserveAspectRatio="none" viewBox={`0 0 ${trailGeometry?.width ?? 1} ${trailGeometry?.height ?? 1}`}>
        <path className="trail trail-ekgram" d={trailGeometry?.mobilePaths.ekgram} />
        <path className="trail trail-parallax" d={trailGeometry?.mobilePaths.parallax} />
        <path className="trail trail-polyglot" d={trailGeometry?.mobilePaths.polyglot} />
        <path className="trail trail-multi-armed-bandits" d={trailGeometry?.mobilePaths["multi-armed-bandits"]} />
        <path className="trail trail-shortest-path-algorithms" d={trailGeometry?.mobilePaths["shortest-path-algorithms"]} />
      </svg>

      {orderedProjects.map((project) => {
        const title = displayTitles[project.slug] ?? project.title;
        const isSelected = selectedSlug === project.slug;
        return (
          <div className={`constellation-item constellation-item-${project.slug} ${isSelected ? "is-selected" : ""}`} key={project.slug}>
            <button
              aria-expanded={isSelected}
              aria-label={`${isSelected ? "Close" : "Open"} details for ${title}`}
              className="constellation-node"
              onClick={(event) => {
                event.stopPropagation();
                if (selectedSlug === project.slug) {
                  closePanel();
                  return;
                }
                positionPanel(project.slug);
                setSelectedSlug(project.slug);
                setResultsSlug(null);
              }}
              ref={(element) => { triggerRefs.current[project.slug] = element; }}
              type="button"
            >
              <span className="constellation-illustration" ref={(element) => { illustrationRefs.current[project.slug] = element; }}><NodeIllustration slug={project.slug} /></span>
              <span className="constellation-label">{title}</span>
            </button>

          </div>
        );
      })}

      {selectedSlug && (() => {
        const project = orderedProjects.find((item) => item.slug === selectedSlug);
        if (!project) return null;
        const title = displayTitles[project.slug] ?? project.title;
        const hasResults = project.slug === "multi-armed-bandits";
        const technologies = popupTechnologies[project.slug] ?? project.topics;
        return (
          <div className="constellation-overlay">
            <aside className={`constellation-panel constellation-panel-${project.slug}`} onClick={(event) => event.stopPropagation()} style={panelPosition}>
              <button aria-label={`Close ${title} details`} className="constellation-panel-close" onClick={closePanel} type="button">×</button>
              <h2>{title}</h2>
              {project.slug === "polyglot" && <p className="constellation-subtitle">Boson AI Higgs Audio Hackathon</p>}
              {project.slug === "ekgram" && (
                <p className="constellation-subtitle constellation-status"><span aria-hidden="true" />IN PROGRESS</p>
              )}
              {project.slug === "polyglot" ? (
                <p>Developed a real-time conversational AI application supporting 85 languages, capable of switching between languages mid-sentence while maintaining natural speech.</p>
              ) : (
                <p>{descriptions[project.slug] ?? project.summary}</p>
              )}
              <ul aria-label={`${title} technologies`}>
                {technologies.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
              {project.slug === "polyglot" ? (
                <p className="constellation-finding">
                  Integrated four Higgs AI models into a unified conversational pipeline, combining speech recognition, speech synthesis, and avatar generation with low-latency 24 kHz audio streaming.
                </p>
              ) : project.slug === "ekgram" ? (
                <p className="constellation-finding">
                  Using a dataset of over 8,700 ECG images, the model is optimized through waveform-based loss functions designed to preserve signal morphology and temporal accuracy across all 12 leads.
                </p>
              ) : project.slug === "parallax" ? (
                <p className="constellation-finding">
                  Achieved a <strong>69.3% reduction</strong> in final accumulated orientation error across 1,000 driving sequence frames using temporal rotation correction.
                </p>
              ) : project.slug === "shortest-path-algorithms" ? (
                <p className="constellation-finding">
                  A* achieved approximately <strong>8.4× faster</strong> route finding than Dijkstra across the London Underground network by using a Euclidean distance heuristic to reduce unnecessary exploration. Constrained Bellman-Ford outperformed Dijkstra on sparse graphs with small iteration limits, demonstrating a trade-off between computational efficiency and solution accuracy.
                </p>
              ) : findings[project.slug] && <p className="constellation-finding">{findings[project.slug]}</p>}
              <div className="constellation-panel-actions">
                {hasResults && (
                  <button aria-expanded={resultsSlug === project.slug} onClick={() => setResultsSlug((current) => current === project.slug ? null : project.slug)} type="button">
                    {resultsSlug === project.slug ? "Hide results" : "View results"}
                  </button>
                )}
                {repositoryUrls[project.slug] && <a href={repositoryUrls[project.slug]} rel="noreferrer" target="_blank">GitHub <span aria-hidden="true">↗</span></a>}
              </div>
              {resultsSlug === project.slug && <figure className="constellation-result"><ResultImage slug={project.slug} /></figure>}
            </aside>
          </div>
        );
      })()}
    </div>
  );
}
