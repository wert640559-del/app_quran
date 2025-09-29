import { fetchSurahList, fetchSurahDetail } from './modules/api.js';
import { renderSurahList, renderAyatList } from './modules/ui.js';
import { applyTheme, toggleTheme } from './modules/theme.js';

applyTheme();
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);

const user = 'defaultUser';
const qariSelect = document.getElementById('qari');
let selectedQari = localStorage.getItem('selectedQari') || '01';
if (qariSelect) qariSelect.value = selectedQari;
qariSelect?.addEventListener('change', e => {
  selectedQari = e.target.value;
  localStorage.setItem('selectedQari', selectedQari);
});

if(window.location.pathname.endsWith('index.html')) {
  const surahListEl = document.getElementById('surahList');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const searchEl = document.getElementById('searchSurah');
  const sortEl = document.getElementById('sortSurah');
  let surahList = [];

  async function loadSurah() {
    try {
      loadingEl.style.display = 'block';
      surahList = await fetchSurahList();
      renderSurahList(surahListEl, surahList, user);
    } catch(err) { errorEl.textContent = err.message; }
    finally { loadingEl.style.display = 'none'; }
  }
  loadSurah();

  searchEl.addEventListener('input', e => {
    const val = e.target.value.toLowerCase();
    const filtered = surahList.filter(s => 
  s.nama.toLowerCase().includes(val) || 
  s.namaLatin.toLowerCase().includes(val) || 
  String(s.nomor).includes(val)
);

    renderSurahList(surahListEl, filtered, user);
  });

  sortEl.addEventListener('change', e => {
    const type = e.target.value;
    const sorted = [...surahList].sort((a,b) => type==='name' ? a.nama.localeCompare(b.nama) : a.nomor - b.nomor);
    renderSurahList(surahListEl, sorted, user);
  });
} else if (window.location.pathname.endsWith('detail.html')) {
  const params = new URLSearchParams(window.location.search);
  const surahId = params.get('id');
  const ayatListEl = document.getElementById('ayatList');
  const loadingEl = document.getElementById('loading');
  const errorEl = document.getElementById('error');
  const searchEl = document.getElementById('searchAyat');
  const surahTitleEl = document.getElementById('surahTitle');
  const playSurahBtn = document.getElementById('playSurah');
  let ayatList = [];
  let currentSurah = null; // ⬅️ untuk simpan data surah aktif

  const prevBtn = document.getElementById('prevSurah');
  const nextBtn = document.getElementById('nextSurah');

  prevBtn?.addEventListener('click', () => {
    const prevId = Math.max(1, parseInt(surahId) - 1);
    window.location.href = `detail.html?id=${prevId}`;
  });

  nextBtn?.addEventListener('click', () => {
    const nextId = Math.min(114, parseInt(surahId) + 1);
    window.location.href = `detail.html?id=${nextId}`;
  });

  async function loadDetail() {
    try {
      loadingEl.style.display = 'block';
      const surahDetail = await fetchSurahDetail(surahId);
      currentSurah = surahDetail; // ⬅️ simpan surah
      surahTitleEl.textContent = `${surahDetail.nama} (${surahDetail.nomor})`;
      ayatList = surahDetail.ayat;
      renderAyatList(ayatListEl, ayatList, user, surahId, selectedQari);

      // pakai fungsi playSurahFull
      playSurahBtn?.addEventListener('click', () => {
        playSurahFull(currentSurah);
      });
    } catch (err) {
      errorEl.textContent = err.message;
    } finally {
      loadingEl.style.display = 'none';
    }
  }

  loadDetail();

  searchEl.addEventListener('input', e => {
    const val = e.target.value.toLowerCase();
    const filtered = ayatList.filter(a =>
      a.teksIndonesia.toLowerCase().includes(val) ||
      a.teksLatin.toLowerCase().includes(val)
    );
    renderAyatList(ayatListEl, filtered, user, surahId, selectedQari);
  });

  document.getElementById('backList')
    ?.addEventListener('click', () => window.location.href = 'index.html');
}



// Ambil elemen audio global
const audioPlayer = new Audio();
let isPlaying = false;

