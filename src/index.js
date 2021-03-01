import './sass/styles.scss';
import menuTemplate from './templates/menu.hbs';
import storage from './modules/storage';
import menu from './menu.json';

const refs = {
  menu: document.querySelector('.js-menu'),
  togglerBtn: document.querySelector('#theme-switch-toggle'),
  body: document.querySelector('body'),
};

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const addInitialTheme = () => {
  const savedTheme = storage.load('theme');

  if (savedTheme) {
    refs.body.classList.add(savedTheme);
    refs.togglerBtn.checked = savedTheme === Theme.DARK ? true : false;
  } else {
    refs.body.classList.add(Theme.LIGHT);
    storage.save('theme', Theme.LIGHT);
    refs.togglerBtn.checked = false;
  }
};

const toggleBtnHandler = e => {
  if (e.target.checked) {
    refs.body.classList.replace(Theme.LIGHT, Theme.DARK);
    storage.save('theme', Theme.DARK);
    e.target.checked = true;
  } else {
    refs.body.classList.replace(Theme.DARK, Theme.LIGHT);
    storage.save('theme', Theme.LIGHT);
    e.target.checked = false;
  }
};

// Изначальная разметка меню
const markup = menuTemplate(menu);
refs.menu.insertAdjacentHTML('afterbegin', markup);
addInitialTheme();

refs.togglerBtn.addEventListener('click', toggleBtnHandler);
