@echo off
echo ===================================================
echo   INITIALIZING TRON: LEGACY PORTFOLIO SYSTEM
echo   Shubranil Pandit - MCA Data Science Specialization
echo ===================================================

echo [1/2] Starting Flask Backend API on http://localhost:5000 ...
start "TRON Flask Backend" cmd /k "python backend/app.py"

echo [2/2] Starting Vite React Frontend on http://localhost:5173 ...
cd frontend
start "TRON React Frontend" cmd /k "npm run dev"

echo.
echo ===================================================
echo   SYSTEM ONLINE:
echo   - Frontend: http://localhost:5173
echo   - Backend:  http://localhost:5000
echo   - Admin:    admin / Admin@Tron2026
echo ===================================================
