function measureString(string, maxLength) {
  return string.length >= maxLength;
}

console.log(measureString('проверяемая строка', 10));

function isPalindrom(string) {
  const cleanString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = cleanString.length - 1; i >= 0; i--) {
    reversedString += cleanString.at(i);
  }
  return reversedString === cleanString;
}

console.log(isPalindrom('Лёша на полке клопа нашёл'));

