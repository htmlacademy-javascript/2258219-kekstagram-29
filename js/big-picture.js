const bodyElement = document.querySelector('body');
const cancelButton = document.querySelector('.big-picture__cancel');

//Pictures
const bigPicture = document.querySelector('.big-picture');
const commentsLoader = bigPicture.querySelector('.comments-loader');

// Комментарии
const commentsList = document.querySelector('.social__comments');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');
const commentCount = document.querySelector('.social__comment-count');

// Подставляем новые данные изображения
const fillBigPictureInfo = ({url, comments, likes, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  return bigPicture;
};

// Подставляем новые данные комментария
const fillCommentInfo = (({avatar, message, name}) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
});

const renderComments = (comments) => {
  commentsList.innerHTML = '';

  const commentsFragment = document.createDocumentFragment();
  comments.forEach((item) => {
    const comment = fillCommentInfo(item);
    commentsFragment.append(comment);
  });
  commentsList.append(commentsFragment);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

function onDocumentKeyDown (evt) {
  if(evt.key === 'Escape'){
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

cancelButton.addEventListener('click', onCancelButtonClick);

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('.hidden');
  document.addEventListener('keydown', onDocumentKeyDown);

  fillBigPictureInfo(data);
  renderComments(data.comments);
};

export { showBigPicture, fillBigPictureInfo };
