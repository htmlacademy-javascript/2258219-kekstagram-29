import { renderGallery } from './gallery.js';
import { setForm } from './upload-form.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
setForm();

getData()
  .then((posts) => {
    renderGallery(posts);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );


