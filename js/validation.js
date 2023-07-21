const imageUploadForm = document.querySelector('#upload-select-image');
const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'hashtag__error'
}, true);

const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

const HASHTAGS_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;
const HASHTAG_ERRORS = {
  hashtag: ['Хэштег должен начинаться с "#" и содержать буквы и числа (не более ', HASHTAG_MAX_LENGTH, ' символов)'].join(''),
  hashtagCount: ['Количество хэштегов должно быть не более', HASHTAGS_MAX_COUNT].join(' '),
  description: ['Длина комментария не может составлять больше ', MAX_DESCRIPTION_LENGTH,' символов'].join('')
};

const convertHashtagsToArray = (element) => element.toLowerCase().split(' ').filter((el) => el);

const validateHashtag = (hashtags) => {
  const newHashtags = convertHashtagsToArray(hashtags);
  const alph = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/i;
  const isValid = (hashtag) => alph.test(hashtag);
  return newHashtags.every(isValid);
};

const validateHashtagCount = (hashtags) => {
  const newHashtags = convertHashtagsToArray(hashtags);
  return newHashtags.length <= HASHTAGS_MAX_COUNT;
};

const validateDescription = (element) => element.length <= MAX_DESCRIPTION_LENGTH;

pristine.addValidator(hashtagInput, validateHashtag, HASHTAG_ERRORS.hashtag);
pristine.addValidator(hashtagInput, validateHashtagCount, HASHTAG_ERRORS.hashtagCount, 4);
pristine.addValidator(commentInput, validateDescription, HASHTAG_ERRORS.description);

const validateForm = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

export { validateForm, imageUploadForm, pristine };
