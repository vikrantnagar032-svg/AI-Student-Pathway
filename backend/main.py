from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any

from backend.models import (
    StudentProfileInput,
    EvaluationResponse,
    ChatMessageRequest,
    ChatMessageResponse,
    ProgramItem,
    CareerRecommendation
)
from backend.services.scoring import evaluate_student
from backend.services.ml_career import predict_career_ml
from backend.services.programs_catalog import get_programs
from backend.services.gemini_advisor import (
    generate_advisor_reply,
    get_gemini_api_key,
    DEFAULT_MODEL
)

# ==========================================
# FASTAPI APPLICATION SETUP
# ==========================================

app = FastAPI(
    title="Arvian AI Student Pathway Backend",
    description="Unified API Engine for Canadian Study, Work, and Permanent Residency (PR) pathway evaluation.",
    version="1.0.0"
)

# Enable CORS for frontend Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# HEALTH & ROOT
# ==========================================

@app.get("/", tags=["Health"])
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "online",
        "service": "Arvian AI Student Pathway API",
        "version": "1.0.0",
        "endpoints": [
            "/api/score (POST)",
            "/predict (POST)",
            "/api/programs (GET)",
            "/api/chat (POST)"
        ]
    }


# ==========================================
# PROFILE SCORING & PREDICTION
# ==========================================

@app.post("/api/score", response_model=EvaluationResponse, tags=["Scoring"])
@app.post("/predict", response_model=EvaluationResponse, tags=["Scoring"])
def score_student_profile(profile: StudentProfileInput):
    """
    Evaluates student credentials against Canadian academic, language (SDS),
    financial (GIC), job market demand, and provincial nominee (PNP) criteria.
    """
    try:
        evaluation = evaluate_student(profile)

        # Attempt to supplement with Scikit-learn ML model predictions if available
        ml_results = predict_career_ml(profile)
        if ml_results:
            # Merge ML recommendations if present
            merged_recs: List[CareerRecommendation] = []
            for item in ml_results:
                merged_recs.append(CareerRecommendation(
                    career=item["career"],
                    score=item["score"],
                    salary_range="$85,000 - $130,000 CAD",
                    noc_code="TEER 1 / STEM NOC"
                ))
            if merged_recs:
                evaluation.recommendations = merged_recs

        return evaluation
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scoring error: {str(e)}")


# ==========================================
# PROGRAMS CATALOG
# ==========================================

@app.get("/api/programs", response_model=List[ProgramItem], tags=["Programs"])
def search_programs(
    query: Optional[str] = Query(None, description="Search term across title, college, location, role, degree"),
    province: Optional[str] = Query(None, description="Filter by province/state"),
    country: Optional[str] = Query(None, description="Filter by country (e.g. India, Canada)"),
    track: Optional[str] = Query(None, description="Filter by career track (e.g. #1 AI/ML Engineer)")
):
    """
    Returns matched academic programs with match scores, intake dates, fees, and career tracks.
    """
    return get_programs(query=query, province=province, country=country, track=track)


# ==========================================
# AI PATHWAY CHAT ADVISOR
# ==========================================

# ==========================================
# AI PATHWAY CHAT ADVISOR (POWERED BY GEMINI)
# ==========================================

@app.get("/api/gemini/status", tags=["Chat"])
def get_gemini_status():
    """
    Checks if Google Gemini API key is configured and returns the active model.
    """
    api_key = get_gemini_api_key()
    has_key = bool(api_key and len(api_key.strip()) > 5)
    return {
        "enabled": has_key,
        "model": DEFAULT_MODEL if has_key else None,
        "provider": "Google Gemini API" if has_key else "Arvian Heuristic Engine"
    }


@app.post("/api/chat", response_model=ChatMessageResponse, tags=["Chat"])
def chat_with_advisor(req: ChatMessageRequest):
    """
    Conversational AI pathway assistant powered by Google Gemini (with local fallback).
    """
    reply, quick_replies, source, model = generate_advisor_reply(
        user_message=req.message,
        profile=req.profile,
        client_key=req.api_key
    )
    return ChatMessageResponse(
        reply=reply,
        quick_replies=quick_replies,
        source=source,
        model=model
    )
