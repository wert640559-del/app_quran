import { getTheme, setTheme } from './storage.js';

export function applyTheme() {
  const theme = getTheme();
  if(theme === 'dark') document.body.classList.add('dark');
  else document.body.classList.remove('dark');
}

export function toggleTheme() {
  if(document.body.classList.contains('dark')){
    document.body.classList.remove('dark');
    setTheme('light');
  } else {
    document.body.classList.add('dark');
    setTheme('dark');
  }
}
