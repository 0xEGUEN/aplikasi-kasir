#!/bin/bash

# Script untuk install aplikasi kasir di Linux/macOS

echo "============================================"
echo "  Aplikasi Kasir - Install Script"
echo "============================================"
echo ""

# Cek apakah npm terinstall
if ! command -v npm &> /dev/null; then
    echo "❌ ERROR: Node.js/npm tidak terinstall!"
    echo ""
    echo "Untuk install Node.js, jalankan salah satu:"
    echo ""
    echo "📦 Ubuntu/Debian/CachyOS:"
    echo "   sudo apt update"
    echo "   sudo apt install nodejs npm"
    echo ""
    echo "🍎 macOS (dengan Homebrew):"
    echo "   brew install node"
    echo ""
    echo "👉 Atau download dari: https://nodejs.org"
    echo ""
    exit 1
fi

echo "✓ Node.js dan npm sudah terinstall"
echo "  Node: $(node --version)"
echo "  npm: $(npm --version)"
echo ""

echo "[1/2] Memasuki folder backend..."
cd backend || exit 1

echo "[2/2] Install dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "============================================"
    echo "  ✓ Install selesai!"
    echo "============================================"
    echo ""
    echo "📌 Langkah selanjutnya:"
    echo "   chmod +x ../start.sh"
    echo "   ../start.sh"
    echo ""
    echo "Atau jalankan script start.sh dari folder root aplikasi"
    echo ""
else
    echo ""
    echo "❌ ERROR: Gagal install dependencies"
    echo "Cek error message di atas"
    exit 1
fi
