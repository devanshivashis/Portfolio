// Single source of truth for everything the site says about me.
// Edit text here; the components only handle layout.

export const links = {
  email: "devanshivashistha05@gmail.com",
  linkedin: "https://www.linkedin.com/in/devanshi-vashistha-409542205/",
  github: "https://github.com/devanshivashis",
  cv: "/Devanshi_Vashistha_CV.pdf",
  paper: "https://doi.org/10.1109/ICIIP61524.2023.10537735",
};

export const roles = ["Data Scientist", "Researcher", "AI Reviewer"];

export const experience = [
  {
    role: "AI / ML Software Developer, promoted to Team Lead",
    company: "Agsure Innovations",
    period: "Jun 2024 - Aug 2025",
    location: "Delhi, India",
    points: [
      "Built a real-time computer vision system that grades grain quality at 99% accuracy, replacing grading by eye.",
      "Deployed it on AWS and moved TensorFlow / Keras models from notebooks into production pipelines behind Flask REST APIs, tested with Postman.",
      "Promoted to team lead: guided 4 interns through experiments, code reviews and deployment, and explained model decisions to non-technical colleagues.",
    ],
  },
  {
    role: "Freelance AI Evaluation Specialist (AI Training)",
    company: "Mercor",
    period: "Jul 2026 - Present",
    location: "Remote, part time",
    points: [
      "Grade LLM outputs against a fixed eight-category rubric, scoring each criterion separately so every judgement can be used directly as a training signal.",
      "Review content across ESG, cybersecurity, healthcare and investment topics, checking my labels against reference answers to stay consistent batch to batch.",
      "Tag \"AI-isms\" (padded phrasing, empty hedging, template structure) and write prompt guidance that pushes models toward specific, natural answers.",
    ],
  },
  {
    role: "Sales Development Representative Intern",
    company: "Recruit CRM",
    period: "Dec 2023 - Jun 2024",
    location: "Remote",
    points: [
      "Generated leads and ran cold outreach to recruitment agencies across North America for a B2B SaaS product.",
      "Set up and coordinated live product demos with regional sales leaders.",
      "First point of contact for prospects across North America, Europe and Asia: qualified buying interest and kept prospect records in HubSpot CRM.",
    ],
  },
  {
    role: "AI / ML Trainee (Industrial Training)",
    company: "Jaypee University of Information Technology",
    period: "Jun 2023 - Jul 2023",
    location: "Solan, India",
    points: [
      "Completed hands-on training in Python, classical machine learning and neural networks.",
      "Implemented data preprocessing pipelines: cleaning, encoding, scaling and train / test splits.",
      "Built and compared baseline ML models as part of the training coursework.",
    ],
  },
  {
    role: "Data Scientist (Apprenticeship)",
    company: "IBM",
    period: "Jul 2022 - Oct 2022",
    location: "Remote",
    points: [
      "Applied machine learning techniques to several datasets to solve predictive problems.",
      "Contributed to an applied research project focused on predictive modelling.",
      "Explored, cleaned and visualised data in Python before modelling, and reported results to project mentors.",
    ],
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

export type CaseStudy = {
  id: string;
  title: string;
  kind: string;
  problem: string;
  approach: string;
  outcome: string;
  tags: string[];
  link?: { label: string; href: string };
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "01",
    title: "Which heartbeats are serious? Arrhythmia triage from a 10-second ECG",
    kind: "MSc dissertation · industry project with Uniworx · Jun - Sep 2026",
    problem:
      "Flag serious cardiac abnormalities from a single 10-second Lead II window across 45,152 PhysioNet ECGs, where Sinus Bradycardia alone is a third of the data and some urgent conditions have under 100 records.",
    approach:
      "Built a NeuroKit2 pipeline extracting 21 HRV, rhythm and morphology features. Removed SMOTE after finding 41% of training rows were synthetic patients, cut collinearity (max VIF 236.9 to 12.6) before SHAP, and compared RF, XGBoost and LightGBM over 16 configurations and 30 paired runs with Holm-corrected tests.",
    outcome:
      "A calibrated LightGBM model that catches 88.8% of serious ECGs (95% CI 87.6 - 90.1%). The fairness audit showed recall falling to 29% for under-30s, which is reported as a headline limitation instead of being buried.",
    tags: ["Python", "LightGBM", "XGBoost", "SHAP", "NeuroKit2", "Statistical testing", "Fairness"],
    featured: true,
  },
  {
    id: "02",
    title: "Making NDA risk visible: Project:Hack27 at Rolls-Royce",
    kind: "Two-day hackathon · Rolls-Royce L&D Centre, Derby · Apr 2026",
    problem:
      "How do you show where non-disclosure agreements are being used to silence people, using only survey responses?",
    approach:
      "With team Collective Voice, analysed 1,656 anonymised survey responses and built a Sector Risk Lens that scores 20+ sectors on toxicity, silencing and reporting failure, plus a logistic regression model estimating the odds of career harm after speaking up, explained in plain English for policymakers.",
    outcome:
      "Evidence such as 86.2% of people getting no meaningful intervention after speaking up, and an invitation from Speak Out Revolution to keep developing the Sector Risk Lens.",
    tags: ["Logistic regression", "Risk scoring", "Python", "Social impact"],
  },
  {
    id: "03",
    title: "Does a deeper CNN find tumours better?",
    kind: "Published research · IEEE ICIIP 2023",
    problem: "Find out how the number of hidden layers in a CNN changes brain MRI tumour classification across four classes.",
    approach: "Trained and compared CNN architectures of increasing depth under the same data and evaluation setup.",
    outcome: "The best architecture reached 95% accuracy; the study was peer reviewed and published at IEEE ICIIP 2023.",
    tags: ["CNN", "TensorFlow", "Medical imaging", "Research"],
    link: { label: "Read the paper", href: links.paper },
  },
  {
    id: "04",
    title: "Ranking resumes so placement staff don't have to",
    kind: "NLP · university placement cell",
    problem: "Placement staff were reading and matching resumes to roles by hand.",
    approach: "Built an NLP system that parses resumes, matches them to job requirements and ranks candidates.",
    outcome: "Applicant quality improved by 85% for the placement drives that used it.",
    tags: ["NLP", "Python", "Ranking"],
  },
  {
    id: "05",
    title: "Catching a driver before they nod off",
    kind: "Real-time computer vision",
    problem: "Detect driver fatigue from a plain webcam, fast enough to warn them in time.",
    approach: "Tracked eye state frame by frame with OpenCV and a Keras classifier, alerting when eyes stay closed too long.",
    outcome: "91% accuracy in real time on a standard laptop camera.",
    tags: ["OpenCV", "Keras", "Real-time"],
  },
  {
    id: "06",
    title: "Two smaller builds",
    kind: "Deep learning · IoT",
    problem: "Practise the fundamentals end to end, in software and hardware.",
    approach: "A Fashion-MNIST classifier trained on 70,000 images, and an Arduino overspeed detector that times vehicles between two sensors.",
    outcome: "A clean deep learning baseline and a working hardware prototype.",
    tags: ["TensorFlow", "Arduino", "IoT"],
  },
];

export const languages = [
  { name: "Python", note: "Daily driver", mono: "Py", hue: "210 70% 55%" },
  { name: "R", note: "Stats & modelling", mono: "R", hue: "220 45% 62%" },
  { name: "SQL", note: "Querying & joins", mono: "SQL", hue: "28 85% 58%" },
];

export const skills = [
  {
    category: "Machine learning",
    items: ["scikit-learn", "XGBoost", "LightGBM", "TensorFlow", "Keras", "CNNs", "NLP", "PyTorch (currently building)"],
  },
  {
    category: "Evaluation & research",
    items: ["SHAP", "Hypothesis testing", "Effect sizes", "Calibration", "Fairness audits", "LLM output evaluation"],
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
