import { renderPosts } from './posts.js';
import { debounce } from './util.js';

const TIMEOUT = 500;

const RANDOM_POSTS_COUNT = 10;

const filterForm = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');
const container = document.querySelector('.pictures');

const setFilter = (pictures, activeButton) => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  activeButton.classList.add('img-filters__button--active');
  if(activeButton === defaultFilter) {
    return[...pictures];
  }

  if(activeButton === randomFilter) {
    return [...pictures]
      .sort(() => Math.random() - 0.5)
      .slice(0,RANDOM_POSTS_COUNT);
  }

  if(activeButton === discussedFilter) {
    return [...pictures]
      .sort((a, b) => b.comments.length - a.comments.length);
  }
};

const onButtonClick = (evt, pictures) => {
  renderPosts(setFilter(pictures, evt.target), container);
};

const rerenderPosts = (pictures) => {
  filterForm.addEventListener('click', debounce((evt) => {
    onButtonClick(evt, pictures);
  }, TIMEOUT));
};

export { rerenderPosts };
