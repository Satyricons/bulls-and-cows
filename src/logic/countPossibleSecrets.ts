// Хранилище для мемоизации (кэш)
const memo = new Map<string, number>();

export const countPossibleSecrets = (length: number, base: number): number => {
  // Создаем уникальный ключ для кэша, например "4:10"
  const key = `${length}:${base}`;

  // Проверяем, есть ли уже результат в кэше
  const cached = memo.get(key);
  if (cached !== undefined) {
    return cached;
  }

  // Если в кэше нет, считаем (рекурсивно)
  const result = length === 0 ? 1 : base * countPossibleSecrets(length - 1, base - 1);

  // Сохраняем в кэш и возвращаем
  memo.set(key, result);
  return result;
};
