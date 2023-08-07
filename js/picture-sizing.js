const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const image = document.querySelector('.img-upload__preview img');

const SCALE_CONTROL = {
  step: 25,
  maxValue: 100,
  minValue: 25,
  defaultValue: 100
};

const onButtonSmallerClick = () => {
  if (parseInt(scaleValue.value, 10) > SCALE_CONTROL.minValue) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) - SCALE_CONTROL.step }%`;
    image.style.transform = `scale(${parseInt(scaleValue.value, 10) / 100})`;
  }
};

const onButtonBiggerClick = () => {
  if (parseInt(scaleValue.value, 10) < SCALE_CONTROL.maxValue) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) + SCALE_CONTROL.step }%`;
    image.style.transform = `scale(${parseInt(scaleValue.value, 10) / 100})`;
  }
};

const resizeImage = () => {
  buttonBigger.addEventListener('click', onButtonBiggerClick);
  buttonSmaller.addEventListener('click', onButtonSmallerClick);
};

const deleteResizeImage = () => {
  image.removeAttribute('style');
  buttonBigger.removeEventListener('click', onButtonBiggerClick);
  buttonSmaller.removeEventListener('click', onButtonSmallerClick);
};

export { resizeImage, deleteResizeImage };
