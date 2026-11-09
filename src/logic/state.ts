export type Attempt = {
  guess: string;
  bulls: number;
  cows: number;
};

export type GameState = {
  secret: string;
  length: number;
  base: number;
  history: Attempt[];
  startTime: number;
  status: 'playing' | 'won';
};

// Иммутабельное добавление попытки в историю
export const addToHistory = (history: Attempt[], attempt: Attempt): Attempt[] => {
  return [...history, attempt];
};

// Проверка на победу
export const isWin = (bulls: number, length: number): boolean => {
  return bulls === length;
};
