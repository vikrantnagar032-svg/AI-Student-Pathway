@echo off
title Arvian AI Development Launcher
echo ========================================================
echo   Launching Arvian AI Full-Stack Platform
echo ========================================================
echo.

echo [1/2] Starting FastAPI Backend on http://127.0.0.1:8000 ...
start "Arvian Backend (FastAPI)" cmd /k ".\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --port 8000"

echo [2/2] Starting React Vite Frontend on http://localhost:5173 ...
start "Arvian Frontend (React/Vite)" cmd /k "npm run dev"

echo.
echo ========================================================
echo   Both services are now running in separate windows!
echo   - Frontend: http://localhost:5173
echo   - Backend API Docs: http://127.0.0.1:8000/docs
echo ========================================================
