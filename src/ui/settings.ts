import { createElement } from './elements.js';

export const renderSettings = (onStart: (length: number, base: number) => void): HTMLElement => {
  const container = createElement('div', 'settings-container');
  const title = createElement('h1', 'title', 'Bulls and Cows');

  const lengthLabel = createElement('label', 'label', 'Длина секрета: ');
  const lengthSelect = createElement('select', 'select');

  // Добавляем варианты длины (2-6)
  [2, 3, 4, 5, 6].forEach((len) => {
    const option = createElement('option', '', `${len}`);
    option.value = `${len}`;
    lengthSelect.appendChild(option);
  });

  const baseLabel = createElement('label', 'label', 'Система счисления: ');
  const baseSelect = createElement('select', 'select');

  // Системы счисления
  const bases = [
    { value: 2, label: 'Bin (2)' },
    { value: 8, label: 'Oct (8)' },
    { value: 10, label: 'Dec (10)' },
    { value: 16, label: 'Hex (16)' },
  ];

  bases.forEach((b) => {
    const option = createElement('option', '', b.label);
    option.value = `${b.value}`;
    baseSelect.appendChild(option);
  });

  // По умолчанию ставим Dec
  baseSelect.value = '10';

  // Блокировка длины для двоичной системы
  baseSelect.addEventListener('change', () => {
    const currentBase = parseInt(baseSelect.value, 10);
    Array.from(lengthSelect.options).forEach((opt) => {
      const len = parseInt(opt.value, 10);
      opt.disabled = currentBase === 2 && len !== 2;
    });
    if (currentBase === 2) lengthSelect.value = '2';
  });

  const startBtn = createElement('button', 'btn', 'Начать игру');
  startBtn.addEventListener('click', () => {
    onStart(parseInt(lengthSelect.value, 10), parseInt(baseSelect.value, 10));
  });

  container.append(title, createElement('div', 'form-group'), createElement('div', 'form-group'));

  // Собираем форму
  const group1 = createElement('div', 'form-group');
  group1.append(lengthLabel, lengthSelect);

  const group2 = createElement('div', 'form-group');
  group2.append(baseLabel, baseSelect);

  container.innerHTML = ''; // Очищаем пустые div
  container.append(title, group1, group2, startBtn);

  return container;
};
