@echo off
REM Script untuk memulai aplikasi kasir secara otomatis
REM Ini adalah file batch untuk Windows

echo ============================================
echo   Aplikasi Kasir - Start Script
echo ============================================
echo.

REM Cek apakah npm terinstall
where npm >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js/npm tidak terinstall!
    echo Download dari: https://nodejs.org
    pause
    exit /b 1
)

echo [1/3] Menginstal dependencies backend...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Gagal install backend dependencies
    pause
    exit /b 1
)

echo [2/3] Memulai server backend...
start "Aplikasi Kasir - Backend Server" cmd /k npm start

echo [3/3] Menunggu server siap...
timeout /t 3 /nobreak

echo.
echo ✓ Backend server dimulai pada http://localhost:5000
echo ✓ Membuka frontend...
echo.

REM Buka file index.html dengan path yang benar
cd ..
start "" frontend\index.html
cd backend

echo.
echo ============================================
echo   Aplikasi siap digunakan!
echo   Frontend: frontend/index.html
echo   Backend:  http://localhost:5000
echo ============================================
echo.
echo Tekan Ctrl+C pada terminal backend untuk menghentikan server
pause
