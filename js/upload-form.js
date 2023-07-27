import { imageUploadForm, pristine } from './validation.js';
import { sendData } from './api.js';
import { resizeImage, deleteResizeImage } from './picture-sizing.js';
import { resetEffects, setEffects } from './picture-effects.js';
//import { showAlert } from './util.js';
const body = document.querySelector('body');

const editingWindow = document.querySelector('.img-upload__overlay');
const imageUpload = document.querySelector('.img-upload__input');
const cancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const isTextFieldFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;


const showModal = () => {
  editingWindow.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  resizeImage();
  setEffects();
};


const hideModal = () => {
  imageUploadForm.reset();
  pristine.reset();
  editingWindow.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  deleteResizeImage();
  resetEffects();
};

const onCancelButton = () => {
  hideModal();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  hideModal();
};

function onDocumentKeyDown (evt) {
  if(evt.key === 'Escape' && !isTextFieldFocused()){
    evt.preventDefault();
    hideModal();
  }
}
const onFileInputChange = () => {
  showModal();
};

const setForm = () => {
  imageUpload.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButton);

  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      hideModal();
      sendData(new FormData(evt.target));
      submitButton.addEventListener('click', onFormSubmit);
    }
  });
};

export { setForm };
