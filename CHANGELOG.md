# Changelog

Semua perubahan penting pada proyek ini akan dicatat di file ini. Format ini terinspirasi dari [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.2] - 2026-06-15

### Added
- **Version Frontend**: Menambahkan fungsi untuk menampilkan versi frontendnya. Diganti package.json

### Edited
- **Tabel Transaction**: Membuat dan menambahkan image untuk service dan sparepart

## [1.0.1] - 2026-06-12

### Added
- **Ganti setting ecosystem**: mengganti settingan pm2 untuk bisa run versi 10 dengan intepreter

## [1.0.0] - 2026-06-12

### Added
- **Form Transaksi Utama**: Integrasi data kendaraan, pilihan bengkel, nomor nota, pencatatan KM, dan manajemen tanggal transaksi.
- **Modul Detail Service**: Fitur sub-modal tambah/edit/hapus service beserta unggah foto bukti pengerjaan.
- **Modul Detail Sparepart**: Fitur sub-modal manajemen sparepart (QTY, harga satuan, batas KM/waktu garansi, opsi reminder).
- **Kalkulasi Otomatis (UX/UI)**: 
  - Live formatting mata uang Rupiah (`Rp 150.000`) langsung saat mengetik.
  - Penguncian otomatis Biaya Bruto dari total akumulasi Service + Sparepart.
  - Live kalkulasi Biaya Netto setelah dikurangi diskon dan ditambah PPN.
- **Fitur Preview Foto**: Modal mini pop-up untuk melihat langsung (*live client preview*) foto nota, service, atau sparepart yang diunggah sebelum data disimpan.
- **Core API Fetcher**: Setup helper `apiClient` (JSON) dan `apiWithFile` (Form Data/Multipart) dengan dukungan dinamis Environment Variable.