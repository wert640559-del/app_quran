# Al-Qur'an Web

Website untuk membaca Al-Qur'an dengan terjemahan bahasa Indonesia.

## Fitur

- Daftar semua surah Al-Qur'an
- Detail surah dengan ayat-ayat dan terjemahan
- Pencarian surah
- Sistem komentar untuk setiap surah
- Desain responsif (mobile-friendly)

## Cara Menjalankan

1. Buka file \index.html\ di browser web
2. Atau gunakan live server jika tersedia

## Struktur Project

\\\
project-quran/
├── index.html                # Halaman daftar surah
├── detail.html               # Halaman detail surah
├── assets/
│   ├── css/
│   │   └── styles.css        # Stylesheet utama
│   └── img/                  # Folder untuk gambar
└── src/
    ├── main.js               # Entry point JavaScript
    └── modules/
        ├── api.js            # Fungsi fetch data dari API
        ├── ui.js             # Fungsi render UI
        ├── storage.js        # Penyimpanan komentar
        └── utils.js          # Fungsi utilitas
\\\

## API yang Digunakan

Menggunakan API dari [Quran API by SutanLab](https://api.quran.sutanlab.id)

## Teknologi

- HTML5
- CSS3 (Grid, Flexbox, Media Queries)
- JavaScript ES6+ (Modules, async/await)
- Local Storage untuk penyimpanan komentar

## Browser Support

Website ini mendukung browser modern yang mendukung:
- ES6 Modules
- Fetch API
- CSS Grid dan Flexbox
- Local Storage
