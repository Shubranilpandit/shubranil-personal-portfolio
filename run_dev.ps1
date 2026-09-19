Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  INITIALIZING TRON: LEGACY PORTFOLIO SYSTEM" -ForegroundColor Cyan
Write-Host "  Shubranil Pandit - MCA Data Science Specialization" -ForegroundColor White
Write-Host "===================================================" -ForegroundColor Cyan

# Start Flask backend in background
Start-Process wt -ArgumentList "new-tab", "--title", "TRON Backend", "python", "backend/app.py" -ErrorAction SilentlyContinue
if (-not $?) {
    Start-Process cmd -ArgumentList "/k", "python", "backend/app.py"
}

# Start Frontend
Set-Location -Path "$PSScriptRoot\frontend"
npm run dev
