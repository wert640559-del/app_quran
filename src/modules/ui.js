import { saveBookmark, removeBookmark, getBookmarks, saveNote, getNotes } from './storage.js';

let currentPlayingAyat = null;

export function renderSurahList(container, surahList, user) {
  container.innerHTML = '';
  surahList.forEach(surah => {
    const card = document.createElement('div');
    card.classList.add('card');
    const namaSurah = surah.namaLatin || surah.nama;
    card.innerHTML = `<a href='detail.html?id=${surah.nomor}'><strong>${surah.nomor}. ${namaSurah}</strong> - ${surah.jumlahAyat} ayat</a>`;
    container.appendChild(card);
  });
}

export function renderAyatList(container, ayatList, user, surahId, selectedQari='01') {
  container.innerHTML = '';
  const bookmarks = getBookmarks(user);
  const notes = getNotes(user);

  ayatList.forEach(ayat => {
    const card = document.createElement('div');
    card.classList.add('card');
    const isBookmarked = bookmarks[surahId]?.includes(ayat.nomorAyat);

    card.innerHTML = `
      <p><strong>${ayat.nomorAyat}</strong> ${ayat.teksArab}</p>
      <p>${ayat.teksIndonesia}</p>
      <div>
        <span class="bookmark">${isBookmarked ? '★' : '☆'}</span>
        <input type="text" class="note" placeholder="Catatan..." value="${notes[surahId]?.[ayat.nomorAyat] || ''}">
        <button class="play-ayat">▶️</button>
        <a href="${ayat.audio[selectedQari]}" download>⬇️</a>
      </div>
    `;

    container.appendChild(card);

    const bookmarkEl = card.querySelector('.bookmark');
    const noteInput = card.querySelector('.note');
    const playBtn = card.querySelector('.play-ayat');

    bookmarkEl.addEventListener('click', () => {
      if (bookmarks[surahId]?.includes(ayat.nomorAyat)) {
        removeBookmark(user, surahId, ayat.nomorAyat);
        bookmarkEl.textContent = '☆';
      } else {
        saveBookmark(user, surahId, ayat.nomorAyat);
        bookmarkEl.textContent = '★';
      }
    });

    noteInput.addEventListener('input', e => {
      saveNote(user, surahId, ayat.nomorAyat, e.target.value);
    });

    playBtn.addEventListener('click', () => {
      if(currentPlayingAyat) {
        currentPlayingAyat.audio.pause();
        currentPlayingAyat.card.classList.remove('playing');
      }
      const audio = new Audio(ayat.audio[selectedQari]);
      currentPlayingAyat = { audio, card };
      card.classList.add('playing');
      audio.play();
      audio.onended = () => {
        card.classList.remove('playing');
        currentPlayingAyat = null;
      };
    });
  });
}
