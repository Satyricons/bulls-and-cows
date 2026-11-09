export type RecordEntry = {
  length: number;
  base: number;
  attempts: number;
  timeMs: number;
  date: string;
};

// Чистая функция для сортировки: сначала по попыткам, потом по времени
export const sortRecords = (records: RecordEntry[]): RecordEntry[] => {
  return [...records].sort((a, b) => {
    if (a.attempts !== b.attempts) {
      return a.attempts - b.attempts; // Меньше попыток = лучше
    }
    return a.timeMs - b.timeMs; // Если попыток поровну, меньше времени = лучше
  });
};

// Функция для добавления рекорда (возвращает новый массив)
export const addRecord = (records: RecordEntry[], newRecord: RecordEntry): RecordEntry[] => {
  return sortRecords([...records, newRecord]).slice(0, 10); // Оставляем только топ-10
};
