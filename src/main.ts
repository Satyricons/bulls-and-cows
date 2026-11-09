import { GameState } from './logic/state.js';
import { generateSecret } from './logic/generateSecret.js';
import { renderSettings } from './ui/settings.js';
import { renderGame } from './ui/game.js';
import { renderLeaderboard } from './ui/leaderboard.js';
import { loadRecords, saveRecords } from './storage/leaderboardStorage.js';
import { addRecord } from './logic/leaderboard.js';
import { createElement } from './ui/elements.js';

const root = document.getElementById('root')!;
let state: GameState | null = null;
let currentRecords = loadRecords();

const startGame = (length: number, base: number) => {
  state = {
    secret: generateSecret(length, base),
    length,
    base,
    history: [],
    startTime: Date.now(),
    status: 'playing',
  };
  render();
};

const resetGame = () => {
  state = null;
  render();
};

const handleWin = (attempts: number, timeMs: number) => {
  if (!state) return;

  const newRecord = {
    length: state.length,
    base: state.base,
    attempts,
    timeMs,
    date: new Date().toISOString(),
  };

  currentRecords = addRecord(currentRecords, newRecord);
  saveRecords(currentRecords);
};

const render = () => {
  root.innerHTML = ''; // Очищаем контейнер

  const mainContainer = createElement('div', 'main-container');

  if (!state) {
    // Экран настроек + таблица рекордов
    mainContainer.appendChild(renderSettings(startGame));
    mainContainer.appendChild(renderLeaderboard(currentRecords));
  } else {
    // Игровой экран
    mainContainer.appendChild(
      renderGame(
        state,
        (newState) => {
          state = newState;
          render();
        },
        resetGame,
        handleWin
      )
    );
  }

  root.appendChild(mainContainer);
};

render();
