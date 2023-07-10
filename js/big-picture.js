// import { createPost, createComment } from './data.js';

const bigPicture = document.querySelector('.big-picture');

// Комментарии
const commentsList = document.querySelector('.social__comments');
const commentsElement = commentsList.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

// Подставляем новые данные изображения
// Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.
const renderBigPicture = ({url, comments, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url; // Не подставляются данные? Все возвращается с undefind/null: console.log(renderBigPicture(renderPictures/posts));
  bigPicture.querySelector('.comments-count').textContent = comments;//.length - cannot read property
  bigPicture.querySelector('.likes__count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};


// Подставляем новые данные комментария
const renderComments = (comments) => {
  comments.forEach = (({avatar, message, name}) => { // console.log(renderComments(createComment); возвращает undefind //console.log(createPost().comments); возвращает array createPost
    commentsElement.querySelector('.social__picture').src = avatar;
    commentsElement.querySelector('.social__picture').alt = name;
    commentsElement.querySelector('.social__text').textContent = message;
    commentsFragment.append(commentsElement);
  });
  commentsList.append(commentsFragment);
};

export { renderComments, renderBigPicture };
/*
отрисованное связать с масссивом через id(dataset), .find и проверка на соответствие
обработчик клика поставить на  весь контейнер(прример из демонстрации)
*/