// Fungsi play full surah
function playSurahFull(surah) {
  if (!surah || !surah.audioFull) {
    alert("Audio surah tidak tersedia.");
    return;
  }

  const playButton = document.getElementById("playSurah");

  if (isPlaying) {
    // kalau lagi play → pause
    audioPlayer.pause();
    isPlaying = false;
    if (playButton) playButton.textContent = "▶ Play Surah";
  } else {
    // ambil qari yang dipilih
    const qari = selectedQari || "05"; // default ke 05 (Misyari Rasyid)
    const audioUrl = surah.audioFull[qari];

    if (!audioUrl) {
      alert("Audio tidak tersedia untuk qari ini.");
      return;
    }

    // set sumber audio
    audioPlayer.src = audioUrl;
    audioPlayer.play().catch(err => console.error("Gagal memutar audio:", err));
    isPlaying = true;
    if (playButton) playButton.textContent = "⏸ Pause";

    // reset kalau selesai play
    audioPlayer.onended = () => {
      isPlaying = false;
      if (playButton) playButton.textContent = "▶ Play Surah";
    };
  }
}

const btnDeskripsi = document.getElementById("btn-deskripsi");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const closeSidebar = document.getElementById("close-sidebar");
const sidebarContent = document.getElementById("sidebar-content");
// Ambil surahId dari query string (?surah=1)
const urlParams = new URLSearchParams(window.location.search);
const surahId = urlParams.get("id");


// Contoh ambil data dari JSON (ganti dengan fetch sesuai project kamu)
async function loadSurahDetail(nomor) {
  const res = await fetch(`src/data/surah-${nomor}.json`);
  const data = await res.json();
  return data.data;
}

// Event buka sidebar
if (btnDeskripsi) {
  btnDeskripsi.addEventListener("click", async () => {
    if (!surahId) {
      sidebarContent.innerHTML = "Surah tidak ditemukan.";
    } else {
      const surah = await loadSurahDetail(surahId);
      sidebarContent.innerHTML = surah.deskripsi || "Deskripsi tidak tersedia.";
    }

    sidebar.classList.add("active");
    overlay.classList.add("active");
  });
}



// Event tutup sidebar
closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// Klik overlay untuk menutup
overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

hamburgerBtn?.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  navMenu.classList.toggle("active");
});

async function renderSurahDetail(surahId) {
  try {
    const res = await fetch(`src/data/surah-${surahId}.json`);
    const surah = await res.json();

    const container = document.getElementById("surahDetail");
    container.innerHTML = `<h2>${surah.data.namaLatin} (${surah.data.nama})</h2>`;

    // tampilkan ayat
    surah.data.ayat.forEach(ayat => {
      const ayatDiv = document.createElement("div");
      ayatDiv.className = "ayat-item";
      ayatDiv.innerHTML = `
        <p class="teks-arab">${ayat.teksArab}</p>
        <p class="teks-latin">${ayat.teksLatin}</p>
        <p class="teks-arti">${ayat.teksIndonesia}</p>
        <button class="btn-tafsir" data-ayat="${ayat.nomorAyat}">📖 Tafsir</button>
        <div class="tafsir-box" id="tafsir-${ayat.nomorAyat}" style="display:none;"></div>
      `;
      container.appendChild(ayatDiv);
    });

    // pasang event tombol tafsir
    document.querySelectorAll(".btn-tafsir").forEach(btn => {
      btn.addEventListener("click", async () => {
        const ayatNo = btn.getAttribute("data-ayat");
        const tafsirBox = document.getElementById(`tafsir-${ayatNo}`);

        if (tafsirBox.style.display === "none") {
          // ambil tafsir dari file lokal
          const tafsirRes = await fetch(`src/api-tafsir/tafsir-${surahId}.json`);
          const tafsirData = await tafsirRes.json();

          const tafsirAyat = tafsirData.data.tafsir.find(t => t.ayat == ayatNo);

          if (tafsirAyat) {
            tafsirBox.innerHTML = `<p>${tafsirAyat.teks}</p>`;
            tafsirBox.style.display = "block";
          } else {
            tafsirBox.innerHTML = `<p>Tafsir tidak tersedia.</p>`;
            tafsirBox.style.display = "block";
          }
        } else {
          tafsirBox.style.display = "none";
        }
      });
    });
  } catch (err) {
    console.error("Gagal render surah detail", err);
  }
}
