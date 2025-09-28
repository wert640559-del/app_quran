import { saveBookmark, removeBookmark, getBookmarks, saveNote, getNotes } from './storage.js';
export function renderSurahList(container, surahList, user) {
  container.innerHTML = '';
  surahList.forEach(surah => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = <a href='detail.html?id=\'><strong>\. \</strong> - \ ayat</a>;
    container.appendChild(card);
  });
}
export function renderAyatList(container, ayatList, user, surahId) {
  container.innerHTML = '';
  const bookmarks = getBookmarks(user);
  const notes = getNotes(user);
  ayatList.forEach(ayat => {
    const card = document.createElement('div');
    card.classList.add('card');
    const isBookmarked = bookmarks[surahId]?.includes(ayat.nomor);
    card.innerHTML = \
      <p><strong>\</strong> \</p>
      <p>\</p>
      <div>
        <span class="bookmark" data-ayat="\">\</span>
        <input type="text" class="note" placeholder="Catatan..." value="\">
      </div>\;
    container.appendChild(card);
    const bookmarkEl = card.querySelector('.bookmark');
    bookmarkEl.addEventListener('click', () => {
      if (bookmarks[surahId]?.includes(ayat.nomor)) { removeBookmark(user, surahId, ayat.nomor); bookmarkEl.textContent='☆'; }
      else { saveBookmark(user, surahId, ayat.nomor); bookmarkEl.textContent='★'; }
    });
    const noteInput = card.querySelector('.note');
    noteInput.addEventListener('input', e => { saveNote(user, surahId, ayat.nomor, e.target.value); });
  });
}
