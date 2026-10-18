import React, { useState } from "react";
import "./Programs.css";

const allPrograms = [
  // ========================================================
  // 1️⃣ CAREER TRACK: #1 AI/ML ENGINEER
  // ========================================================
  {
    title: "B.Tech in Artificial Intelligence (AI & ML Systems)",
    college: "IIT Hyderabad (Indian Institute of Technology)",
    location: "Hyderabad, Telangana, India",
    country: "India",
    duration: "4 years",
    fee: "₹2,25,000 / yr",
    intake: "July 2026 (JEE Advanced)",
    score: 98,
    tag: "Premier AI Program",
    type: "University",
    degree: "B.Tech",
    track: "#1 AI/ML Engineer",
    roles: [
      "AI/ML Engineer",
      "Machine Learning Engineer",
      "Deep Learning Scientist",
      "AI Systems Engineer"
    ],
    keywords: [
      "ai/ml engineer", "aiml", "ai ml", "machine learning engineer",
      "artificial intelligence", "deep learning", "iit hyderabad", "btech", "india"
    ],
    reasons: [
      "First dedicated Department of Artificial Intelligence among all IITs in India",
      "Comprehensive curriculum in Deep Neural Networks, Computer Vision, and Generative AI"
    ],
  },
  {
    title: "Master of Science in Applied Computing (MScAC) - Artificial Intelligence",
    college: "University of Toronto (St. George)",
    location: "Toronto, Ontario, Canada",
    country: "Canada",
    duration: "16 months",
    fee: "$34,000 / yr",
    intake: "Sep 2026",
    score: 97,
    tag: "Global AI Hub",
    type: "University",
    degree: "Master's",
    track: "#1 AI/ML Engineer",
    roles: [
      "AI/ML Engineer",
      "Machine Learning Research Engineer",
      "AI Solutions Architect"
    ],
    keywords: [
      "ai/ml engineer", "ai ml", "machine learning", "artificial intelligence",
      "toronto", "canada", "vector institute", "masters"
    ],
    reasons: [
      "Direct partnership with the world-famous Vector Institute for Artificial Intelligence",
      "Includes an 8-month paid applied research internship at top AI tech labs"
    ],
  },
  {
    title: "B.Tech in CSE (Artificial Intelligence & Machine Learning)",
    college: "VIT Vellore (Vellore Institute of Technology)",
    location: "Vellore, Tamil Nadu, India",
    country: "India",
    duration: "4 years",
    fee: "₹1,98,000 / yr",
    intake: "July 2026 (VITEEE)",
    score: 93,
    tag: "Top Private AI Track",
    type: "University",
    degree: "B.Tech",
    track: "#1 AI/ML Engineer",
    roles: [
      "AI/ML Engineer",
      "Applied ML Developer",
      "Data & ML Pipeline Specialist"
    ],
    keywords: [
      "ai/ml engineer", "aiml", "ai ml", "machine learning engineer",
      "vit", "vit vellore", "btech", "b.tech", "india"
    ],
    reasons: [
      "Specialized AI/ML labs with GPU clusters for training enterprise machine learning models",
      "Strong campus recruitment from top product firms hiring entry-level ML engineers"
    ],
  },
  {
    title: "Applied Artificial Intelligence and Machine Learning",
    college: "Conestoga College (Waterloo Tech Hub)",
    location: "Waterloo, Ontario, Canada",
    country: "Canada",
    duration: "1 year",
    fee: "$16,800",
    intake: "Sep 2026",
    score: 90,
    tag: "Industry AI Track",
    type: "College",
    degree: "Postgraduate Certificate",
    track: "#1 AI/ML Engineer",
    roles: [
      "AI/ML Engineer",
      "MLOps Specialist",
      "AI Application Developer"
    ],
    keywords: [
      "ai/ml engineer", "ai ml", "machine learning engineer", "conestoga",
      "waterloo", "canada", "postgraduate", "pgwp"
    ],
    reasons: [
      "Located in the heart of Canada's Waterloo high-tech innovation corridor",
      "Focus on practical MLOps, deployment of LLMs, and real-world computer vision"
    ],
  },

  // ========================================================
  // 2️⃣ CAREER TRACK: #2 DATA ANALYST
  // ========================================================
  {
    title: "B.S. in Data Science and Applications (Analytics Track)",
    college: "IIT Madras (Indian Institute of Technology)",
    location: "Chennai, Tamil Nadu, India",
    country: "India",
    duration: "4 years",
    fee: "₹1,00,000 / yr",
    intake: "May & Sep 2026",
    score: 96,
    tag: "NIRF #1 Pioneer",
    type: "University",
    degree: "B.S. Degree",
    track: "#2 Data Analyst",
    roles: [
      "Data Analyst",
      "Business Intelligence Analyst",
      "Quantitative Analyst",
      "Data Visualization Specialist"
    ],
    keywords: [
      "data analyst", "data analytics", "business intelligence", "sql",
      "python", "tableau", "power bi", "iit madras", "bs degree", "india"
    ],
    reasons: [
      "Designed and delivered by premier IIT Madras computer science & statistics faculty",
      "Extensive training in SQL, Excel Modeling, Python Analytics, and Power BI dashboards"
    ],
  },
  {
    title: "Postgraduate Certificate in Big Data Analytics & Visualization",
    college: "Seneca Polytechnic",
    location: "Toronto, Ontario, Canada",
    country: "Canada",
    duration: "1 year",
    fee: "$17,250",
    intake: "Sep 2026",
    score: 93,
    tag: "Hands-on Analytics",
    type: "College",
    degree: "Postgraduate Certificate",
    track: "#2 Data Analyst",
    roles: [
      "Data Analyst",
      "Business Intelligence (BI) Analyst",
      "Marketing & Financial Analyst"
    ],
    keywords: [
      "data analyst", "data analytics", "big data", "bi analyst",
      "seneca", "toronto", "canada", "pgwp"
    ],
    reasons: [
      "Hands-on lab curriculum covering modern enterprise data pipelines and Tableau",
      "Direct pathway for up to a 3-year Canadian Post-Graduation Work Permit (PGWP)"
    ],
  },
  {
    title: "B.Tech in Computer Science (Data Analytics & Business Systems)",
    college: "NSUT Delhi (Netaji Subhas University of Technology)",
    location: "Dwarka, New Delhi, India",
    country: "India",
    duration: "4 years",
    fee: "₹2,19,000 / yr",
    intake: "August 2026 (JAC Delhi)",
    score: 94,
    tag: "High Corporate Demand",
    type: "University",
    degree: "B.Tech",
    track: "#2 Data Analyst",
    roles: [
      "Data Analyst",
      "Analytics Consultant",
      "Product Data Analyst"
    ],
    keywords: [
      "data analyst", "data analytics", "nsut", "nsit", "delhi",
      "btech", "b.tech", "business analytics", "india"
    ],
    reasons: [
      "Elite Delhi institution with heavy on-campus recruitment from McKinsey, BCG, and analytics MNCs",
      "Strong grounding in database management, statistical modeling, and data reporting"
    ],
  },
  {
    title: "Post-Degree Diploma in Data Analytics",
    college: "Langara College",
    location: "Vancouver, British Columbia, Canada",
    country: "Canada",
    duration: "2 years",
    fee: "$18,400 / yr",
    intake: "Sep 2026",
    score: 90,
    tag: "3-Year PGWP Eligible",
    type: "College",
    degree: "Post-Degree Diploma",
    track: "#2 Data Analyst",
    roles: [
      "Data Analyst",
      "Operations Data Analyst",
      "Reporting & Insights Specialist"
    ],
    keywords: [
      "data analyst", "data analytics", "langara", "vancouver",
      "british columbia", "canada", "diploma", "pgwp"
    ],
    reasons: [
      "Full 2-year credential qualifying students for a 3-year Canadian PGWP open work permit",
      "High regional demand across Vancouver commercial banks and tech startups"
    ],
  },

  // ========================================================
  // 3️⃣ CAREER TRACK: #3 DATA SCIENTIST
  // ========================================================
  {
    title: "Master of Data Science (MDS)",
    college: "University of British Columbia (Vancouver)",
    location: "Vancouver, British Columbia, Canada",
    country: "Canada",
    duration: "10 months",
    fee: "$35,400",
    intake: "Sep 2026",
    score: 96,
    tag: "Top Data Science",
    type: "University",
    degree: "Master's",
    track: "#3 Data Scientist",
    roles: [
      "Data Scientist",
      "Machine Learning Scientist",
      "Statistical Data Scientist"
    ],
    keywords: [
      "data scientist", "data science", "mds", "ubc",
      "vancouver", "canada", "masters", "bc pnp"
    ],
    reasons: [
      "Accelerated intensive program with direct alignment for BC PNP Tech nomination",
      "Advanced coursework in probabilistic modeling, statistical inference, and deep data science"
    ],
  },
  {
    title: "B.Tech in Data Science and Engineering",
    college: "Manipal Institute of Technology (MAHE)",
    location: "Manipal, Karnataka, India",
    country: "India",
    duration: "4 years",
    fee: "₹3,85,000 / yr",
    intake: "July 2026 (MET)",
    score: 92,
    tag: "Dedicated DS Degree",
    type: "University",
    degree: "B.Tech",
    track: "#3 Data Scientist",
    roles: [
      "Data Scientist",
      "Machine Learning Engineer",
      "Big Data Scientist"
    ],
    keywords: [
      "data scientist", "data science", "manipal", "mahe",
      "btech", "b.tech", "karnataka", "india"
    ],
    reasons: [
      "Dedicated 4-year curriculum centered on algorithmic data science and predictive analytics",
      "High campus recruitment with major enterprise data science practices"
    ],
  },
  {
    title: "Master of Mathematics in Data Science (MMath)",
    college: "University of Waterloo",
    location: "Waterloo, Ontario, Canada",
    country: "Canada",
    duration: "2 years",
    fee: "$24,800 / yr",
    intake: "Sep 2026",
    score: 95,
    tag: "World Elite Track",
    type: "University",
    degree: "Master's",
    track: "#3 Data Scientist",
    roles: [
      "Data Scientist",
      "Quantitative Research Scientist",
      "AI Data Scientist"
    ],
    keywords: [
      "data scientist", "data science", "waterloo", "ontario",
      "canada", "mmath", "co-op", "masters"
    ],
    reasons: [
      "Taught jointly by the David R. Cheriton School of Computer Science & Department of Statistics",
      "Access to unmatched tech co-op network with top quantitative and scientific employers"
    ],
  },
  {
    title: "B.E. (B.Tech) in Computer Science (Data Science Specialization)",
    college: "BITS Pilani (Birla Institute of Technology & Science)",
    location: "Pilani, Rajasthan, India",
    country: "India",
    duration: "4 years",
    fee: "₹5,40,000 / yr",
    intake: "August 2026 (BITSAT)",
    score: 96,
    tag: "Top Private DS Track",
    type: "University",
    degree: "B.Tech",
    track: "#3 Data Scientist",
    roles: [
      "Data Scientist",
      "Quantitative Researcher",
      "AI & Data Engineer"
    ],
    keywords: [
      "data scientist", "data science", "bits", "bits pilani",
      "btech", "be", "b.tech", "india"
    ],
    reasons: [
      "Includes two Practice School (PS) semesters at premier corporate research centers",
      "Renowned peer group and elite tier-1 alumni representation in Silicon Valley and Bangalore"
    ],
  },

  // ========================================================
  // 4️⃣ CAREER TRACK: #4 SOFTWARE ENGINEER
  // ========================================================
  {
    title: "B.Tech in Computer Science and Engineering (CSE)",
    college: "IIT Bombay (Indian Institute of Technology)",
    location: "Mumbai, Maharashtra, India",
    country: "India",
    duration: "4 years",
    fee: "₹2,20,000 / yr",
    intake: "July 2026 (JEE Advanced)",
    score: 99,
    tag: "NIRF #1 Engineering",
    type: "University",
    degree: "B.Tech",
    track: "#4 Software Engineer",
    roles: [
      "Software Engineer",
      "Software Development Engineer (SDE)",
      "Systems Architect",
      "Core Backend Engineer"
    ],
    keywords: [
      "software engineer", "sde", "software development", "iit bombay",
      "btech", "b.tech", "cse", "coding", "india"
    ],
    reasons: [
      "India's undisputed #1 tech institution for producing world-class software engineers",
      "Top placements worldwide with international packages from Google, Microsoft, and Citadel"
    ],
  },
  {
    title: "B.Tech in Software Engineering",
    college: "Delhi Technological University (DTU, formerly DCE)",
    location: "New Delhi, India",
    country: "India",
    duration: "4 years",
    fee: "₹2,10,000 / yr",
    intake: "August 2026 (JAC Delhi)",
    score: 95,
    tag: "Premier Software Track",
    type: "University",
    degree: "B.Tech",
    track: "#4 Software Engineer",
    roles: [
      "Software Engineer",
      "Software Development Engineer (SDE)",
      "Full Stack Software Engineer"
    ],
    keywords: [
      "software engineer", "sde", "dtu", "dce", "delhi",
      "btech", "b.tech", "software engineering", "india"
    ],
    reasons: [
      "Dedicated Department of Software Engineering with deep focus on enterprise architectures",
      "Elite hiring record in Gurgaon and Noida software parks with high SDE packages"
    ],
  },
  {
    title: "Master of Mathematics in Computer Science (Software Systems)",
    college: "University of Waterloo",
    location: "Waterloo, Ontario, Canada",
    country: "Canada",
    duration: "2 years",
    fee: "$24,800 / yr",
    intake: "Sep 2026",
    score: 95,
    tag: "Silicon Valley North",
    type: "University",
    degree: "Master's",
    track: "#4 Software Engineer",
    roles: [
      "Software Engineer",
      "Distributed Systems Engineer",
      "Principal Software Developer"
    ],
    keywords: [
      "software engineer", "sde", "waterloo", "ontario",
      "canada", "mmath", "co-op", "masters"
    ],
    reasons: [
      "Ranked #1 in Canada for computer science and graduate employability",
      "World-class paid co-op internships across top North American tech giants"
    ],
  },
  {
    title: "Master of Applied Computing (MAC) - Software Engineering",
    college: "University of Windsor",
    location: "Windsor, Ontario, Canada",
    country: "Canada",
    duration: "16 months",
    fee: "$19,500 / yr",
    intake: "Jan 2027 / Sep 2026",
    score: 92,
    tag: "Paid Internship",
    type: "University",
    degree: "Master's",
    track: "#4 Software Engineer",
    roles: [
      "Software Engineer",
      "Software Development Engineer",
      "Enterprise Application Developer"
    ],
    keywords: [
      "software engineer", "sde", "windsor", "ontario",
      "canada", "mac", "masters", "internship"
    ],
    reasons: [
      "Includes a mandatory 4-to-8 month paid Canadian industry software development internship",
      "Proven visa approval track record with eligible 3-year PGWP upon graduation"
    ],
  },
  {
    title: "Fast-Track Software Engineering Technology (Optional Co-op)",
    college: "Centennial College",
    location: "Toronto, Ontario, Canada",
    country: "Canada",
    duration: "2 years",
    fee: "$16,500 / yr",
    intake: "Jan 2027",
    score: 87,
    tag: "Co-op Included",
    type: "College",
    degree: "Diploma",
    track: "#4 Software Engineer",
    roles: [
      "Software Engineer",
      "Junior Software Developer",
      "Application Support Engineer"
    ],
    keywords: [
      "software engineer", "centennial", "toronto", "ontario",
      "canada", "diploma", "co-op", "pgwp"
    ],
    reasons: [
      "Accredited CIPS technology curriculum preparing students for immediate software engineering jobs",
      "Affordable tuition with flexible installment options"
    ],
  },

  // ========================================================
  // 5️⃣ CAREER TRACK: #5 WEB DEVELOPER
  // ========================================================
  {
    title: "B.Tech in Computer Science and Engineering (Web Architecture & Systems)",
    college: "IIIT Hyderabad (International Institute of Information Technology)",
    location: "Hyderabad, Telangana, India",
    country: "India",
    duration: "4 years",
    fee: "₹4,00,000 / yr",
    intake: "July 2026 (JEE Main / UGEE)",
    score: 98,
    tag: "Top Coding & Web",
    type: "University",
    degree: "B.Tech",
    track: "#5 Web Developer",
    roles: [
      "Web Developer",
      "Full Stack Web Developer",
      "Frontend Architect",
      "Backend Web Engineer"
    ],
    keywords: [
      "web developer", "web development", "web dev", "full stack web",
      "iiit hyderabad", "btech", "b.tech", "coding", "india"
    ],
    reasons: [
      "Unrivaled reputation for full stack web development, competitive programming, and systems",
      "Host of specialized labs in Internet Technologies and Large-Scale Web Architecture"
    ],
  },
  {
    title: "B.Tech in CSE (Full Stack Web Development & Cloud Computing)",
    college: "VIT Vellore (Vellore Institute of Technology)",
    location: "Vellore, Tamil Nadu, India",
    country: "India",
    duration: "4 years",
    fee: "₹1,98,000 / yr",
    intake: "July 2026 (VITEEE)",
    score: 93,
    tag: "Full Stack Track",
    type: "University",
    degree: "B.Tech",
    track: "#5 Web Developer",
    roles: [
      "Web Developer",
      "Full Stack Developer",
      "Frontend Developer (React/Vue)",
      "Node.js Backend Developer"
    ],
    keywords: [
      "web developer", "web development", "web dev", "full stack",
      "vit", "vit vellore", "btech", "b.tech", "india"
    ],
    reasons: [
      "Project-centric coursework covering Modern JavaScript, React, Node.js, REST APIs, and Cloud",
      "High-volume hiring by major software product companies and digital development agencies"
    ],
  },
  {
    title: "Post-Degree Diploma in Web and Mobile Application Development",
    college: "Langara College",
    location: "Vancouver, British Columbia, Canada",
    country: "Canada",
    duration: "2 years",
    fee: "$18,400 / yr",
    intake: "Sep 2026",
    score: 91,
    tag: "Full Stack Web",
    type: "College",
    degree: "Post-Degree Diploma",
    track: "#5 Web Developer",
    roles: [
      "Web Developer",
      "Full Stack Web Developer",
      "Mobile Web Specialist"
    ],
    keywords: [
      "web developer", "web development", "web dev", "full stack",
      "langara", "vancouver", "canada", "diploma", "pgwp"
    ],
    reasons: [
      "Full 2-year practical degree qualifying for a 3-year PGWP open work permit in Canada",
      "Hands-on project work developing responsive web apps, TypeScript, and modern frontend stacks"
    ],
  },
  {
    title: "Graduate Certificate in Web Development & Cloud Solutions",
    college: "Humber College Institute of Technology",
    location: "Toronto, Ontario, Canada",
    country: "Canada",
    duration: "1 year",
    fee: "$17,600",
    intake: "Sep 2026",
    score: 92,
    tag: "Cloud & Web",
    type: "College",
    degree: "Graduate Certificate",
    track: "#5 Web Developer",
    roles: [
      "Web Developer",
      "Cloud Solutions Developer",
      "Full Stack Web Developer"
    ],
    keywords: [
      "web developer", "web development", "web dev", "full stack",
      "humber", "toronto", "ontario", "canada", "pgwp"
    ],
    reasons: [
      "Partnership with AWS Academy & Microsoft Azure for enterprise web deployment",
      "Excellent employment rate for international students across the Greater Toronto Area"
    ],
  },
  {
    title: "B.Tech in Information Technology (Web & Mobile Development)",
    college: "Manipal Institute of Technology (MAHE)",
    location: "Manipal, Karnataka, India",
    country: "India",
    duration: "4 years",
    fee: "₹3,85,000 / yr",
    intake: "July 2026 (MET)",
    score: 91,
    tag: "Web Track",
    type: "University",
    degree: "B.Tech",
    track: "#5 Web Developer",
    roles: [
      "Web Developer",
      "Full Stack Engineer",
      "Frontend UI Developer"
    ],
    keywords: [
      "web developer", "web development", "web dev", "full stack",
      "manipal", "mahe", "btech", "b.tech", "india"
    ],
    reasons: [
      "Intensive programming labs in web frameworks, microservices, and modern UX design",
      "Active student development clubs organizing national hackathons"
    ],
  },

  // ========================================================
  // 6️⃣ CAREER TRACK: #6 CYBER SECURITY ANALYST
  // ========================================================
  {
    title: "B.Tech in Computer Science & Information Security",
    college: "IIIT Delhi (Indraprastha Institute of Information Technology)",
    location: "Okhla, New Delhi, India",
    country: "India",
    duration: "4 years",
    fee: "₹4,50,000 / yr",
    intake: "July 2026 (JAC Delhi)",
    score: 96,
    tag: "Cybersecurity Leader",
    type: "University",
    degree: "B.Tech",
    track: "#6 Cyber Security Analyst",
    roles: [
      "Cyber Security Analyst",
      "Information Security Specialist",
      "Security Operations Analyst (SOC)",
      "Penetration Tester"
    ],
    keywords: [
      "cyber security analyst", "cybersecurity", "cyber security", "infosec",
      "iiit delhi", "delhi", "btech", "b.tech", "security analyst", "india"
    ],
    reasons: [
      "Home to premier research centers in Cybersecurity and Cryptographic Systems",
      "Curriculum covers Network Defense, Ethical Hacking, Reverse Engineering, and Cyber Forensics"
    ],
  },
  {
    title: "Post-Diploma Certificate in Cyber Security for IT",
    college: "Southern Alberta Institute of Technology (SAIT)",
    location: "Calgary, Alberta, Canada",
    country: "Canada",
    duration: "1 year",
    fee: "$16,200",
    intake: "Sep 2026",
    score: 92,
    tag: "Alberta Tech Pathway",
    type: "College",
    degree: "Post-Diploma Certificate",
    track: "#6 Cyber Security Analyst",
    roles: [
      "Cyber Security Analyst",
      "Network Security Specialist",
      "Incident Response Analyst"
    ],
    keywords: [
      "cyber security analyst", "cybersecurity", "cyber security", "sait",
      "calgary", "alberta", "canada", "aaip", "pgwp"
    ],
    reasons: [
      "Eligible for the Alberta Accelerated Tech Pathway (AAIP) for fast-tracked Canadian PR",
      "Live simulation labs focusing on Threat Intelligence and Incident Containment"
    ],
  },
  {
    title: "Postgraduate Certificate in Cybersecurity Assessment & Threat Management",
    college: "Sheridan College",
    location: "Oakville / Toronto, Canada",
    country: "Canada",
    duration: "1 year",
    fee: "$17,100",
    intake: "Sep 2026",
    score: 90,
    tag: "Security Operations",
    type: "College",
    degree: "Postgraduate Certificate",
    track: "#6 Cyber Security Analyst",
    roles: [
      "Cyber Security Analyst",
      "SOC Analyst",
      "Vulnerability Assessment Specialist"
    ],
    keywords: [
      "cyber security analyst", "cybersecurity", "cyber security", "sheridan",
      "oakville", "toronto", "ontario", "canada", "pgwp"
    ],
    reasons: [
      "Dedicated Center for Mobile Innovation with live Security Operations Center (SOC) labs",
      "Direct employer links across Toronto's major banking, financial, and healthcare networks"
    ],
  },
  {
    title: "B.Tech in Computer Science & Engineering (Cyber Security & Forensics)",
    college: "SRM Institute of Science and Technology (SRM IST)",
    location: "Chennai, Tamil Nadu, India",
    country: "India",
    duration: "4 years",
    fee: "₹3,00,000 / yr",
    intake: "July 2026 (SRMJEEE)",
    score: 89,
    tag: "Forensics Track",
    type: "University",
    degree: "B.Tech",
    track: "#6 Cyber Security Analyst",
    roles: [
      "Cyber Security Analyst",
      "Digital Forensics Examiner",
      "Application Security Engineer"
    ],
    keywords: [
      "cyber security analyst", "cybersecurity", "cyber security", "srm",
      "srm university", "chennai", "btech", "b.tech", "india"
    ],
    reasons: [
      "Hands-on vulnerability testing labs with industry certification alignments (CEH, CompTIA)",
      "High recruiter demand from IT consulting and managed security services providers (MSSPs)"
    ],
  },
];

