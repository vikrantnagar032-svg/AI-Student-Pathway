import os
from typing import List, Dict, Any, Optional
import pandas as pd
import joblib

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "career_model.pkl")

# Cache model instance
_model_instance = None


def get_trained_model():
    global _model_instance
    if _model_instance is not None:
        return _model_instance

    if os.path.exists(MODEL_PATH):
        try:
            _model_instance = joblib.load(MODEL_PATH)
            return _model_instance
        except Exception as e:
            print(f"Notice: Could not load {MODEL_PATH} ({e}).")
            return None
    return None


def extract_features(profile: Any) -> Dict[str, Any]:
    skills_lower = [s.strip().lower() for s in getattr(profile, "skills", [])]

    # Helper to check if keyword is in skills
    def has_skill(keywords: List[str]) -> int:
        return 1 if any(k in skills_lower for k in keywords) else 0

    return {
        "cgpa": float(getattr(profile, "cgpa", 7.5) or 7.5),
        "python": getattr(profile, "python", None) if getattr(profile, "python", None) is not None else has_skill(["python"]),
        "cpp": getattr(profile, "cpp", None) if getattr(profile, "cpp", None) is not None else has_skill(["c++", "cpp"]),
        "java": getattr(profile, "java", None) if getattr(profile, "java", None) is not None else has_skill(["java"]),
        "sql": getattr(profile, "sql", None) if getattr(profile, "sql", None) is not None else has_skill(["sql", "database"]),
        "web_development": getattr(profile, "web_development", None) if getattr(profile, "web_development", None) is not None else has_skill(["web development", "react", "javascript", "html"]),
        "machine_learning": getattr(profile, "machine_learning", None) if getattr(profile, "machine_learning", None) is not None else has_skill(["machine learning", "ml", "ai"]),
        "data_analysis": getattr(profile, "data_analysis", None) if getattr(profile, "data_analysis", None) is not None else has_skill(["data analysis", "data science"]),
        "cloud": getattr(profile, "cloud", None) if getattr(profile, "cloud", None) is not None else has_skill(["cloud", "aws", "azure"]),
        "cyber_security": getattr(profile, "cyber_security", None) if getattr(profile, "cyber_security", None) is not None else has_skill(["cyber security", "security"]),
        "communication": getattr(profile, "communication", None) if getattr(profile, "communication", None) is not None else 1,
        "problem_solving": getattr(profile, "problem_solving", None) if getattr(profile, "problem_solving", None) is not None else 1,
        "experience": 1 if float(getattr(profile, "work_experience_years", 1.0) or 1.0) >= 1.0 else 0,
        "interest_ai": getattr(profile, "interest_ai", None) if getattr(profile, "interest_ai", None) is not None else has_skill(["ai", "machine learning"]),
        "interest_web": getattr(profile, "interest_web", None) if getattr(profile, "interest_web", None) is not None else has_skill(["web development", "react"]),
        "interest_data": getattr(profile, "interest_data", None) if getattr(profile, "interest_data", None) is not None else has_skill(["data", "sql"]),
        "interest_security": getattr(profile, "interest_security", None) if getattr(profile, "interest_security", None) is not None else has_skill(["security", "cyber security"]),
    }


def predict_career_ml(profile: Any) -> Optional[List[Dict[str, Any]]]:
    model = get_trained_model()
    if model is None:
        return None

    try:
        features = extract_features(profile)
        data = pd.DataFrame([features])
        probabilities = model.predict_proba(data)[0]
        careers = model.classes_

        results = []
        for career, prob in zip(careers, probabilities):
            results.append({
                "career": career,
                "score": round(float(prob) * 100, 1)
            })
        results.sort(key=lambda x: x["score"], reverse=True)
        return results
    except Exception as e:
        print(f"ML prediction error: {e}")
        return None
