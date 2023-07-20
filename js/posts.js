const postTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture') ;


const fillPostInfo = ({url, description, comments, likes, id}) => {
  const postElement = postTemplate.cloneNode(true);

  postElement.querySelector('.picture__img').src = url;
  postElement.querySelector('.picture__img').alt = description;
  postElement.querySelector('.picture__comments').textContent = comments.length;
  postElement.querySelector('.picture__likes').textContent = likes;
  postElement.dataset.postId = id;

  return postElement;
};

const renderPosts = (posts, container) => {
  const postsFragment = document.createDocumentFragment();
  posts.forEach((picture) => {
    const postElement = fillPostInfo(picture);
    postsFragment.append(postElement);
  });
  container.append(postsFragment);
};

export { renderPosts };

