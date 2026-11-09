import { GameState, addToHistory, isWin, Attempt } from '../logic/state.js';
import { evaluateGuess } from '../logic/evaluateGuess.js';
import { isValidGuess } from '../logic/isValidGuess.js';
import { createDigitValidator } from '../logic/createDigitValidator.js';
import { createElement } from './elements.js';

export const renderGame = (
  state: GameState,
  onUpdate: (newState: GameState) => void,
  onNewGame: () => void,
  onWin: (attempts: number, timeMs: number) => void
): HTMLElement => {
  const container = createElement('div', 'game-container');
  const info = createElement('p', 'info', `Угадайте ${state.length} цифр (база ${state.base})`);

  const input = createElement('input', 'input') as HTMLInputElement;
  input.type = 'text';
  input.maxLength = state.length;
  input.placeholder = 'Введите число...';

  // Второе использование createDigitValidator (фильтрация ввода)
  const isValidChar = createDigitValidator(state.base);
  input.addEventListener('input', () => {
    const filtered = [...input.value].filter(isValidChar).join('');
    if (filtered !== input.value) input.value = filtered;
  });

  const submitBtn = createElement('button', 'btn', 'Проверить');
  const historyContainer = createElement('ul', 'history');

  // Отрисовка истории
  state.history.forEach((h) => {
    const li = createElement(
      'li',
      'history-item',
      `${h.guess} — Быков: ${h.bulls}, Коров: ${h.cows}`
    );
    historyContainer.appendChild(li);
  });

  submitBtn.addEventListener('click', () => {
    const guess = input.value.toLowerCase();

    if (!isValidGuess(guess, state.length, state.base)) {
      alert('Некорректный ввод!');
      return;
    }

    if (state.history.some((h) => h.guess === guess)) {
      alert('Вы уже вводили эту попытку!');
      return;
    }

    const result = evaluateGuess(state.secret, guess);
    const newAttempt: Attempt = { guess, bulls: result.bulls, cows: result.cows };

    // Иммутабельное обновление состояния
    const newState: GameState = {
      ...state,
      history: addToHistory(state.history, newAttempt),
    };

    if (isWin(result.bulls, state.length)) {
      newState.status = 'won';
      const timeMs = Date.now() - state.startTime;
      onWin(newState.history.length, timeMs);
      alert(`Победа! Секрет: ${state.secret}. Вы угадали за ${newState.history.length} попыток.`);
    }

    onUpdate(newState);
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitBtn.click();
  });

  const newGameBtn = createElement('button', 'btn btn-secondary', 'Новая игра');
  newGameBtn.addEventListener('click', onNewGame);

  container.append(info, input, submitBtn, historyContainer, newGameBtn);
  return container;
};
