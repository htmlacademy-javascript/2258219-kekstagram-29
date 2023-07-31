import { showBigPicture } from './big-picture.js';
import { renderPosts } from './posts.js';

const container = document.querySelector('.pictures');
let posts = [];

const onContainerClick = (evt) => {
  const thumbnail = evt.target.closest('[data-post-id]');
  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = posts.find(
    (item) => item.id === +thumbnail.dataset.postId
  );
  showBigPicture(picture);
};

const renderGallery = (currentPosts) => {
  posts = currentPosts;
  container.addEventListener('click', onContainerClick);
  renderPosts(posts, container);
};

export { renderGallery };
