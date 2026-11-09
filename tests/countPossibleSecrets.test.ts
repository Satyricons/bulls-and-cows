import { describe, it, expect } from 'vitest';
import { countPossibleSecrets } from '../src/logic/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  it('если длина 0, возвращает 1', () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it('если длина 1, возвращает base', () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
    expect(countPossibleSecrets(1, 2)).toBe(2);
  });

  it('для длины 2 и base 10 возвращает 90 (10 * 9)', () => {
    expect(countPossibleSecrets(2, 10)).toBe(90);
  });

  it('для длины 4 и base 10 возвращает 5040 (10 * 9 * 8 * 7)', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  it('для длины 2 и base 2 возвращает 2 (2 * 1)', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('мемоизация: повторный вызов возвращает то же значение', () => {
    const firstCall = countPossibleSecrets(5, 16);
    const secondCall = countPossibleSecrets(5, 16);
    expect(firstCall).toBe(secondCall);
  });
});
