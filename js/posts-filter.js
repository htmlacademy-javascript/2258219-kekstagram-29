import { fillPostInfo } from './posts.js';

const RANDOM_POSTS_COUNT = 10;
const filterButtons = document.querySelectorAll('.img-filters__button');

const setFilter = (evt, pictures) => {
  const buttonId = evt.target.id;
  //console.log(pictures); undefind
  if(buttonId === 'filter-default') {
    return [...pictures];
  }

  if(buttonId === 'filter-random') {
    return [...pictures].sort(() => Math.random() - 0.5)
      .slice(0,RANDOM_POSTS_COUNT - 1);
  }

  if(buttonId === 'filter-discussed') {
    return [...pictures].sort((a, b) => b.comments.length - a.comments.length);
  }
};

const onButtonClick = (evt, pictures) => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  const activeButton = evt.target;
  activeButton.classList.add('img-filters__button--active');

  fillPostInfo(setFilter(evt, pictures));
};

const rerenderPosts = () => {
  filterButtons.forEach((button) => button.addEventListener('click', onButtonClick));
};

export { rerenderPosts };
