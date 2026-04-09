# 🛒 Aplikasi Kasir Sederhana

Aplikasi kasir (POS - Point of Sale) yang sederhana dan user-friendly untuk mengelola penjualan produk.

## ✨ Fitur Utama

✅ **Kasir (Checkout)**
- Pilih produk dari daftar
- Tambah/kurangi jumlah barang
- Hitung total dan kembalian otomatis
- Dukungan diskon
- Proses pembayaran

✅ **Kelola Produk**
- Tambah produk baru (nama, harga, kategori, stok)
- Lihat daftar semua produk
- Hapus produk

✅ **Riwayat Transaksi**
- Lihat semua transaksi yang telah dilakukan
- Detail transaksi (waktu, jumlah, diskon, kembalian)

✅ **Mode Simulasi** (Baru!)
- Initialize database dengan mock data (10 produk + 20 transaksi)
- Tambah transaksi/produk random untuk testing
- Reset dan clear data dengan mudah
- Lihat statistik real-time

## 🛠️ Teknologi yang Digunakan

**Backend:**
- Node.js + Express.js
- SQLite (Database)
- CORS untuk komunikasi frontend-backend

**Frontend:**
- React (via CDN)
- HTML5 + CSS3
- Responsive Design

## 📦 Struktur Folder

```
aplikasi-kasir/
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   └── database.js           # Setup database SQLite
│   │   ├── routes/
│   │   │   ├── products.js           # API untuk produk
│   │   │   ├── transactions.js       # API untuk transaksi
│   │   │   └── simulation.js         # API untuk simulasi (NEW)
│   │   └── utils/
│   │       └── simulationData.js     # Mock data generator (NEW)
│   ├── server.js                     # Entry point backend
│   └── package.json
├── frontend/
│   └── index.html                    # Aplikasi React (one file)
├── install.sh / install.bat          # Setup script
├── start.sh / start.bat              # Run script
└── README.md
```

---

## 🚀 INSTALASI & MENJALANKAN

### **Windows**

#### 1. Setup Backend

```bash
cd backend
npm install
npm start
```

Atau jalankan `install.bat` kemudian `start.bat` dari folder root.

Server akan berjalan di `http://localhost:5000`

#### 2. Buka Frontend

Buka file `frontend/index.html` dengan browser Anda:
- Klik kanan di file → "Open with Live Server" (VS Code)
- Atau drag-drop ke browser

**Alternatif:** Gunakan Python:
```bash
cd frontend
python -m http.server 8000
```

Buka `http://localhost:8000`

---

### **Linux / CachyOS**

#### Instalasi Cepat (3 Langkah)

**Langkah 1: Install Node.js**

Sesuai distro Anda:

**Ubuntu/Debian/CachyOS (APT):**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Fedora/RHEL (DNF):**
```bash
sudo dnf install nodejs npm
```

**Arch/CachyOS (Pacman):**
```bash
sudo pacman -S nodejs npm
```

**openSUSE (Zypper):**
```bash
sudo zypper install nodejs npm
```

**Verifikasi:**
```bash
node --version
npm --version
```

**Langkah 2: Setup Aplikasi**

```bash
cd ~/path/to/aplikasi-kasir
chmod +x install.sh start.sh
./install.sh
```

**Langkah 3: Jalankan**

```bash
./start.sh
```

Browser akan otomatis terbuka! 🎉

---

#### CachyOS Quick Setup (One-Liner)

```bash
cd ~/path/to/aplikasi-kasir && chmod +x *.sh && ./install.sh && ./start.sh
```

---

## 🔌 API Endpoints

### Produk
- `GET /api/products` - Ambil semua produk
- `POST /api/products` - Tambah produk baru
- `PUT /api/products/:id` - Update produk
- `DELETE /api/products/:id` - Hapus produk

### Transaksi
- `GET /api/transactions` - Ambil semua transaksi
- `GET /api/transactions/:id` - Ambil detail transaksi
- `POST /api/transactions` - Buat transaksi baru

