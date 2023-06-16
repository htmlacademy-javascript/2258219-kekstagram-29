const isLessOrEquel = (string, maxLength) => string.length >= maxLength;

isLessOrEquel('проверяемая строка', 10);

function isPalindrom(string) {
  const cleanString = string.replaceAll(' ', '').toLowerCase();

  for (let i = 0; i < cleanString.length / 2; i++) {
    if (string[i] !== string[string.lenght - i - 1]) {
      return false;
    }
  }
  return true;
}

isPalindrom('Лёша на полке клопа нашёл');
