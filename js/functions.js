const isLessOrEquel = (string, maxLength) => string.length <= maxLength;

isLessOrEquel('проверяемая строка', 20);

const isPalindrom = (string) => {
  const cleanString = string.replaceAll(' ', '').toLowerCase;

  for (let i = 0; i < cleanString.length / 2; i++) {
    if (string.at(i) !== string.at(-i - 1)) {
      return false;
    }
  }
  return true;
};

isPalindrom('Леша на полке клопа нашел');
