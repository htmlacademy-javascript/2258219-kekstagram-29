import { validateForm } from './validation.js';
const body = document.querySelector('body');

const imageUploadForm = document.querySelector('#upload-select-image');
const editingWindow = document.querySelector('.img-upload__overlay');
const pristine = new Pristine(imageUploadForm);
const imageUpload = document.querySelector('.img-upload__input');
const cancelButton = imageUploadForm.querySelector('.img-upload__cancel');

const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const isTextFieldFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;


const showModal = () => {
  editingWindow.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
};


const hideModal = () => {
  imageUploadForm.reset();
  pristine.reset();
  editingWindow.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

const onCancelButton = () => {
  hideModal();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  validateForm();
  //hideModal();
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

const uploadPost = () => {
  imageUpload.addEventListener('change', onFileInputChange); //imageUpload.addEventListener('change', showModal())
  cancelButton.addEventListener('click', onCancelButton);
  imageUploadForm.addEventListener('submit', onFormSubmit);
};

export { uploadPost };
