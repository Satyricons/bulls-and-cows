const DIGITS = '0123456789abcdef';

export const createDigitValidator =
  (base: number) =>
  (char: string): boolean => {
    // Строка должна состоять ровно из одного символа
    if (char.length !== 1) return false;

    // Приводим к нижнему регистру для HEX и проверяем, входит ли символ в допустимые
    return DIGITS.slice(0, base).includes(char.toLowerCase());
  };
