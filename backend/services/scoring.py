from typing import Dict, Any, List, Tuple
from backend.models import (
    StudentProfileInput,
    EvaluationResponse,
    ScoreBreakdown,
    CategoryScore,
    CareerRecommendation
)

CANADA_GIC_THRESHOLD = 20635.0  # IRCC 2024+ financial living expense requirement in CAD

PROVINCE_PNP_BONUSES = {
    "British Columbia": 92.0,
    "Ontario": 89.0,
    "Alberta": 86.0,
    "Manitoba": 84.0,
    "Nova Scotia": 82.0,
    "Saskatchewan": 83.0,
    "New Brunswick": 80.0
}


def calculate_academic_score(cgpa: float, qualification: str) -> Tuple[float, str]:
    if cgpa <= 4.0 and cgpa > 0:
        norm_cgpa = (cgpa / 4.0) * 100.0
    elif cgpa <= 10.0:
        norm_cgpa = (cgpa / 10.0) * 100.0
    else:
        norm_cgpa = min(cgpa, 100.0)

    base_score = min(max(norm_cgpa, 45.0), 98.0)
    if qualification in ["Bachelor's", "Master's"]:
        base_score = min(100.0, base_score + 4.0)

    status = "Strong" if base_score >= 80 else ("Average" if base_score >= 65 else "Needs Improvement")
    return round(base_score, 1), status


def calculate_language_score(overall: float, l: float, r: float, w: float, s: float) -> Tuple[float, List[str], str]:
    gaps = []
    min_band = min(l, r, w, s)

    if min_band < 6.0:
        gaps.append(f"IELTS sub-band ({min_band}) is below standard Canadian SDS threshold (6.0).")

    if overall >= 7.5:
        score = 96.0
    elif overall >= 7.0:
        score = 88.0
    elif overall >= 6.5:
        score = 80.0
    elif overall >= 6.0:
        score = 70.0
    else:
        score = 55.0
        gaps.append(f"Overall IELTS ({overall}) is below direct college admission requirement.")

    status = "Strong" if score >= 80 else "Needs Improvement"
    return round(score, 1), gaps, status


def calculate_financial_score(budget_cad: float, funding_sources: List[str]) -> Tuple[float, List[str], str]:
    gaps = []
    score = 60.0

    if budget_cad >= 45000:
        score = 95.0
    elif budget_cad >= 35000:
        score = 86.0
    elif budget_cad >= 25000:
        score = 74.0
    else:
        score = 55.0
        gaps.append(f"Available funds (${budget_cad:,.0f} CAD) are near the IRCC minimum living threshold (${CANADA_GIC_THRESHOLD:,.0f} CAD).")

    if len(funding_sources) >= 2:
        score = min(100.0, score + 4.0)

    status = "Strong" if score >= 80 else ("Moderate" if score >= 65 else "Limited")
    return round(score, 1), gaps, status


