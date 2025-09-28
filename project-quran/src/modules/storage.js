export function setTheme(theme) { localStorage.setItem('theme', theme); }
export function getTheme() { return localStorage.getItem('theme') || 'light'; }
export function saveBookmark(user, surahId, ayat) {
  const bookmarks = JSON.parse(localStorage.getItem(ookmark_\) || '{}');
  if (!bookmarks[surahId]) bookmarks[surahId] = [];
  if (!bookmarks[surahId].includes(ayat)) bookmarks[surahId].push(ayat);
  localStorage.setItem(ookmark_\, JSON.stringify(bookmarks));
}
export function removeBookmark(user, surahId, ayat) {
  const bookmarks = JSON.parse(localStorage.getItem(ookmark_\) || '{}');
  if (bookmarks[surahId]) bookmarks[surahId] = bookmarks[surahId].filter(a => a !== ayat);
  localStorage.setItem(ookmark_\, JSON.stringify(bookmarks));
}
export function getBookmarks(user) { return JSON.parse(localStorage.getItem(ookmark_\) || '{}'); }
export function saveNote(user, surahId, ayat, note) {
  const notes = JSON.parse(localStorage.getItem(
otes_\) || '{}');
  if (!notes[surahId]) notes[surahId] = {};
  notes[surahId][ayat] = note;
  localStorage.setItem(
otes_\, JSON.stringify(notes));
}
export function getNotes(user) { return JSON.parse(localStorage.getItem(
otes_\) || '{}'); }
