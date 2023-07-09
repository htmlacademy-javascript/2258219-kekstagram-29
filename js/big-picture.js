import { createComment } from './data.js';
import { posts } from './posts.js';
// import { postTemplate, showPictures } from './posts.js';

const bigPicture = document.querySelector('.big-picture');

// Комментарии
const commentsList = document.querySelector('.social__comments');
const commentElement = createComment();
const commentsFragment = document.createDocumentFragment();

// Подставляем новые данные изображения
// Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.
const bigPictureTemplate = () => {
  posts.forEach(({url, comments, likes, description}) => {
    bigPicture.querySelector('.big-picture__img').src = url; // Не уверена правильно ли переписала данные(по многим причинам код не работает, так что сложно проверять)
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.likes__count').textContent = likes;
    bigPicture.querySelector('.social__caption').textContent = description;
  });
};

// Подставляем новые данные комментария
commentElement.forEach(({avatar, message, name}) => { //"commentElement.forEach is not a function"
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  commentsFragment.appendChild(commentElement);
});

const renderComments = () => commentsList.append(commentElement);
export { renderComments, bigPictureTemplate, bigPicture, posts };
