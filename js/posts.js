import { getAllPosts } from './data.js';

const pictures = document.querySelector('.pictures');
const postTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture') ;

const picturesFragment = document.createDocumentFragment();
const posts = getAllPosts();

posts.forEach(({url, description, comments, likes}) => {
  const postElement = postTemplate.cloneNode(true);
  postElement.querySelector('.picture__img').src = url;
  postElement.querySelector('.picture__img').alt = description;
  postElement.querySelector('.picture__comments').textContent = comments.length;
  postElement.querySelector('.picture__likes').textContent = likes;
  picturesFragment.appendChild(postElement);
});

const showPictures = () => pictures.appendChild(picturesFragment);

export { showPictures };
