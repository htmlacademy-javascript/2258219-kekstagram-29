import { renderGallery } from './gallery.js';
import { setForm } from './upload-form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { hideModal } from './upload-form.js';
import { rerenderPosts } from './posts-filter.js';

const imageSort = document.querySelector('.img-filters');
getData()
  .then((posts) => {
    renderGallery(posts);
    rerenderPosts(posts);
  })
  .then(() => {
    imageSort.classList.remove('img-filters--inactive');
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setForm(hideModal);
