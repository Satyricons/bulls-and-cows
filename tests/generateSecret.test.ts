import { describe, it, expect } from 'vitest';
import { generateSecret } from '../src/logic/generateSecret';

describe('generateSecret', () => {
  it('генерирует строку нужной длины', () => {
    const secret = generateSecret(4, 10, () => 0);
    expect(secret).toHaveLength(4);
  });

  it('содержит только уникальные символы', () => {
    const secret = generateSecret(4, 10, Math.random);
    expect(new Set(secret).size).toBe(4);
  });

  it('содержит только допустимые для base символы', () => {
    const secret = generateSecret(2, 2, Math.random);
    expect([...secret].every((c) => '01'.includes(c))).toBe(true);
  });

  it('детерминирован при фиксированном random', () => {
    const random = () => 0;
    expect(generateSecret(3, 10, random)).toBe('012');
  });

  it('может начинаться с нуля', () => {
    const random = () => 0;
    expect(generateSecret(4, 10, random)).toBe('0123');
  });
});
