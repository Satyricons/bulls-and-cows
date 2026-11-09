import { RecordEntry } from '../logic/leaderboard.js';
import { createElement } from './elements.js';

export const renderLeaderboard = (records: RecordEntry[]): HTMLElement => {
  const container = createElement('div', 'leaderboard-container');
  const title = createElement('h2', 'subtitle', 'Таблица рекордов (Топ-10)');
  container.appendChild(title);

  if (records.length === 0) {
    container.appendChild(createElement('p', '', 'Пока нет рекордов. Станьте первым!'));
    return container;
  }

  const list = createElement('ul', 'leaderboard-list');

  records.forEach((record, index) => {
    const baseNames: Record<number, string> = { 2: 'Bin', 8: 'Oct', 10: 'Dec', 16: 'Hex' };
    const baseName = baseNames[record.base] || record.base;
    const timeSec = (record.timeMs / 1000).toFixed(1);

    // Формируем текст записи: 1. 4 цифры (Dec) — 5 попыток, 12.3 сек.
    const text = `${index + 1}. ${record.length} цифр (${baseName}) — ${record.attempts} попыток, ${timeSec} сек.`;

    const li = createElement('li', 'leaderboard-item', text);
    list.appendChild(li);
  });

  container.appendChild(list);
  return container;
};
