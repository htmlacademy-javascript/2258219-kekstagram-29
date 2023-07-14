import { renderPosts, fillPostInfo } from './posts.js';
import { getAllPosts } from './data.js';
import { showBigPicture, fillBigPictureInfo } from './big-picture.js';
import { renderGallery } from './gallery.js';

renderPosts();
fillPostInfo();
getAllPosts();
showBigPicture();
fillBigPictureInfo();
renderGallery();
// console.log(renderGallery(getAllPosts()));

// const container = document.querySelector('.pictures');
// console.log(renderPosts(fillPostInfo(getAllPosts())), container); //Cannot read properties of undefined (reading 'forEach') at renderPosts
/*
    renderGallery(posts) - связать миниатюры и полное, а также загрузка галереии
      showBigPicture(data) - открытие/показ модального окна
        fillBigPictureInfo(объект) - перезаписать данные миниатюры
          getAllPosts() - массив с рендером постов
      renderPosts(posts, container) - отрисовка миниатюр
        fillPostInfo(объект) - заполнить данные миниатюры
          getAllPosts() - массив с рендером постов

    gallery
      posts
        data
      big-picture
        data
*/
