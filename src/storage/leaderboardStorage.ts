import { RecordEntry } from '../logic/leaderboard.js';

const STORAGE_KEY = 'bulls-and-cows-leaderboard';

export const loadRecords = (): RecordEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Ошибка чтения рекордов', error);
    return [];
  }
};

export const saveRecords = (records: RecordEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  } catch (error) {
    console.error('Ошибка сохранения рекордов', error);
  }
};
