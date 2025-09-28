export async function fetchSurahList() {
  try {
    const cache = localStorage.getItem('surahList');
    if (cache) return JSON.parse(cache);

    const res = await fetch('https://equran.id/api/v2/surat');
    if (!res.ok) throw new Error('Gagal mengambil data surah');

    const data = await res.json();
    localStorage.setItem('surahList', JSON.stringify(data.data));
    return data.data;
  } catch (err) { throw err; }
}

export async function fetchSurahDetail(id) {
  try {
    const res = await fetch(https://equran.id/api/v2/surat/);
    if (!res.ok) throw new Error('Gagal mengambil detail surah');

    const data = await res.json();
    return data.data;
  } catch (err) { throw err; }
}
