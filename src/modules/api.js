export async function fetchSurahList() {
  try {
    const cache = localStorage.getItem('surahList');
    if (cache) return JSON.parse(cache);

    const res = await fetch('./src/data/surat.json');
    if (!res.ok) throw new Error('Gagal mengambil daftar surah');

    const json = await res.json();
    const data = json.data;
    localStorage.setItem('surahList', JSON.stringify(data));
    return data;
  } catch (err) {
    throw err;
  }
}

export async function fetchSurahDetail(id) {
  try {
    const res = await fetch(`./src/data/surah-${id}.json`);
    if (!res.ok) throw new Error(`Gagal mengambil detail surah ${id}`);

    const json = await res.json();
    return json.data;
  } catch (err) {
    throw err;
  }
}
