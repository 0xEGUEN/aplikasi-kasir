#!/bin/bash

# Script untuk memulai aplikasi kasir di Linux/macOS

echo "============================================"
echo "  Aplikasi Kasir - Start Script"
echo "============================================"
echo ""

# Cek apakah npm terinstall
if ! command -v npm &> /dev/null; then
    echo "ERROR: Node.js/npm tidak terinstall!"
    echo "Download dari: https://nodejs.org"
    exit 1
fi

echo "[1/3] Menginstal dependencies backend..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Gagal install backend dependencies"
    exit 1
fi

echo "[2/3] Memulai server backend..."
npm start &
BACKEND_PID=$!

echo "[3/3] Menunggu server siap..."
sleep 3

echo ""
echo "✓ Backend server dimulai pada http://localhost:5000"
echo "✓ Membuka frontend di browser..."
echo ""

# Tentukan path frontend
FRONTEND_PATH="file://$(cd ../frontend && pwd)/index.html"

# Buka file index.html dengan browser default
if command -v xdg-open &> /dev/null; then
    xdg-open "$FRONTEND_PATH" &
elif command -v open &> /dev/null; then
    open "$FRONTEND_PATH" &
elif command -v firefox &> /dev/null; then
    firefox "$FRONTEND_PATH" &
elif command -v chromium &> /dev/null; then
    chromium "$FRONTEND_PATH" &
elif command -v google-chrome &> /dev/null; then
    google-chrome "$FRONTEND_PATH" &
elif command -v brave &> /dev/null; then
    brave "$FRONTEND_PATH" &
else
    echo "⚠️  Browser tidak ditemukan. Silakan buka manual:"
    echo "   $FRONTEND_PATH"
fi

echo ""
echo "============================================"
echo "  ✓ Aplikasi siap digunakan!"
echo "  Frontend: $FRONTEND_PATH"
echo "  Backend:  http://localhost:5000"
echo "============================================"
echo ""
echo "💡 Tips: Tekan Ctrl+C untuk menghentikan server"
echo ""

wait $BACKEND_PID