def calculate_career_score(experience_years: float, skills: List[str]) -> Tuple[float, List[CareerRecommendation], str]:
    skills_lower = [s.strip().lower() for s in skills]
    base = 65.0

    if experience_years >= 3.0:
        base += 15.0
    elif experience_years >= 1.0:
        base += 10.0
    else:
        base += 5.0

    matched_tech_skills = [
        s for s in skills_lower
        if any(keyword in s for keyword in ["python", "machine learning", "data", "cloud", "aws", "react", "sql", "security"])
    ]
    base += min(len(matched_tech_skills) * 4.0, 15.0)
    score = min(base, 98.0)

    recs: List[CareerRecommendation] = []
    if any(s in skills_lower for s in ["python", "machine learning", "ai"]):
        recs.append(CareerRecommendation(
            career="AI / ML Engineer",
            score=min(96.0, score + 4),
            salary_range="$95,000 - $135,000 CAD",
            noc_code="NOC 21211"
        ))
    if any(s in skills_lower for s in ["data", "sql", "data analysis"]):
        recs.append(CareerRecommendation(
            career="Data Scientist / Analyst",
            score=min(93.0, score + 2),
            salary_range="$82,000 - $115,000 CAD",
            noc_code="NOC 21211"
        ))
    if any(s in skills_lower for s in ["react", "javascript", "node", "web development"]):
        recs.append(CareerRecommendation(
            career="Full Stack Developer",
            score=min(91.0, score + 1),
            salary_range="$85,000 - $120,000 CAD",
            noc_code="NOC 21234"
        ))
    if any(s in skills_lower for s in ["cloud", "aws", "azure"]):
        recs.append(CareerRecommendation(
            career="Cloud Solutions Architect",
            score=min(90.0, score),
            salary_range="$105,000 - $145,000 CAD",
            noc_code="NOC 21222"
        ))

    if not recs:
        recs = [
            CareerRecommendation(
                career="Software Engineer",
                score=round(score, 1),
                salary_range="$88,000 - $125,000 CAD",
                noc_code="NOC 21231"
            ),
            CareerRecommendation(
                career="IT Systems Analyst",
                score=round(max(score - 4, 75.0), 1),
                salary_range="$78,000 - $105,000 CAD",
                noc_code="NOC 21221"
            )
        ]

    status = "High Demand" if score >= 80 else "Moderate Demand"
    return round(score, 1), recs, status


def calculate_visa_pr_score(province: str, gaps: List[str]) -> Tuple[float, str]:
    base = PROVINCE_PNP_BONUSES.get(province, 80.0)
    if len(gaps) > 1:
        base -= 8.0
    elif len(gaps) == 1:
        base -= 4.0

    status = "Favorable" if base >= 80 else "Moderate"
    return round(base, 1), status


def evaluate_student(profile: StudentProfileInput) -> EvaluationResponse:
    acad_score, acad_status = calculate_academic_score(profile.cgpa, profile.qualification)
    lang_score, lang_gaps, lang_status = calculate_language_score(
        profile.ielts_overall,
        profile.ielts_listening,
        profile.ielts_reading,
        profile.ielts_writing,
        profile.ielts_speaking
    )
    fin_score, fin_gaps, fin_status = calculate_financial_score(
        profile.available_budget_cad,
        profile.funding_sources
    )
    career_score, recs, career_status = calculate_career_score(
        profile.work_experience_years,
        profile.skills
    )

    all_gaps = lang_gaps + fin_gaps
    visa_score, visa_status = calculate_visa_pr_score(profile.preferred_province, all_gaps)

    composite = round(
        (acad_score * 0.25) +
        (lang_score * 0.20) +
        (fin_score * 0.20) +
        (career_score * 0.20) +
        (visa_score * 0.15)
    )

    tips = []
    if profile.ielts_writing < 6.5:
        tips.append("Retake IELTS writing to achieve 6.5+ for an immediate boost in Express Entry CRS points.")
    else:
        tips.append("Your IELTS band meets standard Student Direct Stream (SDS) clearance.")

    tips.append(f"Maintain a minimum of ${CANADA_GIC_THRESHOLD:,.0f} CAD for your Guaranteed Investment Certificate (GIC).")
    tips.append(f"Explore the {profile.preferred_province} Provincial Nominee Program (PNP) tech priority streams.")

    breakdown = ScoreBreakdown(
        academic=CategoryScore(score=acad_score, weight=25, status=acad_status),
        language=CategoryScore(score=lang_score, weight=20, status=lang_status),
        financial=CategoryScore(score=fin_score, weight=20, status=fin_status),
        career=CategoryScore(score=career_score, weight=20, status=career_status),
        visa_pr=CategoryScore(score=visa_score, weight=15, status=visa_status)
    )

    return EvaluationResponse(
        overall_score=composite,
        breakdown=breakdown,
        recommendations=recs,
        risks_and_gaps=all_gaps if all_gaps else ["No critical flags found. Ensure transcripts are attested."],
        actionable_tips=tips,
        source="FastAPI Backend Scoring Engine"
    )
