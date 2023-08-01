import { imageUploadForm, pristine } from './validation.js';
import { sendData } from './api.js';
import { resizeImage, deleteResizeImage } from './picture-sizing.js';
import { resetEffects, setEffects } from './picture-effects.js';
import { showAlert } from './util.js';

const INVALID_MESSAGE = 'Введённые данные невалидны';
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

const setForm = (onSuccess) => {
  imageUpload.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButton);

  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          (err) => {
            showAlert(err.message);
          })
        .finally(unblockSubmitButton);
    } else {
      showAlert(INVALID_MESSAGE);
    }
  });
};

export { setForm, hideModal };
