import { createDigitValidator } from './createDigitValidator';

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  // 1. Проверка длины
  if (guess.length !== length) return false;

  // 2. Используем наш валидатор (первое место использования!)
  const isValidDigit = createDigitValidator(base);
  if (![...guess].every(isValidDigit)) return false;

  // 3. Проверка на уникальность (приводим к нижнему регистру, чтобы A и a считались одинаковыми)
  const normalized = guess.toLowerCase();
  return new Set(normalized).size === normalized.length;
};
