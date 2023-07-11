const bigPicture = document.querySelector('.big-picture');

// Комментарии
const commentsList = document.querySelector('.social__comments');
const commentsElement = commentsList.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();

// Подставляем новые данные изображения
// Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.
const renderBigPicture = ({url, comments, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  return bigPicture;
};

// Подставляем новые данные комментария
const renderComments = (comments) => {
  comments.forEach = (({avatar, message, name}) => {
    commentsElement.querySelector('.social__picture').src = avatar;
    commentsElement.querySelector('.social__picture').alt = name;
    commentsElement.querySelector('.social__text').textContent = message;
    commentsFragment.append(commentsElement);
  });
  commentsList.append(commentsFragment);
  return commentsList;
};

export { renderComments, renderBigPicture };
/*
отрисованное связать с масссивом через id(dataset), .find и проверка на соответствие
обработчик клика поставить на  весь контейнер(прример из демонстрации)
*/
