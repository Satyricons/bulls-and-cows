import { GameState } from './logic/state.js';
import { generateSecret } from './logic/generateSecret.js';
import { renderSettings } from './ui/settings.js';
import { renderGame } from './ui/game.js';
// В следующем шаге добавим рекорды

const root = document.getElementById('root')!;
let state: GameState | null = null;

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

const handleWin = (_attempts: number, _timeMs: number) => {
  // Здесь будет сохранение рекордов
  // TODO: сохранить рекорд в localStorage
};

const render = () => {
  root.innerHTML = ''; // Очищаем root (это единственное допустимое использование, т.к. это статический контейнер)

  if (!state) {
    root.appendChild(renderSettings(startGame));
  } else {
    root.appendChild(
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
};

render();
