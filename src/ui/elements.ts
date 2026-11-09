// Универсальная функция для создания элементов (HOF)
export const createElement = (
  tag: string,
  className?: string,
  textContent?: string
): HTMLElement => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
};