### Simulasi (NEW)
- `POST /api/simulation/init` - Initialize dengan mock data
- `POST /api/simulation/add-transactions` - Tambah transaksi (body: `{count: 10}`)
- `POST /api/simulation/add-products` - Tambah produk (body: `{count: 5}`)
- `POST /api/simulation/clear-transactions` - Hapus semua transaksi
- `POST /api/simulation/reset` - Reset database
- `GET /api/simulation/status` - Cek status simulasi
- `GET /api/simulation/stats` - Statistik simulasi
- `PATCH /api/simulation/update-stock/:productId` - Update stock (body: `{newStock: 50}`)

---

## 🛠️ TROUBLESHOOTING

### Windows

**Problem: "Port 5000 sudah terpakai"**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Problem: "npm: command not found"**
- Install Node.js dari https://nodejs.org
- Restart terminal setelah install

---

### Linux/CachyOS

**Problem: "Command not found: node"**
```bash
sudo apt update
sudo apt install nodejs npm
# atau sesuai distro Anda
```

**Problem: "Permission denied" saat jalankan .sh**
```bash
chmod +x start.sh install.sh
./start.sh
```

**Problem: "npm: command not found"**
```bash
sudo apt install npm
```

**Problem: Port 5000 sudah terpakai**
```bash
sudo lsof -i :5000
sudo kill -9 <PID>
```

Atau ubah port di `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3000  // Ubah ke 3000 atau port lain
```

**Problem: Browser tidak terbuka otomatis**
Buka manual: `http://localhost:5000`

---

### CachyOS Desktop Shortcut (Optional)

Untuk launcher dari desktop:

```bash
nano ~/.local/share/applications/kasir.desktop
```

Isi:
```ini
[Desktop Entry]
Name=Aplikasi Kasir
Exec=/home/YOUR_USERNAME/aplikasi-kasir/start.sh
Terminal=false
Type=Application
```

Save (`Ctrl+S`, `Ctrl+X`), kemudian:
```bash
chmod +x ~/.local/share/applications/kasir.desktop
```

---

## 💡 TIPS & TRICKS

### Tips Menggunakan Aplikasi

**1. Tambah Produk Lebih Cepat**
- Buka Tab Produk
- Setelah tambah satu produk, langsung isi form untuk produk berikutnya
- Produk muncul langsung di Kasir tanpa reload

**2. Keyboard Shortcuts**
- `Tab key`: Pindah antar input field
- `Enter key`: Submit form
- `Number keys`: Langsung ketik di field harga

**3. Hitung Diskon**
```
Total harga: Rp 100.000
Diskon: Rp 10.000 (10%)
---
Harga final: Rp 90.000

Uang diterima: Rp 100.000
Kembalian: Rp 10.000
```

**4. Checkout Cepat**
- Klik produk yang sering dipesan
- Ubah qty jika >1
- Langsung selesaikan transaksi

**5. Undo Kesalahan**
- **Hapus item**: Klik tombol X
- **Clear cart**: Klik tombol BATAL
- **Edit produk**: Hapus di tab Produk, buat baru

---

### Tips Teknis

**Backup Database**
```bash
# Windows
copy kasir.db kasir.db.backup

# Linux/Mac
cp kasir.db kasir.db.backup
```

**Reset Database**
1. Tutup aplikasi (close server)
2. Hapus file `kasir.db`
3. Jalankan server lagi
4. Database baru terbuat otomatis

**Debugging**
Buka browser console (F12):
- Network requests → Network tab
- Errors → Console tab
- Data → Application → Local Storage tab

---

## 📊 CONTOH SKENARIO PENGGUNAAN

### Skenario 1: Warung Kopi Sederhana

**Produk:**
- Kopi Panas: Rp 12.000
- Kopi Dingin: Rp 15.000
- Teh Panas: Rp 8.000
- Es Campur: Rp 10.000

**Transaksi:**
- Customer 1: 2x Kopi Panas + 1x Es Campur = Rp 34.000
- Customer 2: 3x Kopi Dingin = Rp 45.000 (diskon Rp 5.000) = Rp 40.000

**Menggunakan Simulasi:**
```
POST /api/simulation/init → Instant data siap pakai!
```

### Skenario 2: Minimarket/Toko Retail

