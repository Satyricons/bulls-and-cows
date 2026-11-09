import { describe, it, expect } from 'vitest';
import { isValidGuess } from '../src/logic/isValidGuess';

describe('isValidGuess', () => {
  it('возвращает true для правильной попытки', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
  });

  it('возвращает false, если длина не совпадает', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
    expect(isValidGuess('12345', 4, 10)).toBe(false);
  });

  it('возвращает false, если есть символы вне системы счисления', () => {
    expect(isValidGuess('123a', 4, 10)).toBe(false);
  });

  it('возвращает false, если есть повторяющиеся символы', () => {
    expect(isValidGuess('1123', 4, 10)).toBe(false);
  });

  it('возвращает false, если повторяются символы в разном регистре (HEX)', () => {
    expect(isValidGuess('1a1A', 4, 16)).toBe(false);
  });

  it('возвращает true для правильного HEX в верхнем регистре', () => {
    expect(isValidGuess('1A2B', 4, 16)).toBe(true);
  });
});
