import { showBigPicture } from './big-picture.js';
import { renderPosts } from './posts.js';

const container = document.querySelector('.pictures');

const renderGallery = (posts) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-post-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = posts.find(
      (item) => item.id === +posts.dataset.postId
    );
    showBigPicture(picture);
  });

  renderPosts(posts, container);
};

export { renderGallery };
