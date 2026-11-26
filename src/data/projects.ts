export type Project = {
  slug: string;
  title: string;
  field: string;
  category: "Computer Vision" | "Machine Learning" | "Algorithms" | "Systems";
  subtitle: string;
  summary: string;
  topics: string[];
  highlights: string[];
  status: "featured" | "project";
};

export const projects: Project[] = [
  {
    slug: "polyglot",
    title: "Polyglot",
    field: "Artificial intelligence",
    category: "Machine Learning",
    subtitle: "Real-time multilingual speech",
    summary: "A real-time conversational AI application developed by a four-person team, supporting multilingual speech and mid-sentence language switching.",
    topics: ["AI", "Language learning", "Real-time interaction"],
    highlights: ["Multilingual AI application", "Real-time language-learning interaction"],
    status: "project",
  },
  {
    slug: "parallax",
    title: "Parallax",
    field: "Computer vision",
    category: "Computer Vision",
    subtitle: "Monocular visual odometry",
    summary: "Built a monocular visual odometry system to estimate a vehicle's trajectory using a single camera, then improved its accuracy through temporal rotation correction to reduce accumulated drift.",
    topics: ["Python", "OpenCV", "NumPy", "Matplotlib", "pytest"],
    highlights: ["Monocular visual odometry", "Temporal rotation correction"],
    status: "featured",
  },
  {
    slug: "burstormer",
    title: "ReFrame",
    field: "Computational photography",
    category: "Computer Vision",
    subtitle: "Burst image reconstruction",
    summary: "Working in a three-person team to extend existing algorithm Burstormer to investigate whether adaptive reference-frame selection can improve burst super-resolution by choosing stronger reference images before alignment and fusion.",
    topics: ["Python", "PyTorch", "OpenCV", "NumPy"],
    highlights: ["Adaptive reference-frame selection", "Multi-frame reconstruction workflow"],
    status: "project",
  },
  {
    slug: "ekgram",
    title: "EKGram",
    field: "Signal processing",
    category: "Computer Vision",
    subtitle: "ECG digitization",
    summary: "A four-person end-to-end MLOps project for converting images of ECG printouts into structured 12-lead signals and serving predictions through a deployed web application.",
    topics: ["Python", "PyTorch", "FastAPI", "W&B", "Docker", "Google Cloud Run"],
    highlights: ["ECG image-to-signal digitization", "End-to-end model training, registry, serving, and deployment"],
    status: "featured",
  },
  {
    slug: "multi-armed-bandits",
    title: "Multi-Armed Bandits",
    field: "Reinforcement learning",
    category: "Machine Learning",
    subtitle: "Sequential decision-making",
    summary: "Implemented and compared Explore-Then-Commit (ETC) and Upper Confidence Bound (UCB) algorithms to investigate the trade-off between exploration and exploitation in sequential decision-making.",
    topics: ["Python", "NumPy", "Matplotlib"],
    highlights: ["Explore-Then-Commit and Upper Confidence Bound", "Cumulative-regret comparison"],
    status: "project",
  },
  {
    slug: "shortest-path-algorithms",
    title: "Shortest-Path Algorithms and Heuristic Search",
    field: "Algorithms",
    category: "Algorithms",
    subtitle: "Paths through weighted graphs",
    summary: "An exploration of shortest-path problems and the algorithms used to navigate weighted graph structures.",
    topics: ["Graphs", "Algorithms", "Pathfinding"],
    highlights: ["Dijkstra, Bellman-Ford, and Floyd-Warshall", "A* heuristic search"],
    status: "project",
  },
  {
    slug: "virtual-memory-simulator",
    title: "Virtual Memory Simulator",
    field: "Systems",
    category: "Systems",
    subtitle: "Address translation and memory",
    summary: "A systems project focused on modelling virtual memory concepts and the relationship between logical and physical address spaces.",
    topics: ["Systems", "Memory", "Simulation"],
    highlights: ["Paging and address translation", "TLB and FIFO page replacement"],
    status: "project",
  },
];