const FILTER_TABS = [
  "All",
  "#1 AI/ML Engineer",
  "#2 Data Analyst",
  "#3 Data Scientist",
  "#4 Software Engineer",
  "#5 Web Developer",
  "#6 Cyber Security Analyst",
  "🇮🇳 Indian Universities (B.Tech)",
  "🇨🇦 Canadian Universities"
];

const STOP_WORDS = new Set([
  "role", "roles", "degree", "degrees", "program", "programs", "course", "courses", "job", "jobs"
]);

// Smart search normalizer to handle common typos, abbreviations, and phrasing
function normalizeQuery(str) {
  return str
    .toLowerCase()
    .replace(/b\.?tech\b/gi, "btech")
    .replace(/\bdevlopment\b/gi, "development")
    .replace(/\bweb\s*dev\b/gi, "web development")
    .replace(/\baiml\b/gi, "ai/ml")
    .replace(/\bcyber\s*security\b/gi, "cybersecurity")
    .trim();
}

function matchProgram(program, search) {
  if (!search.trim()) return true;

  const normalizedSearch = normalizeQuery(search);
  const rawTokens = normalizedSearch.split(/\s+/).filter(Boolean);
  const informativeTokens = rawTokens.filter((t) => !STOP_WORDS.has(t));
  const searchTokens = informativeTokens.length > 0 ? informativeTokens : rawTokens;

  const corpus = [
    program.title,
    program.college,
    program.location,
    program.country,
    program.degree,
    program.degree ? `${program.degree} degree` : "",
    program.type,
    program.track,
    "role roles job jobs career",
    ...(program.roles || []),
    ...(program.reasons || []),
    ...(program.keywords || [])
  ]
    .join(" ")
    .toLowerCase()
    .replace(/b\.?tech\b/gi, "btech")
    .replace(/\bdevlopment\b/gi, "development")
    .replace(/\bcyber\s*security\b/gi, "cybersecurity");

  // Every token in the search term must match somewhere in the program's data
  return searchTokens.every((token) => corpus.includes(token));
}

