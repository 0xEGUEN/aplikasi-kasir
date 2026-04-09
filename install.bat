@echo off
REM Script untuk install dependencies

echo Menginstal dependencies...
echo.

echo [1/2] Backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Gagal install backend dependencies
    pause
    exit /b 1
)

echo.
echo [2/2] Setup selesai!
echo.
echo Untuk menjalankan aplikasi:
echo   - Windows: Double-click start.bat
echo   - Command Prompt: cd backend && npm start
echo   - Buka frontend/index.html di browser
echo.
pause
