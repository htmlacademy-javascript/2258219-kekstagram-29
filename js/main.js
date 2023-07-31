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
rerenderPosts();

/*
Воспользуйтесь приёмом «устранение дребезга»,
чтобы при переключении фильтра обновление списка элементов,
подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.

setEyesClick(debounce(
      () => renderSimilarList(wizards),
      RERENDER_DELAY,
    ));


const RERENDER_DELAY = 500;
*/
