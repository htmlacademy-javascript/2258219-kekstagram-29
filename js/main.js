//Общие функции
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

//Комментарий к посту

//Переменные для комментариев
const NAMES = [
  'Гав',
  'Марсик',
  'Барсик',
  'Кекс',
  'Гром',
  'Рыжик',
  'Кот'
];

const AVATARS = [1, 2, 3, 4, 5, 6];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const createMessage = () => Array.from(
  {length: getRandomInteger(1, 2)},
  () => getRandomArrayElement(MESSAGES),).join(' ');

const generateCommentId = createIdGenerator();

//Собираем комментарий
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${ getRandomArrayElement(AVATARS) }.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const similarComments = Array.from({length: getRandomInteger(0, 30)}, createComment);

//Создаем сам пост
//Переменные для поста
const POST_COUNT = 25;

const generatePhotoId = createRandomIdFromRangeGenerator(1, POST_COUNT + 1);

const generatePhotoUrl = createRandomIdFromRangeGenerator(1, POST_COUNT);

const DESCRIPTION = [
  'Вот это круть!',
  'Вот мы и дома',
  'А что сегодня делали вы?',
  'Настоящий кот',
  'Моя новая любовь!',
  'Быть или не быть?',
  'Вперёд!'
];

//Собираем пост
const createPost = () => ({
  id: generatePhotoId(),
  url: `photos/${ generatePhotoUrl() }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: similarComments
});

const allPosts = Array.from({length: POST_COUNT}, createPost);
export { allPosts };
