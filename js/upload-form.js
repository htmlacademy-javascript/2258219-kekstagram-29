import { imageUploadForm, pristine } from './validation.js';
import { sendData } from './api.js';
import { resizeImage, deleteResizeImage } from './picture-sizing.js';
import { resetEffects, setEffects } from './picture-effects.js';
import { showAlert } from './util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const body = document.querySelector('body');
const editingWindow = document.querySelector('.img-upload__overlay');
const imageUpload = document.querySelector('.img-upload__input');
const picturePreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

// Inputs and form's buttons
const cancelButton = imageUploadForm.querySelector('.img-upload__cancel');
const submitButton = imageUploadForm.querySelector('.img-upload__submit');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

//Modal messages
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);
const errorButton = errorElement.querySelector('.error__button');
const errorInner = errorElement.querySelector('.success__inner');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const successButton = successElement.querySelector('.success__button');
const successInner = successElement.querySelector('.success__inner');

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

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

function onDocumentKeyDown (evt) {
  if(evt.key === 'Escape' && !isTextFieldFocused()){
    evt.preventDefault();
    hideModal();
  }
}
const onFileInputChange = () => {

  const file = imageUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (file && matches) {
    picturePreview.src = URL.createObjectURL(file);
    effectPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url('${picturePreview.src}')`;
    });
  }
  showModal();
};

const onOutBoundariesClick = (evt) => {
  if (evt.target === successElement && evt.target !== successInner) {
    body.removeChild(successElement);
  }
  if (evt.target === errorElement && evt.target !== errorInner) {
    body.removeChild(errorElement);
  }
};

const onMessageButtonClick = (evt) => {
  if (evt.target === successButton) {
    body.removeChild(successElement);
  }
  if (evt.target === errorButton) {
    body.removeChild(errorElement);
  }
};

const showSuccess = () => {
  body.appendChild(successElement);
  successButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('click', onOutBoundariesClick);
};

const showError = () => {
  body.appendChild(errorElement);
  errorButton.addEventListener('click', onMessageButtonClick);
  document.addEventListener('click', onOutBoundariesClick);
};

const setForm = (onSuccess) => {
  imageUpload.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButton);

  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => showSuccess())
        .then(onSuccess)
        .catch(
          (err) => {
            showAlert(err.message);
          })
        .finally(unblockSubmitButton);
    } else {
      showError();
    }
  });
};

export { setForm, hideModal };
