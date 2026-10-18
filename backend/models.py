from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class StudentProfileInput(BaseModel):
    cgpa: float = Field(default=7.5, description="CGPA (scale 10 or 4) or percentage")
    qualification: str = Field(default="Bachelor's", description="Highest educational credential")

    # Language Proficiency (IELTS)
    ielts_overall: float = Field(default=6.5, ge=0.0, le=9.0)
    ielts_listening: float = Field(default=6.5, ge=0.0, le=9.0)
    ielts_reading: float = Field(default=6.5, ge=0.0, le=9.0)
    ielts_writing: float = Field(default=6.0, ge=0.0, le=9.0)
    ielts_speaking: float = Field(default=6.0, ge=0.0, le=9.0)

    # Financial Capacity (CAD)
    available_budget_cad: float = Field(default=35000.0, description="Available funds in CAD")
    annual_income_cad: float = Field(default=25000.0, description="Annual family income in CAD")
    funding_sources: List[str] = Field(default_factory=list, description="Funding channels (Savings, Loan, etc.)")

    # Experience & Skills
    work_experience_years: float = Field(default=1.0, ge=0.0)
    skills: List[str] = Field(default_factory=list, description="Technical and soft skills")
    preferred_province: str = Field(default="Ontario", description="Target Canadian province")

    # Optional binary flags for legacy ML compatibility
    python: Optional[int] = None
    cpp: Optional[int] = None
    java: Optional[int] = None
    sql: Optional[int] = None
    web_development: Optional[int] = None
    machine_learning: Optional[int] = None
    data_analysis: Optional[int] = None
    cloud: Optional[int] = None
    cyber_security: Optional[int] = None
    communication: Optional[int] = None
    problem_solving: Optional[int] = None
    experience: Optional[int] = None
    interest_ai: Optional[int] = None
    interest_web: Optional[int] = None
    interest_data: Optional[int] = None
    interest_security: Optional[int] = None


class CategoryScore(BaseModel):
    score: float
    weight: int
    status: str
    detail: Optional[str] = None


class ScoreBreakdown(BaseModel):
    academic: CategoryScore
    language: CategoryScore
    financial: CategoryScore
    career: CategoryScore
    visa_pr: CategoryScore


class CareerRecommendation(BaseModel):
    career: str
    score: float
    salary_range: Optional[str] = None
    noc_code: Optional[str] = None


class EvaluationResponse(BaseModel):
    overall_score: int
    breakdown: ScoreBreakdown
    recommendations: List[CareerRecommendation]
    risks_and_gaps: List[str]
    actionable_tips: List[str]
    source: str = "FastAPI Backend"


class ChatMessageRequest(BaseModel):
    message: str
    profile: Optional[Dict[str, Any]] = None
    api_key: Optional[str] = None


class ChatMessageResponse(BaseModel):
    reply: str
    quick_replies: List[str] = Field(default_factory=list)
    source: Optional[str] = "Arvian AI"
    model: Optional[str] = None


class ProgramItem(BaseModel):
    title: str
    college: str
    location: str
    duration: str
    fee: str
    intake: str
    score: int
    tag: str
    reasons: List[str]
    country: Optional[str] = "Canada"
    degree: Optional[str] = None
    track: Optional[str] = None
    roles: Optional[List[str]] = None
    keywords: Optional[List[str]] = None
