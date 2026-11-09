import { describe, it, expect } from 'vitest';
import { evaluateGuess } from '../src/logic/evaluateGuess';

describe('evaluateGuess', () => {
  it('все быки при полном совпадении', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });

  it('все коровы при перестановке', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({ bulls: 0, cows: 4 });
  });

  it('смешанный случай', () => {
    // 1 - бык, 2 - корова, 3 - корова, 4 - бык
    expect(evaluateGuess('1234', '1324')).toEqual({ bulls: 2, cows: 2 });
  });

  it('без совпадений', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });

  it('hex регистронезависим', () => {
    expect(evaluateGuess('1a2b', '1A2B')).toEqual({ bulls: 4, cows: 0 });
  });

  it('учитывает лидирующие нули', () => {
    expect(evaluateGuess('0123', '3210')).toEqual({ bulls: 0, cows: 4 });
  });

  it('корректно считает коровы, если в попытке повторяются цифры', () => {
    // В секрете одна '1', а в попытке две.
    // Значит, одна '1' уйдет в быки, а вторая не должна посчитаться как корова.
    expect(evaluateGuess('1234', '1134')).toEqual({ bulls: 2, cows: 0 });
  });
});
