export type Evaluation = { bulls: number; cows: number };

export const evaluateGuess = (secret: string, guess: string): Evaluation => {
  // 1. Приводим к нижнему регистру и разбиваем на массивы
  const s = secret.toLowerCase().split('');
  const g = guess.toLowerCase().split('');

  // 2. Считаем быков (цифра на своем месте)
  const bulls = s.filter((char, i) => char === g[i]).length;

  // 3. Оставляем только те символы, которые НЕ на своем месте (для подсчета коров)
  const secretRest = s.filter((_, i) => s[i] !== g[i]);
  const guessRest = g.filter((_, i) => s[i] !== g[i]);

  // 4. Считаем коров через reduce
  const cows = guessRest.reduce((count, char) => {
    const index = secretRest.indexOf(char);
    if (index === -1) {
      return count; // Если такой цифры в остатке секрета нет, коровы не будет
    }

    // Если нашли — "вычеркиваем" её из секрета, чтобы не посчитать дважды
    secretRest.splice(index, 1);
    return count + 1;
  }, 0);

  return { bulls, cows };
};
