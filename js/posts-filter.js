/*
Добавьте обработчики изменения фильтров,
которые будут управлять порядком отрисовки элементов на странице:

По умолчанию — фотографии в изначальном порядке с сервера. img-filters__button--active" id="filter-default"
Случайные — 10 случайных, не повторяющихся фотографий. id="filter-random
Обсуждаемые — фотографии, отсортированные в порядке id="filter-discussed"
убывания количества комментариев.
При переключении фильтра все фотографии,
отрисованные ранее, нужно убрать и вместо них показать те,
которые подходят под новые условия.

        <button type=button class="img-filters__button  img-filters__button--active" id="filter-default">По умолчанию</button>
        <button type=button class="img-filters__button" id="filter-random">Случайные</button>
        <button type=button class="img-filters__button" id="filter-discussed">Обсуждаемые</button>
*/
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
