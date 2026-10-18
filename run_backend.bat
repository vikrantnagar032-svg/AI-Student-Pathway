@echo off
echo ===================================================
echo   Starting Arvian AI Student Pathway Backend (FastAPI)
echo ===================================================

cd /d "%~dp0"

IF EXIST ".venv\Scripts\python.exe" (
    echo Using virtual environment .venv...
    .venv\Scripts\python.exe -m uvicorn backend.main:app --reload --port 8000
) ELSE (
    echo Using system Python...
    python -m uvicorn backend.main:app --reload --port 8000
)

pause
