export const education = [
  {
    institution: "University of Toronto",
    degree: "MSc Applied Computing",
    dates: "September 2026 – December 2027 (Expected)",
    coursework: [
      "Introduction to Machine Learning",
      "Neural Networks and Deep Learning",
      "Computational Imaging",
    ],
  },
  {
    institution: "McMaster University",
    degree: "BSc Honours Mathematics and Computer Science",
    dates: "September 2021 – April 2026",
    gpa: "3.9/4.0",
    awards: [
      {
        name: "Dr. John Potter Scholarship",
        description: "Awarded to five students enrolled in a Physics or Mathematics program who attain a high fall and winter average.",
      },
      {
        name: "James Stewart Research Award",
        description: "Awarded to work under Dr. Kathryn Murphy as a data analyst and student researcher.",
      },
      {
        name: "Golden Key International Honour Society",
        description: "Membership in the society awarded to students in the top 15% of their program.",
      },
      {
        name: "Dean's Honour List",
        description: "Awarded to students who achieve a minimum average of 3.5/4.0 across 30.0 units.",
      },
      {
        name: "Faculty of Science Achievement Award",
        description: "Awarded to students entering their first year in the Faculty of Science with a secondary school average above 95%.",
      },
    ],
    coursework: [
      "Data Structures and Algorithms",
      "Operating Systems",
      "Databases",
      "Software Design",
      "Reinforcement Learning",
      "Mathematical Modelling",
      "Multivariable Calculus",
      "Linear Algebra",
      "Probability and Statistics",
      "Cryptography",
    ],
  },
];

export const technologyGroups = [
  { label: "Languages", technologies: ["Python", "C/C++", "Java", "JavaScript/TypeScript", "SQL", "R", "Bash"] },
  { label: "ML & Scientific Computing", technologies: ["PyTorch", "scikit-learn", "OpenCV", "NumPy", "Pandas", "SciPy"] },
  { label: "Tools & Frameworks", technologies: ["React", "Next.js", "Node.js", "SQLite", "Linux/Unix", "Git", "pytest"] },
];

export const experience = [
  {
    role: "Teaching Assistant",
    organization: "McMaster University",
    location: "Hamilton, ON",
    dates: "January – April 2026",
    details: [
      [
        { text: "Led weekly tutorials for " },
        { text: "30–50 students", emphasis: true },
        { text: " in COMPSCI 2DB3 (Databases), teaching SQL, relational schema design, normalization, and query optimization" },
      ],
      [
        { text: "Evaluated " },
        { text: "400+ assignments", emphasis: true },
        { text: " and supported students through office hours" },
      ],
    ],
  },
  {
    role: "Data Analyst",
    organization: "Visual Neuroscience Lab",
    location: "Hamilton, ON",
    dates: "May – August 2025",
    details: [
      [
        { text: "Parallelized Fréchet distance computations across six CPU workers using batching, achieving a " },
        { text: "75% runtime reduction", emphasis: true },
      ],
      [
        { text: "Debugged the bMIND Bayesian deconvolution model by resolving covariance matrix incompatibilities through prior adjustments and parameter tuning" },
      ],
      [
        { text: "Validated bMIND gene expression estimates using DABEST bootstrap analysis, achieving a " },
        { text: "near-zero median difference", emphasis: true },
        { text: " between reconstructed and observed data" },
      ],
      [
        { text: "Built a relational SQLite database for Allen Institute neuroscience datasets, improving data access and creating tutorials for researchers" },
      ],
    ],
  },
];

export const publications = [
  {
    type: "University research feature",
    title: "Advancing Computational Methods for Brain Transcriptomics and Data Analysis",
    venue: "McMaster University",
    date: "2025",
    href: "https://math.mcmaster.ca/undergraduate/useful-links/stewart-fund-award-winners/",
  },
  {
    type: "Journal publication",
    title: "Treatment of Alzheimer's Disease using Axitinib",
    venue: "McMaster Brain Research Society Journal",
    date: "2024",
    href: "https://journals.mcmaster.ca/macbrs/issue/view/215",
  },
];
