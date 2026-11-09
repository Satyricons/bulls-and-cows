const DIGITS = '0123456789abcdef';

export const generateSecret = (
  length: number,
  base: number,
  random: () => number = Math.random
): string => {
  const available = DIGITS.slice(0, base).split('');
  let result = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(random() * available.length);
    result += available[index];
    available.splice(index, 1); // Удаляем использованный символ, чтобы не было повторов
  }

  return result;
};
