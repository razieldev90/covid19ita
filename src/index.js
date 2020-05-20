import './scss/main.scss';
import { run } from './app/app';


window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.spinner').classList.add('show');
  setTimeout(run, 2000);
})
