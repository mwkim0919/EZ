import { TodoApp } from '../types/todos';

const STORAGE_KEY = 'EZTodo';

export const loadState = (): TodoApp => {
  try {
    const serialized = window.localStorage.getItem(STORAGE_KEY);
    if (serialized === null) {
      return {};
    }
    return JSON.parse(serialized);
  } catch (err) {
    throw new Error('Failed to load from localStorage');
  }
};

export const saveState = (state: TodoApp) => {
  try {
    const serialized = JSON.stringify(state);
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    throw new Error('Failed to save to localStorage');
  }
};
