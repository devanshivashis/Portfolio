// Single source of truth for everything the site says about me.
// Edit text here; the components only handle layout.

export const links = {
  email: "devanshivashistha05@gmail.com",
  linkedin: "https://www.linkedin.com/in/devanshi-vashistha-409542205/",
  github: "https://github.com/devanshivashis",
  cv: "/Devanshi_Vashistha_CV.pdf",
  paper: "https://doi.org/10.1109/ICIIP61524.2023.10537735",
};

export const experience = [
  {
    role: "AI / ML Software Developer, later Team Lead",
    company: "Agsure Innovations",
    period: "Jun 2024 - Aug 2025",
    location: "Delhi, India",
    points: [
      "Built a real-time computer vision system that grades grain quality at 99% accuracy, deployed on AWS and used in production.",
      "Moved TensorFlow / Keras models from notebooks into production pipelines behind Flask REST APIs, tested with Postman.",
      "Promoted to team lead and guided 4 interns through code reviews, model experiments and deployment.",
    ],
  },
  {
    role: "AI Training Freelancer",
    company: "Mercor",
    period: "Jul 2026 - Present",
    location: "Remote, part time",
    points: [
      "Grade frontier-model outputs against detailed rubrics and write prompt guidance used in model training.",
    ],
  },
  {
    role: "Sales Development Representative Intern",
    company: "Recruit CRM",
    period: "Dec 2023 - Jun 2024",
    location: "Remote",
    points: [
      "Ran outreach to recruitment agencies across North America and supported SaaS product demos with Account Executives. Good practice at explaining software to people who just want it to work.",
    ],
  },
  {
    role: "AI / ML Trainee",
    company: "Jaypee University of Information Technology",
    period: "Jun 2023 - Jul 2023",
    location: "Solan, India",
    points: ["Industrial training in Python, classical ML and neural networks."],
  },
  {
    role: "Data Scientist (Apprenticeship)",
    company: "IBM",
    period: "Jul 2022 - Oct 2022",
    location: "Remote",
    points: ["Applied predictive modelling to several datasets as part of an applied research project."],
  },
];

export const education = [
  {
    degree: "MSc Data Science",
    school: "University of Leicester",
    period: "2025 - 2026",
    note: "Expected Distinction. Dissertation: cardiac arrhythmia severity classification with an industry partner.",
  },
  {
    degree: "BTech Computer Science and Engineering",
    school: "Jaypee University of Information Technology",
    period: "2020 - 2024",
    note: "CGPA 8.9 / 10. Modules included Machine Learning, Deep Learning, Reinforcement Learning and Digital Image Processing.",
  },
];

export type Project = {
  title: string;
  kind: string;
  summary: string;
  result: string;
  tags: string[];
  link?: { label: string; href: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Arrhythmia Severity Classification from a 10-second ECG",
    kind: "MSc dissertation · industry project with Uniworx · Jun - Sep 2026",
    summary:
      "Built a Lead II pipeline over 45,152 PhysioNet 12-lead ECGs: NeuroKit2 cleaning, R-peak detection and 21 HRV, rhythm and morphology features, mapped to three clinical severity tiers. Dropped SMOTE so the model only ever trains on real patients, cut collinear features from a max VIF of 236.9 to 12.6 before SHAP, then compared Random Forest, XGBoost and LightGBM across 16 configurations with 30 repeated paired comparisons.",
    result:
      "The final LightGBM model catches 88.8% of serious ECGs (95% CI 87.6 - 90.1%) and is calibrated (Brier 0.066). The fairness audit found recall falling from 0.98 in over-80s to 0.29 in under-30s, which is now reported up front rather than buried.",
    tags: ["Python", "LightGBM", "XGBoost", "SHAP", "NeuroKit2", "Model evaluation", "Fairness"],
    featured: true,
  },
  {
    title: "Brain Tumour Detection (IEEE ICIIP 2023)",
    kind: "Published research",
    summary:
      "Studied how the number of hidden layers in a CNN changes MRI tumour classification across four classes.",
    result: "Best architecture reached 95% accuracy; findings published at IEEE ICIIP 2023.",
    tags: ["CNN", "TensorFlow", "Medical imaging"],
    link: { label: "Read the paper", href: links.paper },
  },
  {
    title: "Applicant Tracking System",
    kind: "NLP · university placement cell",
    summary:
      "Built an NLP system that parses resumes and ranks candidates against a role, for the university placement service.",
    result: "Applicant quality improved by 85% for placement drives that used it.",
    tags: ["NLP", "Python", "Ranking"],
  },
  {
    title: "Driver Drowsiness Detection",
    kind: "Real-time computer vision",
    summary:
      "Tracked eye state from a webcam feed with OpenCV and a Keras classifier, raising an alert when the driver's eyes stay closed too long.",
    result: "91% accuracy in real time on a standard laptop camera.",
    tags: ["OpenCV", "Keras", "Real-time"],
  },
  {
    title: "Fashion-MNIST Classifier",
    kind: "Deep learning",
    summary: "Trained and compared image classifiers on 70,000 Fashion-MNIST images.",
    result: "A clean baseline for experimenting with architecture and regularisation choices.",
    tags: ["TensorFlow", "Classification"],
  },
  {
    title: "Overspeed Vehicle Detector",
    kind: "IoT",
    summary: "Arduino sensors that time a vehicle between two points and sound a buzzer above the speed limit.",
    result: "Working hardware prototype built end to end.",
    tags: ["Arduino", "IoT"],
  },
];

export const skills = [
  { category: "Languages", items: ["Python", "SQL", "R"] },
  {
    category: "Machine learning",
    items: ["scikit-learn", "XGBoost", "LightGBM", "TensorFlow", "Keras", "CNNs", "NLP", "PyTorch (currently building)"],
  },
  {
    category: "Evaluation & stats",
    items: ["SHAP", "Statistical testing", "Calibration", "Fairness analysis", "Cross-validation"],
  },
  {
    category: "Vision & signals",
    items: ["OpenCV", "NeuroKit2", "Image classification", "Object detection"],
  },
  {
    category: "Deploy & tools",
    items: ["AWS", "Docker", "Flask APIs", "Git", "Postman", "Tableau"],
  },
];
