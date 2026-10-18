import os
import json
import urllib.request
import urllib.error
from typing import Dict, Any, Tuple, List, Optional
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

DEFAULT_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")


def get_gemini_api_key(client_key: Optional[str] = None) -> Optional[str]:
    """Retrieve Gemini API key from request, environment, or .env file."""
    if client_key and client_key.strip():
        return client_key.strip()
    return os.getenv("GEMINI_API_KEY")


def build_system_prompt(profile: Optional[Dict[str, Any]] = None) -> str:
    profile = profile or {}
    full_name = profile.get("fullName", "Student")
    highest_qual = profile.get("highestQualification", "Bachelor's")
    field = profile.get("fieldOfStudy", "Computer Science")
    cgpa = profile.get("cgpa", "8.4")
    overall_ielts = profile.get("ieltsOverall", "7.0")
    ielts_l = profile.get("ieltsListening", "7.5")
    ielts_r = profile.get("ieltsReading", "7.0")
    ielts_w = profile.get("ieltsWriting", "6.5")
    ielts_s = profile.get("ieltsSpeaking", "7.0")
    budget = profile.get("availableBudget", "35000")
    nationality = profile.get("nationality", "Indian")
    work_exp = profile.get("workExperience", "1–2 years")

    return f"""You are Arvian AI, the premier intelligent educational pathway & admissions copilot for students pursuing top Indian technology institutions (IITs, IIITs, BITS) and Canadian Designated Learning Institutions (U of T, Waterloo, UBC, Humber, Seneca, Langara, SAIT).

STUDENT PROFILE CONTEXT:
- Candidate Name: {full_name}
- Nationality: {nationality}
- Highest Qualification: {highest_qual} in {field}
- Academic Performance: {cgpa} CGPA
- Language Band: IELTS Overall {overall_ielts} (L: {ielts_l}, R: {ielts_r}, W: {ielts_w}, S: {ielts_s})
- Available Tuition & Living Budget: ${budget} CAD
- Work Experience: {work_exp}

CORE RESPONSIBILITIES:
1. Career Tracks: Provide expert advice across the top 6 tech tracks (#1 AI/ML Engineer, #2 Data Analyst, #3 Data Scientist, #4 Software Engineer, #5 Web Developer, #6 Cyber Security Analyst).
2. Application Strategy: Guide students on Statement of Purpose (SOP) structures, official transcripts, WES credential evaluation, and Canadian-style resume/CV standards.
3. Financial Proof: Clarify the IRCC living cost requirement ($20,635 CAD GIC threshold), tuition proofs, and bank balance guidelines.
4. Work & PR Pathways: Advise on Post-Graduation Work Permits (PGWP up to 3 years) and provincial PNP programs (Ontario OINP, BC Tech PNP, Express Entry STEM draws).

GUIDANCE STYLE:
- Professional, encouraging, structured, and realistic.
- Use clean Markdown with bullet points, bold key terms, and numbered steps.
- Avoid vague answers; provide concrete advice based on their profile metrics.
"""


def call_gemini_api(
    prompt: str,
    system_instruction: str,
    api_key: str,
    model: str = DEFAULT_MODEL
) -> Optional[str]:
    """
    Direct HTTPS REST call to Google Generative Language API.
    Zero heavy dependencies, works seamlessly on all operating systems.
    """
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"

    payload = {
        "system_instruction": {
            "parts": [{"text": system_instruction}]
        },
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}]
            }
        ],
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 1200
        }
    }

    data_bytes = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data_bytes,
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            resp_body = resp.read().decode("utf-8")
            result = json.loads(resp_body)
            candidates = result.get("candidates", [])
            if candidates:
                content = candidates[0].get("content", {})
                parts = content.get("parts", [])
                if parts and "text" in parts[0]:
                    return parts[0]["text"]
    except Exception as e:
        print(f"[Gemini API Warning] {str(e)}")
        return None

    return None


