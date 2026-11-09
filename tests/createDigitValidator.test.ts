import { describe, it, expect } from 'vitest';
import { createDigitValidator } from '../src/logic/createDigitValidator';

describe('createDigitValidator', () => {
  it('для десятичной системы (10) пропускает 0-9', () => {
    const isDec = createDigitValidator(10);
    '0123456789'.split('').forEach((char) => {
      expect(isDec(char)).toBe(true);
    });
  });

  it('для десятичной системы (10) отвергает буквы', () => {
    const isDec = createDigitValidator(10);
    'abcdef'.split('').forEach((char) => {
      expect(isDec(char)).toBe(false);
    });
  });

  it('для двоичной системы (2) пропускает только 0 и 1', () => {
    const isBin = createDigitValidator(2);
    expect(isBin('0')).toBe(true);
    expect(isBin('1')).toBe(true);
    expect(isBin('2')).toBe(false);
  });

  it('для шестнадцатеричной системы (16) принимает буквы в верхнем и нижнем регистре', () => {
    const isHex = createDigitValidator(16);
    expect(isHex('a')).toBe(true);
    expect(isHex('A')).toBe(true);
    expect(isHex('f')).toBe(true);
    expect(isHex('F')).toBe(true);
  });

  it('возвращает функцию (проверка каррирования)', () => {
    const validator = createDigitValidator(10);
    expect(typeof validator).toBe('function');
  });

  it('отвергает строки длиннее одного символа', () => {
    const isDec = createDigitValidator(10);
    expect(isDec('12')).toBe(false);
  });
});
