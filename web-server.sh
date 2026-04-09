#!/bin/bash

# Simple HTTP Server untuk frontend development
# Gunakan jika tidak punya Live Server

PORT=${1:-8000}
echo ""
echo "======================================"
echo "  Aplikasi Kasir - Frontend Server"
echo "======================================"
echo ""
echo "🚀 Server dimulai di: http://localhost:$PORT"
echo "📁 Buka folder: frontend/"
echo ""
echo "💡 Tips: Jika tidak ada output, berarti sudah running"
echo "💡 Tekan Ctrl+C untuk stop"
echo ""
echo "======================================"
echo ""

cd frontend
python3 -m http.server $PORT 2>/dev/null || python -m http.server $PORT
