from typing import List, Optional
import re
from backend.models import ProgramItem

ALL_PROGRAMS = [
    # ========================================================
    # 1️⃣ CAREER TRACK: #1 AI/ML ENGINEER
    # ========================================================
    ProgramItem(
        title="B.Tech in Artificial Intelligence (AI & ML Systems)",
        college="IIT Hyderabad (Indian Institute of Technology)",
        location="Hyderabad, Telangana, India",
        country="India",
        duration="4 years",
        fee="₹2,25,000 / yr",
        intake="July 2026 (JEE Advanced)",
        score=98,
        tag="Premier AI Program",
        degree="B.Tech",
        track="#1 AI/ML Engineer",
        roles=[
            "AI/ML Engineer",
            "Machine Learning Engineer",
            "Deep Learning Scientist",
            "AI Systems Engineer"
        ],
        keywords=[
            "ai/ml engineer", "aiml", "ai ml", "machine learning engineer",
            "artificial intelligence", "deep learning", "iit hyderabad", "btech", "india"
        ],
        reasons=[
            "First dedicated Department of Artificial Intelligence among all IITs in India",
            "Comprehensive curriculum in Deep Neural Networks, Computer Vision, and Generative AI"
        ]
    ),
    ProgramItem(
        title="Master of Science in Applied Computing (MScAC) - Artificial Intelligence",
        college="University of Toronto (St. George)",
        location="Toronto, Ontario, Canada",
        country="Canada",
        duration="16 months",
        fee="$34,000 / yr",
        intake="Sep 2026",
        score=97,
        tag="Global AI Hub",
        degree="Master's",
        track="#1 AI/ML Engineer",
        roles=[
            "AI/ML Engineer",
            "Machine Learning Research Engineer",
            "AI Solutions Architect"
        ],
        keywords=[
            "ai/ml engineer", "ai ml", "machine learning", "artificial intelligence",
            "toronto", "canada", "vector institute", "masters"
        ],
        reasons=[
            "Direct partnership with the world-famous Vector Institute for Artificial Intelligence",
            "Includes an 8-month paid applied research internship at top AI tech labs"
        ]
    ),
    ProgramItem(
        title="B.Tech in CSE (Artificial Intelligence & Machine Learning)",
        college="VIT Vellore (Vellore Institute of Technology)",
        location="Vellore, Tamil Nadu, India",
        country="India",
        duration="4 years",
        fee="₹1,98,000 / yr",
        intake="July 2026 (VITEEE)",
        score=93,
        tag="Top Private AI Track",
        degree="B.Tech",
        track="#1 AI/ML Engineer",
        roles=[
            "AI/ML Engineer",
            "Applied ML Developer",
            "Data & ML Pipeline Specialist"
        ],
        keywords=[
            "ai/ml engineer", "aiml", "ai ml", "machine learning engineer",
            "vit", "vit vellore", "btech", "b.tech", "india"
        ],
        reasons=[
            "Specialized AI/ML labs with GPU clusters for training enterprise machine learning models",
            "Strong campus recruitment from top product firms hiring entry-level ML engineers"
        ]
    ),
    ProgramItem(
        title="Applied Artificial Intelligence and Machine Learning",
        college="Conestoga College (Waterloo Tech Hub)",
        location="Waterloo, Ontario, Canada",
        country="Canada",
        duration="1 year",
        fee="$16,800",
        intake="Sep 2026",
        score=90,
        tag="Industry AI Track",
        degree="Postgraduate Certificate",
        track="#1 AI/ML Engineer",
        roles=[
            "AI/ML Engineer",
            "MLOps Specialist",
            "AI Application Developer"
        ],
        keywords=[
            "ai/ml engineer", "ai ml", "machine learning engineer", "conestoga",
            "waterloo", "canada", "postgraduate", "pgwp"
        ],
        reasons=[
            "Located in the heart of Canada's Waterloo high-tech innovation corridor",
            "Focus on practical MLOps, deployment of LLMs, and real-world computer vision"
        ]
    ),

    # ========================================================
    # 2️⃣ CAREER TRACK: #2 DATA ANALYST
    # ========================================================
    ProgramItem(
        title="B.S. in Data Science and Applications (Analytics Track)",
        college="IIT Madras (Indian Institute of Technology)",
        location="Chennai, Tamil Nadu, India",
        country="India",
        duration="4 years",
        fee="₹1,00,000 / yr",
        intake="May & Sep 2026",
        score=96,
        tag="NIRF #1 Pioneer",
        degree="B.S. Degree",
        track="#2 Data Analyst",
        roles=[
            "Data Analyst",
            "Business Intelligence Analyst",
            "Quantitative Analyst",
            "Data Visualization Specialist"
        ],
        keywords=[
            "data analyst", "data analytics", "business intelligence", "sql",
            "python", "tableau", "power bi", "iit madras", "bs degree", "india"
        ],
        reasons=[
            "Designed and delivered by premier IIT Madras computer science & statistics faculty",
            "Extensive training in SQL, Excel Modeling, Python Analytics, and Power BI dashboards"
        ]
    ),
    ProgramItem(
        title="Postgraduate Certificate in Big Data Analytics & Visualization",
        college="Seneca Polytechnic",
        location="Toronto, Ontario, Canada",
        country="Canada",
        duration="1 year",
        fee="$17,250",
        intake="Sep 2026",
        score=93,
        tag="Hands-on Analytics",
        degree="Postgraduate Certificate",
        track="#2 Data Analyst",
        roles=[
            "Data Analyst",
            "Business Intelligence (BI) Analyst",
            "Marketing & Financial Analyst"
        ],
        keywords=[
            "data analyst", "data analytics", "big data", "bi analyst",
            "seneca", "toronto", "canada", "pgwp"
        ],
        reasons=[
            "Hands-on lab curriculum covering modern enterprise data pipelines and Tableau",
            "Direct pathway for up to a 3-year Canadian Post-Graduation Work Permit (PGWP)"
        ]
    ),
    ProgramItem(
        title="B.Tech in Computer Science (Data Analytics & Business Systems)",
        college="NSUT Delhi (Netaji Subhas University of Technology)",
        location="Dwarka, New Delhi, India",
        country="India",
        duration="4 years",
        fee="₹2,19,000 / yr",
        intake="August 2026 (JAC Delhi)",
        score=94,
        tag="High Corporate Demand",
        degree="B.Tech",
        track="#2 Data Analyst",
        roles=[
            "Data Analyst",
            "Analytics Consultant",
            "Product Data Analyst"
        ],
        keywords=[
            "data analyst", "data analytics", "nsut", "nsit", "delhi",
            "btech", "b.tech", "business analytics", "india"
        ],
        reasons=[
            "Elite Delhi institution with heavy on-campus recruitment from McKinsey, BCG, and analytics MNCs",
            "Strong grounding in database management, statistical modeling, and data reporting"
        ]
    ),
    ProgramItem(
        title="Post-Degree Diploma in Data Analytics",
        college="Langara College",
        location="Vancouver, British Columbia, Canada",
        country="Canada",
        duration="2 years",
        fee="$18,400 / yr",
        intake="Sep 2026",
        score=90,
        tag="3-Year PGWP Eligible",
        degree="Post-Degree Diploma",
        track="#2 Data Analyst",
        roles=[
            "Data Analyst",
            "Operations Data Analyst",
            "Reporting & Insights Specialist"
        ],
        keywords=[
            "data analyst", "data analytics", "langara", "vancouver",
            "british columbia", "canada", "diploma", "pgwp"
        ],
        reasons=[
            "Full 2-year credential qualifying students for a 3-year Canadian PGWP open work permit",
            "High regional demand across Vancouver commercial banks and tech startups"
        ]
    ),

    # ========================================================
    # 3️⃣ CAREER TRACK: #3 DATA SCIENTIST
    # ========================================================
    ProgramItem(
        title="Master of Data Science (MDS)",
        college="University of British Columbia (Vancouver)",
        location="Vancouver, British Columbia, Canada",
        country="Canada",
        duration="10 months",
        fee="$35,400",
        intake="Sep 2026",
        score=96,
        tag="Top Data Science",
        degree="Master's",
        track="#3 Data Scientist",
        roles=[
            "Data Scientist",
            "Machine Learning Scientist",
            "Statistical Data Scientist"
        ],
        keywords=[
            "data scientist", "data science", "mds", "ubc",
            "vancouver", "canada", "masters", "bc pnp"
        ],
        reasons=[
            "Accelerated intensive program with direct alignment for BC PNP Tech nomination",
            "Advanced coursework in probabilistic modeling, statistical inference, and deep data science"
        ]
    ),
    ProgramItem(
        title="B.Tech in Data Science and Engineering",
        college="Manipal Institute of Technology (MAHE)",
        location="Manipal, Karnataka, India",
        country="India",
        duration="4 years",
        fee="₹3,85,000 / yr",
        intake="July 2026 (MET)",
        score=92,
        tag="Dedicated DS Degree",
        degree="B.Tech",
        track="#3 Data Scientist",
        roles=[
            "Data Scientist",
            "Machine Learning Engineer",
            "Big Data Scientist"
        ],
        keywords=[
            "data scientist", "data science", "manipal", "mahe",
            "btech", "b.tech", "karnataka", "india"
        ],
        reasons=[
            "Dedicated 4-year curriculum centered on algorithmic data science and predictive analytics",
            "High campus recruitment with major enterprise data science practices"
        ]
    ),
    ProgramItem(
        title="Master of Mathematics in Data Science (MMath)",
        college="University of Waterloo",
        location="Waterloo, Ontario, Canada",
        country="Canada",
        duration="2 years",
        fee="$24,800 / yr",
        intake="Sep 2026",
        score=95,
        tag="World Elite Track",
        degree="Master's",
        track="#3 Data Scientist",
        roles=[
            "Data Scientist",
            "Quantitative Research Scientist",
            "AI Data Scientist"
        ],
        keywords=[
            "data scientist", "data science", "waterloo", "ontario",
            "canada", "mmath", "co-op", "masters"
        ],
        reasons=[
            "Taught jointly by the David R. Cheriton School of Computer Science & Department of Statistics",
            "Access to unmatched tech co-op network with top quantitative and scientific employers"
        ]
    ),
    ProgramItem(
        title="B.E. (B.Tech) in Computer Science (Data Science Specialization)",
        college="BITS Pilani (Birla Institute of Technology & Science)",
        location="Pilani, Rajasthan, India",
        country="India",
        duration="4 years",
        fee="₹5,40,000 / yr",
        intake="August 2026 (BITSAT)",
        score=96,
        tag="Top Private DS Track",
        degree="B.Tech",
        track="#3 Data Scientist",
        roles=[
            "Data Scientist",
            "Quantitative Researcher",
            "AI & Data Engineer"
        ],
        keywords=[
            "data scientist", "data science", "bits", "bits pilani",
            "btech", "be", "b.tech", "india"
        ],
        reasons=[
            "Includes two Practice School (PS) semesters at premier corporate research centers",
            "Renowned peer group and elite tier-1 alumni representation in Silicon Valley and Bangalore"
        ]
    ),

    # ========================================================
    # 4️⃣ CAREER TRACK: #4 SOFTWARE ENGINEER
    # ========================================================
    ProgramItem(
        title="B.Tech in Computer Science and Engineering (CSE)",
        college="IIT Bombay (Indian Institute of Technology)",
        location="Mumbai, Maharashtra, India",
        country="India",
        duration="4 years",
        fee="₹2,20,000 / yr",
        intake="July 2026 (JEE Advanced)",
        score=99,
        tag="NIRF #1 Engineering",
        degree="B.Tech",
        track="#4 Software Engineer",
        roles=[
            "Software Engineer",
            "Software Development Engineer (SDE)",
            "Systems Architect",
            "Core Backend Engineer"
        ],
        keywords=[
            "software engineer", "sde", "software development", "iit bombay",
            "btech", "b.tech", "cse", "coding", "india"
        ],
        reasons=[
            "India's undisputed #1 tech institution for producing world-class software engineers",
            "Top placements worldwide with international packages from Google, Microsoft, and Citadel"
        ]
    ),
    ProgramItem(
        title="B.Tech in Software Engineering",
        college="Delhi Technological University (DTU, formerly DCE)",
        location="New Delhi, India",
        country="India",
        duration="4 years",
        fee="₹2,10,000 / yr",
        intake="August 2026 (JAC Delhi)",
        score=95,
        tag="Premier Software Track",
        degree="B.Tech",
        track="#4 Software Engineer",
        roles=[
            "Software Engineer",
            "Software Development Engineer (SDE)",
            "Full Stack Software Engineer"
        ],
        keywords=[
            "software engineer", "sde", "dtu", "dce", "delhi",
            "btech", "b.tech", "software engineering", "india"
        ],
        reasons=[
            "Dedicated Department of Software Engineering with deep focus on enterprise architectures",
            "Elite hiring record in Gurgaon and Noida software parks with high SDE packages"
        ]
    ),
    ProgramItem(
        title="Master of Mathematics in Computer Science (Software Systems)",
        college="University of Waterloo",
        location="Waterloo, Ontario, Canada",
        country="Canada",
        duration="2 years",
        fee="$24,800 / yr",
        intake="Sep 2026",
        score=95,
        tag="Silicon Valley North",
        degree="Master's",
        track="#4 Software Engineer",
        roles=[
            "Software Engineer",
            "Distributed Systems Engineer",
            "Principal Software Developer"
        ],
        keywords=[
            "software engineer", "sde", "waterloo", "ontario",
            "canada", "mmath", "co-op", "masters"
        ],
        reasons=[
            "Ranked #1 in Canada for computer science and graduate employability",
            "World-class paid co-op internships across top North American tech giants"
        ]
    ),
    ProgramItem(
        title="Master of Applied Computing (MAC) - Software Engineering",
        college="University of Windsor",
        location="Windsor, Ontario, Canada",
        country="Canada",
        duration="16 months",
        fee="$19,500 / yr",
        intake="Jan 2027 / Sep 2026",
        score=92,
        tag="Paid Internship",
        degree="Master's",
        track="#4 Software Engineer",
        roles=[
            "Software Engineer",
            "Software Development Engineer",
            "Enterprise Application Developer"
        ],
        keywords=[
            "software engineer", "sde", "windsor", "ontario",
            "canada", "mac", "masters", "internship"
        ],
        reasons=[
            "Includes a mandatory 4-to-8 month paid Canadian industry software development internship",
            "Proven visa approval track record with eligible 3-year PGWP upon graduation"
        ]
    ),

    # ========================================================
    # 5️⃣ CAREER TRACK: #5 WEB DEVELOPER
    # ========================================================
    ProgramItem(
        title="B.Tech in Computer Science and Engineering (Web Architecture & Systems)",
        college="IIIT Hyderabad (International Institute of Information Technology)",
        location="Hyderabad, Telangana, India",
        country="India",
        duration="4 years",
        fee="₹4,00,000 / yr",
        intake="July 2026 (JEE Main / UGEE)",
        score=98,
        tag="Top Coding & Web",
        degree="B.Tech",
        track="#5 Web Developer",
        roles=[
            "Web Developer",
            "Full Stack Web Developer",
            "Frontend Architect",
            "Backend Web Engineer"
        ],
        keywords=[
            "web developer", "web development", "web dev", "full stack web",
            "iiit hyderabad", "btech", "b.tech", "coding", "india"
        ],
        reasons=[
            "Unrivaled reputation for full stack web development, competitive programming, and systems",
            "Host of specialized labs in Internet Technologies and Large-Scale Web Architecture"
        ]
    ),
    ProgramItem(
        title="B.Tech in CSE (Full Stack Web Development & Cloud Computing)",
        college="VIT Vellore (Vellore Institute of Technology)",
        location="Vellore, Tamil Nadu, India",
        country="India",
        duration="4 years",
        fee="₹1,98,000 / yr",
        intake="July 2026 (VITEEE)",
        score=93,
        tag="Full Stack Track",
        degree="B.Tech",
        track="#5 Web Developer",
        roles=[
            "Web Developer",
            "Full Stack Developer",
            "Frontend Developer (React/Vue)",
            "Node.js Backend Developer"
        ],
        keywords=[
            "web developer", "web development", "web dev", "full stack",
            "vit", "vit vellore", "btech", "b.tech", "india"
        ],
        reasons=[
            "Project-centric coursework covering Modern JavaScript, React, Node.js, REST APIs, and Cloud",
            "High-volume hiring by major software product companies and digital development agencies"
        ]
    ),
    ProgramItem(
        title="Post-Degree Diploma in Web and Mobile Application Development",
        college="Langara College",
        location="Vancouver, British Columbia, Canada",
        country="Canada",
        duration="2 years",
        fee="$18,400 / yr",
        intake="Sep 2026",
        score=91,
        tag="Full Stack Web",
        degree="Post-Degree Diploma",
        track="#5 Web Developer",
        roles=[
            "Web Developer",
            "Full Stack Web Developer",
            "Mobile Web Specialist"
        ],
        keywords=[
            "web developer", "web development", "web dev", "full stack",
            "langara", "vancouver", "canada", "diploma", "pgwp"
        ],
        reasons=[
            "Full 2-year practical degree qualifying for a 3-year PGWP open work permit in Canada",
            "Hands-on project work developing responsive web apps, TypeScript, and modern frontend stacks"
        ]
    ),
    ProgramItem(
        title="Graduate Certificate in Web Development & Cloud Solutions",
        college="Humber College Institute of Technology",
        location="Toronto, Ontario, Canada",
        country="Canada",
        duration="1 year",
        fee="$17,600",
        intake="Sep 2026",
        score=92,
        tag="Cloud & Web",
        degree="Graduate Certificate",
        track="#5 Web Developer",
        roles=[
            "Web Developer",
            "Cloud Solutions Developer",
            "Full Stack Web Developer"
        ],
        keywords=[
            "web developer", "web development", "web dev", "full stack",
            "humber", "toronto", "ontario", "canada", "pgwp"
        ],
        reasons=[
            "Partnership with AWS Academy & Microsoft Azure for enterprise web deployment",
            "Excellent employment rate for international students across the Greater Toronto Area"
        ]
    ),

    # ========================================================
    # 6️⃣ CAREER TRACK: #6 CYBER SECURITY ANALYST
    # ========================================================
    ProgramItem(
        title="B.Tech in Computer Science & Information Security",
        college="IIIT Delhi (Indraprastha Institute of Information Technology)",
        location="Okhla, New Delhi, India",
        country="India",
        duration="4 years",
        fee="₹4,50,000 / yr",
        intake="July 2026 (JAC Delhi)",
        score=96,
        tag="Cybersecurity Leader",
        degree="B.Tech",
        track="#6 Cyber Security Analyst",
        roles=[
            "Cyber Security Analyst",
            "Information Security Specialist",
            "Security Operations Analyst (SOC)",
            "Penetration Tester"
        ],
        keywords=[
            "cyber security analyst", "cybersecurity", "cyber security", "infosec",
            "iiit delhi", "delhi", "btech", "b.tech", "security analyst", "india"
        ],
        reasons=[
            "Home to premier research centers in Cybersecurity and Cryptographic Systems",
            "Curriculum covers Network Defense, Ethical Hacking, Reverse Engineering, and Cyber Forensics"
        ]
    ),
    ProgramItem(
        title="Post-Diploma Certificate in Cyber Security for IT",
        college="Southern Alberta Institute of Technology (SAIT)",
        location="Calgary, Alberta, Canada",
        country="Canada",
        duration="1 year",
        fee="$16,200",
        intake="Sep 2026",
        score=92,
        tag="Alberta Tech Pathway",
        degree="Post-Diploma Certificate",
        track="#6 Cyber Security Analyst",
        roles=[
            "Cyber Security Analyst",
            "Network Security Specialist",
            "Incident Response Analyst"
        ],
        keywords=[
            "cyber security analyst", "cybersecurity", "cyber security", "sait",
            "calgary", "alberta", "canada", "aaip", "pgwp"
        ],
        reasons=[
            "Eligible for the Alberta Accelerated Tech Pathway (AAIP) for fast-tracked Canadian PR",
            "Live simulation labs focusing on Threat Intelligence and Incident Containment"
        ]
    ),
    ProgramItem(
        title="Postgraduate Certificate in Cybersecurity Assessment & Threat Management",
        college="Sheridan College",
        location="Oakville / Toronto, Canada",
        country="Canada",
        duration="1 year",
        fee="$17,100",
        intake="Sep 2026",
        score=90,
        tag="Security Operations",
        degree="Postgraduate Certificate",
        track="#6 Cyber Security Analyst",
        roles=[
            "Cyber Security Analyst",
            "SOC Analyst",
            "Vulnerability Assessment Specialist"
        ],
        keywords=[
            "cyber security analyst", "cybersecurity", "cyber security", "sheridan",
            "oakville", "toronto", "ontario", "canada", "pgwp"
        ],
        reasons=[
            "Dedicated Center for Mobile Innovation with live Security Operations Center (SOC) labs",
            "Direct employer links across Toronto's major banking, financial, and healthcare networks"
        ]
    ),
    ProgramItem(
        title="B.Tech in Computer Science & Engineering (Cyber Security & Forensics)",
        college="SRM Institute of Science and Technology (SRM IST)",
        location="Chennai, Tamil Nadu, India",
        country="India",
        duration="4 years",
        fee="₹3,00,000 / yr",
        intake="July 2026 (SRMJEEE)",
        score=89,
        tag="Forensics Track",
        degree="B.Tech",
        track="#6 Cyber Security Analyst",
        roles=[
            "Cyber Security Analyst",
            "Digital Forensics Examiner",
            "Application Security Engineer"
        ],
        keywords=[
            "cyber security analyst", "cybersecurity", "cyber security", "srm",
            "srm university", "chennai", "btech", "b.tech", "india"
        ],
        reasons=[
            "Hands-on vulnerability testing labs with industry certification alignments (CEH, CompTIA)",
            "High recruiter demand from IT consulting and managed security services providers (MSSPs)"
        ]
    ),
]


