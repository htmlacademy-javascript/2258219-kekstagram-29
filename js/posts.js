const postTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture') ;


const fillPostInfo = ({url, description, comments, likes}) => {
  const postElement = postTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').src = url;
  postElement.querySelector('.picture__img').alt = description;
  postElement.querySelector('.picture__comments').textContent = comments.length;
  postElement.querySelector('.picture__likes').textContent = likes;
  return postElement;
};

const renderPictures = (pictures, container) => {
  const picturesFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const postElement = fillPostInfo(picture);
    picturesFragment.appendChild(postElement);
  });
  container.append(picturesFragment);
};


export { renderPictures };
