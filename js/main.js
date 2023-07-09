import { showPictures} from './posts.js';
import { renderComments, bigPicture, bigPictureTemplate } from './big-picture.js';

showPictures();

showPictures.addEventListener('click', (evt) => { // Клик по миниатюре showPictures. Как бороться с "showPicture.addEventListener is not a function"?
  evt.preventDefault();
  bigPicture.classList.remove('hidden');
  bigPictureTemplate();
  renderComments();
});

/*
Окно должно открываться при клике на миниатюру.

Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии

После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

Подключите модуль в проект.
*/