STOP_WORDS = {
    "role", "roles", "degree", "degrees", "program", "programs", "course", "courses", "job", "jobs"
}


def normalize_query(str_val: str) -> str:
    cleaned = str_val.lower()
    cleaned = re.sub(r"\bb\.?tech\b", "btech", cleaned)
    cleaned = re.sub(r"\bdevlopment\b", "development", cleaned)
    cleaned = re.sub(r"\bweb\s*dev\b", "web development", cleaned)
    cleaned = re.sub(r"\baiml\b", "ai/ml", cleaned)
    cleaned = re.sub(r"\bcyber\s*security\b", "cybersecurity", cleaned)
    return cleaned.strip()


def get_programs(
    query: Optional[str] = None,
    province: Optional[str] = None,
    country: Optional[str] = None,
    track: Optional[str] = None
) -> List[ProgramItem]:
    results = ALL_PROGRAMS

    if track and isinstance(track, str):
        t_low = track.lower()
        results = [p for p in results if p.track and t_low in p.track.lower()]

    if country and isinstance(country, str):
        c_low = country.lower()
        results = [p for p in results if p.country and c_low in p.country.lower()]

    if province and isinstance(province, str):
        prov = province.lower()
        results = [p for p in results if prov in p.location.lower()]

    if query and isinstance(query, str):
        norm_query = normalize_query(query)
        raw_tokens = [t for t in norm_query.split() if t]
        informative_tokens = [t for t in raw_tokens if t not in STOP_WORDS]
        tokens = informative_tokens if informative_tokens else raw_tokens

        matched_results = []
        for p in results:
            degree_str = f"{p.degree} degree" if p.degree else ""
            corpus_parts = [
                p.title,
                p.college,
                p.location,
                p.country or "",
                p.degree or "",
                degree_str,
                p.tag or "",
                p.track or "",
                "role roles job jobs career",
                " ".join(p.roles or []),
                " ".join(p.reasons or []),
                " ".join(p.keywords or [])
            ]
            corpus = " ".join(corpus_parts).lower()
            corpus = re.sub(r"\bb\.?tech\b", "btech", corpus)
            corpus = re.sub(r"\bdevlopment\b", "development", corpus)
            corpus = re.sub(r"\bcyber\s*security\b", "cybersecurity", corpus)

            if all(t in corpus for t in tokens):
                matched_results.append(p)

        results = matched_results

    return results
