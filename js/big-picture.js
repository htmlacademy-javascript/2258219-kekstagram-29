const COMMENT_STEP = 5;

const body = document.querySelector('body');
const cancelButton = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');

// Комментарии
const commentsList = document.querySelector('.social__comments');
const commentsTotalCount = document.querySelector('.comments-count');
const commentsShownCount = document.querySelector('.comments-shown-count');
const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsCounter = document.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let commentsShowed = 0;
let allComments = [];

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
  commentsShowed += COMMENT_STEP;
  if (commentsShowed >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShowed = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const commentsFragment = document.createDocumentFragment();
  for(let i = 0; i < commentsShowed; i++) {
    const comment = fillCommentInfo(comments[i]);
    commentsFragment.append(comment);
  }

  commentsList.innerHTML = '';
  commentsList.append(commentsFragment);
  commentsShownCount.textContent = commentsShowed;
  commentsTotalCount.textContent = comments.length;
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  commentsShowed = 0;
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

const onCommentsLoaderClick = () => renderComments(allComments);

cancelButton.addEventListener('click', onCancelButtonClick);

const showBigPicture = (data) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  commentsCounter.classList.add('.hidden');
  document.addEventListener('keydown', onDocumentKeyDown);

  fillBigPictureInfo(data);
  allComments = data.comments;
  if (allComments.length > 0) {
    renderComments(allComments);
  }
};

export { showBigPicture };