def generate_fallback_reply(
    user_msg_raw: str,
    profile: Optional[Dict[str, Any]] = None
) -> Tuple[str, List[str]]:
    """Robust heuristic response engine used when Gemini API key is not yet set or offline."""
    user_msg = user_msg_raw.lower().strip()
    profile = profile or {}

    highest_qual = profile.get("highestQualification", "Bachelor's")
    cgpa = profile.get("cgpa", "8.4")
    overall_ielts = profile.get("ieltsOverall", "7.0")
    budget = profile.get("availableBudget", "35,000")

    if any(k in user_msg for k in ["sop", "statement of purpose", "essay"]):
        reply = (
            "For a strong Canadian study visa & admissions SOP, emphasize three key anchors:\n\n"
            "1. **Academic Continuity:** Connect your prior degree with target college curriculum modules.\n"
            "2. **Faculty & Lab Alignment:** Cite 2 specific courses or research clusters at the institution.\n"
            "3. **Concrete Career Goals:** Outline measurable post-graduation milestones in in-demand tech roles."
        )
        quick_replies = ["Review my score", "View college programs", "Application checklist"]

    elif any(k in user_msg for k in ["application", "apply", "requirement", "checklist", "guidance", "transcript", "resume"]):
        reply = (
            "Here is the official checklist for university application requirements:\n\n"
            "• **Transcripts:** Scanned official marksheets + degree certificate in a single PDF (<10 MB).\n"
            "• **Statement of Purpose:** 750–1,000 words articulating academic background and career goals.\n"
            "• **Language Test:** IELTS Academic 6.5+ (no sub-band < 6.0) or TOEFL iBT 88+.\n"
            "• **Financial Proof:** 1st-year tuition fee + IRCC $20,635 CAD living cost GIC certificate.\n"
            "• **Resume / CV:** Standard Canadian format highlighting technical proficiencies and internships."
        )
        quick_replies = ["Review my SOP", "Check visa checklist", "View colleges"]

    elif any(k in user_msg for k in ["program", "course", "college", "university"]):
        reply = (
            f"Based on your {highest_qual} with {cgpa} CGPA and budget of ${budget} CAD, "
            "your strongest college pathways are:\n\n"
            "1. **Seneca College** – Big Data Analytics (94% match, 3-yr PGWP)\n"
            "2. **Humber College** – Cloud Computing (92% match, high tech demand)\n"
            "3. **University of Toronto** – Applied Computing in AI (97% match)"
        )
        quick_replies = ["Check PR eligibility", "How to improve my score?", "View tuition fees"]

    elif any(k in user_msg for k in ["pr", "permanent residence", "pnp", "express entry"]):
        reply = (
            "Your PR Pathway feasibility is rated **High**! Graduates in Canadian STEM programs "
            "qualify for targeted category-based Express Entry selection and Provincial Nominee "
            "Programs (e.g. Ontario OINP and BC Tech Streams) after completing 1 year of Canadian skilled work."
        )
        quick_replies = ["What is PGWP?", "Top tech careers", "Application checklist"]

    elif any(k in user_msg for k in ["score", "eligib", "percent"]):
        reply = (
            f"Your profile shows strong Canadian study eligibility! Your IELTS overall of {overall_ielts} "
            "clears standard Student Direct Stream (SDS) guidelines. To push your score higher, "
            "aim for IELTS writing 7.0+ for maximum CRS Express Entry point gains."
        )
        quick_replies = ["Fix my SOP", "PR options in BC", "Financial proof needed"]

    else:
        reply = (
            "I'm your AI Canadian Study & PR Advisor! Ask me about top matched colleges, "
            "your eligibility score breakdown, PGWP rules, or PNP provincial immigration streams."
        )
        quick_replies = [
            "Best options for my profile?",
            "Application requirements checklist",
            "Can I get PR in BC?",
            "Fix my SOP"
        ]

    return reply, quick_replies


def generate_advisor_reply(
    user_message: str,
    profile: Optional[Dict[str, Any]] = None,
    client_key: Optional[str] = None
) -> Tuple[str, List[str], str, Optional[str]]:
    """
    Main advisor dispatch: uses Google Gemini API if API key is provided,
    otherwise gracefully falls back to the smart heuristic knowledge engine.
    """
    api_key = get_gemini_api_key(client_key)

    if api_key:
        system_prompt = build_system_prompt(profile)
        gemini_response = call_gemini_api(user_message, system_prompt, api_key, DEFAULT_MODEL)
        if gemini_response:
            quick_replies = [
                "Review my SOP for this program",
                "What are the IELTS cutoffs?",
                "Calculate my PR eligibility in Ontario",
                "What financial proof is required?"
            ]
            return gemini_response, quick_replies, "Google Gemini 2.5 Flash", DEFAULT_MODEL

    fallback_reply, quick_replies = generate_fallback_reply(user_message, profile)
    source = "Arvian Local Engine" if not api_key else "Arvian Local Engine (Gemini fallback)"
    return fallback_reply, quick_replies, source, None