**Produk:**
- Susu UHT 1L: Rp 12.000 (Minuman)
- Roti Tawar: Rp 20.000 (Makanan)
- Sabun Cuci: Rp 8.000 (Keperluan)
- Snack Chitato: Rp 18.000 (Makanan)

**Transaksi:**
- Member: 2x Susu + 1x Roti + 3x Snack
- Total: Rp 88.000
- Member discount 10%: Rp 8.800
- Final: Rp 79.200
- Bayar: Rp 80.000
- Kembalian: Rp 800

---

## ⚙️ SETTING REKOMENDASI

### Untuk Warung/Kafe
- Kategori: Kopi, Teh, Makanan, Juice
- Stok: Kelola dari system
- Diskon: Untuk member atau paket hemat

### Untuk Minimarket
- Kategori: Minuman, Makanan, Keperluan, Alat
- Stok: Update harian
- Diskon: Pembelian banyak/bundling

### Untuk Restaurant
- Kategori: Appetizer, Main Course, Dessert, Beverage
- Stok: Per porsi atau unlimited
- Diskon: Seasonal promo

---

## 🧪 MODE SIMULASI

Fitur baru untuk testing aplikasi!

**Tombol di Tab "🧪 Simulasi":**

1. **🚀 Mulai Simulasi** - Init dengan 10 produk + 20 transaksi
2. **➕ Tambah 10** - Tambah 10 transaksi random
3. **➕ Tambah 5** - Tambah 5 produk random
4. **🗑️ Hapus Semua** - Clear transaksi (produk tetap)
5. **💣 Reset Total** - Hapus database completely
6. **🔄 Refresh** - Refresh statistik

**Statistik Real-time:**
- Total Produk
- Total Transaksi
- Total Revenue
- Items Terjual

---

## 🔍 TROUBLESHOOTING ADVANCED

**Issue: Produk muncul tapi tidak bisa diklik**
- Refresh browser (F5)
- Restart backend server
- Clear browser cache (Ctrl+Shift+Delete)

**Issue: Submit transaksi tapi tidak ada response**
- Cek backend masih jalan
- Lihat browser console (F12)
- Cek connection ke API

**Issue: Harga tidak format Rupiah**
- Refresh halaman
- Cek timezone/locale settings

---

## 📱 AKSES DARI DEVICE LAIN

Setelah aplikasi running di Linux:

1. Cari IP komputer:
```bash
ip addr show | grep "inet "
```

2. Dari device lain (phone, laptop), buka browser:
```
http://<IP_ADDRESS>:5000
```

> ⚠️ Hanya untuk jaringan lokal!

---

## 🚀 PENGEMBANGAN LEBIH LANJUT

Fitur yang bisa ditambahkan di masa depan:
- 🔐 Authentication/Login
- 📊 Dashboard dan Analytics
- 🖨️ Print Struk/Receipt
- 📱 Mobile App Version
- 💾 Export Laporan (PDF/Excel)
- ⚙️ Admin Panel
- 🔔 Notifikasi Stok Habis
- 💳 Integrasi Pembayaran (Midtrans, dll)

### Tips Development

Jika mau develop lebih lanjut:

**Add New Feature:**
1. Identify fitur yang mau ditambah
2. Add API endpoint di backend
3. Add UI component di frontend
4. Test thoroughly

**File Structure untuk Development:**
```
backend/
  src/
    middleware/     ← Auth, logging
    controllers/    ← Business logic
    models/         ← Data validations
    utils/          ← Helper functions
```

---

## 📝 CATATAN PENTING

- Database SQLite otomatis dibuat di folder root (`kasir.db`)
- Pastikan port 5000 tidak digunakan aplikasi lain
- Browser modern dengan JavaScript enabled diperlukan
- Untuk development, gunakan file `.env` untuk konfigurasi port

---

## 🎯 QUICK COMMANDS

**Windows:**
```bash
start.bat              # Jalankan semua service
```

**Linux/Mac:**
```bash
./start.sh             # Jalankan semua service
chmod +x *.sh          # Buat script executable
./install.sh           # Install dependencies
```

---

**Dibuat untuk:** Tugas Informatika  
**Versi:** 2.0.0 (dengan Simulasi Mode)  
**Last Updated:** April 2026
