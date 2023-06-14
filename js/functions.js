function measureString(string, maxLength) {
  return string.length >= maxLength;
}

console.log(measureString('проверяемая строка', 10));