function Programs({ setSelectedPage }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPrograms = allPrograms.filter((program) => {
    const matchesSearch = matchProgram(program, search);
    if (!matchesSearch) return false;

    if (activeTab === "#1 AI/ML Engineer") return program.track === "#1 AI/ML Engineer";
    if (activeTab === "#2 Data Analyst") return program.track === "#2 Data Analyst";
    if (activeTab === "#3 Data Scientist") return program.track === "#3 Data Scientist";
    if (activeTab === "#4 Software Engineer") return program.track === "#4 Software Engineer";
    if (activeTab === "#5 Web Developer") return program.track === "#5 Web Developer";
    if (activeTab === "#6 Cyber Security Analyst") return program.track === "#6 Cyber Security Analyst";

    if (activeTab === "🇮🇳 Indian Universities (B.Tech)") {
      return program.country === "India" && (program.degree === "B.Tech" || program.title.includes("B.Tech"));
    }
    if (activeTab === "🇨🇦 Canadian Universities") {
      return program.country === "Canada";
    }

    return true;
  });

  const visiblePrograms = filteredPrograms.slice(0, visibleCount);

  return (
    <div className="programs-page">

      {/* TOP NAV BAR */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setSelectedPage && setSelectedPage("Welcome")}
            style={{ background: "#101a32", color: "#8fa3c5", border: "1px solid #263958", padding: "8px 14px", borderRadius: "10px", cursor: "pointer", fontSize: "13px" }}
          >
            ← Back to Welcome
          </button>
          <button
            onClick={() => setSelectedPage && setSelectedPage("Home")}
            style={{ background: "#1b2b45", color: "white", border: "1px solid #263958", padding: "8px 14px", borderRadius: "10px", cursor: "pointer", fontSize: "13px" }}
          >
            Dashboard
          </button>
        </div>
        <span style={{ color: "#38bdf8", fontSize: "13px", fontWeight: "600" }}>
          ✦ Career Tracks (#1 – #6)
        </span>
      </div>

      {/* HEADER */}
      <div className="programs-heading">
        <h1>Explore Programs by Career Track</h1>
        <p>Curated programs for the top 6 tech careers across Indian universities &amp; Canadian institutions</p>
      </div>

      {/* SEARCH ROW */}
      <div className="program-search-row">
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search roles like 'AI/ML Engineer', 'Web Developer', 'Cyber Security', 'BTech'..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(6);
            }}
          />
        </div>

        <button
          className="filter-btn"
          title="Clear search"
          onClick={() => {
            setSearch("");
            setActiveTab("All");
          }}
        >
          ↺
        </button>
      </div>

      {/* FILTER PILLS */}
      <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "20px" }}>
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setVisibleCount(6);
            }}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: activeTab === tab ? "1px solid #00d7d0" : "1px solid #243758",
              background: activeTab === tab ? "#0e344d" : "#121d34",
              color: activeTab === tab ? "#00d7d0" : "#8fa3c5",
              fontSize: "13px",
              fontWeight: activeTab === tab ? "600" : "400",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "0.2s"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* SEARCH SUMMARY INFO */}
      <div className="ai-matched-box">
        <div className="ai-icon">✦</div>

        <div>
          <h3>{filteredPrograms.length} Programs Matched</h3>
          <p>
            {search.trim()
              ? `Showing results matching "${search}" in ${activeTab}.`
              : `Browsing ${activeTab === "All" ? "all 6 core technology career tracks" : activeTab}.`}
          </p>
        </div>
      </div>

      {/* PROGRAM CARDS */}
      <div className="program-list">

        {visiblePrograms.map((program, index) => (
          <div className="program-card" key={index}>

            <div className="program-top">
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  {/* TRACK PILL */}
                  <span style={{
                    background: "#083344",
                    color: "#06b6d4",
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    border: "1px solid #0e7490"
                  }}>
                    {program.track}
                  </span>

                  {/* COUNTRY / DEGREE BADGE */}
                  <span style={{
                    background: program.country === "India" ? "#143a25" : "#1e2a52",
                    color: program.country === "India" ? "#4ade80" : "#6cb2eb",
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "3px 8px",
                    borderRadius: "6px"
                  }}>
                    {program.country === "India" ? "🇮🇳 " + program.degree : "🇨🇦 " + program.degree}
                  </span>

                  <span className="program-tag">{program.tag}</span>
                </div>

                <h2>{program.title}</h2>
                <p className="college" style={{ color: "#5ce1e6", fontWeight: "600", marginTop: "2px" }}>
                  {program.college}
                </p>
              </div>
            </div>

            <div className="program-info">

              <div>
                <span>⌖</span>
                {program.location}
              </div>

              <div>
                <span>◷</span>
                {program.duration}
              </div>

              <div>
                <span>$</span>
                {program.fee}
              </div>

              <div>
                <span>♙</span>
                {program.intake}
              </div>

            </div>

            {/* CAREER ROLES TAGS */}
            {program.roles && program.roles.length > 0 && (
              <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "12px", color: "#8fa3c5" }}>Target Roles:</span>
                {program.roles.map((role, rIdx) => (
                  <span
                    key={rIdx}
                    style={{
                      background: "#182a47",
                      color: "#38bdf8",
                      fontSize: "11px",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      border: "1px solid #233a60"
                    }}
                  >
                    {role}
                  </span>
                ))}
              </div>
            )}

            <div className="program-score-row" style={{ marginTop: "14px" }}>
              <span>AI Match Score</span>

              <div className="score-right">
                <div className="score-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${program.score}%` }}
                  ></div>
                </div>

                <strong>{program.score}%</strong>
              </div>
            </div>

            <div className="program-reasons">
              {program.reasons.map((reason, i) => (
                <p key={i}>
                  <span>•</span> {reason}
                </p>
              ))}
            </div>

            <button
              className="view-program-btn"
              onClick={() => setSelectedPage && setSelectedPage("Apply")}
            >
              Start Application →
            </button>

          </div>
        ))}

      </div>

      {/* LOAD MORE */}
      {visibleCount < filteredPrograms.length && (
        <button
          className="load-more-btn"
          onClick={() => setVisibleCount((prev) => prev + 6)}
        >
          Load More ({filteredPrograms.length - visibleCount} remaining)
        </button>
      )}

      {filteredPrograms.length === 0 && (
        <div className="no-results" style={{ textAlign: "center", padding: "40px", color: "#8fa3c5" }}>
          No programs found matching "{search}". Try searching one of the 6 roles (e.g. "AI/ML", "Data Analyst", "Cyber Security") or click ↺.
        </div>
      )}

    </div>
  );
}

export default Programs;