import { fetchSurahList, fetchSurahDetail } from './modules/api.js';
import { renderSurahList, renderAyatList } from './modules/ui.js';
import { applyTheme, toggleTheme } from './modules/theme.js';
applyTheme();
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
const user='defaultUser';
if (window.location.pathname.endsWith('index.html')) {
  const surahListEl=document.getElementById('surahList');
  const loadingEl=document.getElementById('loading');
  const errorEl=document.getElementById('error');
  const searchEl=document.getElementById('searchSurah');
  const sortEl=document.getElementById('sortSurah');
  let surahList=[];
  async function loadSurah(){
    try { loadingEl.style.display='block'; surahList=await fetchSurahList(); renderSurahList(surahListEl,surahList,user); }
    catch(err){ errorEl.textContent=err.message; }
    finally{ loadingEl.style.display='none'; }
  }
  loadSurah();
  searchEl.addEventListener('input',e=>{ const val=e.target.value.toLowerCase(); const filtered=surahList.filter(s=>s.nama.toLowerCase().includes(val)||String(s.nomor).includes(val)); renderSurahList(surahListEl,filtered,user); });
  sortEl.addEventListener('change',e=>{ const type=e.target.value; const sorted=[...surahList].sort((a,b)=>type==='name'?a.nama.localeCompare(b.nama):a.nomor-b.nomor); renderSurahList(surahListEl,sorted,user); });
} else if (window.location.pathname.endsWith('detail.html')) {
  const params=new URLSearchParams(window.location.search);
  const surahId=params.get('id');
  const ayatListEl=document.getElementById('ayatList');
  const loadingEl=document.getElementById('loading');
  const errorEl=document.getElementById('error');
  const searchEl=document.getElementById('searchAyat');
  const surahTitleEl=document.getElementById('surahTitle');
  let ayatList=[];
  async function loadDetail(){
    try { loadingEl.style.display='block'; const surahDetail=await fetchSurahDetail(surahId); surahTitleEl.textContent=\\ (\)\; ayatList=surahDetail.ayat; renderAyatList(ayatListEl,ayatList,user,surahId); }
    catch(err){ errorEl.textContent=err.message; }
    finally{ loadingEl.style.display='none'; }
  }
  loadDetail();
  searchEl.addEventListener('input',e=>{ const val=e.target.value.toLowerCase(); const filtered=ayatList.filter(a=>a.id.toLowerCase().includes(val)); renderAyatList(ayatListEl,filtered,user,surahId); });
  document.getElementById('backList').addEventListener('click',()=>{ window.location.href='index.html'; });
}
