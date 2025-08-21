import type { Todo } from '../types/todo';

const STORAGE_KEY = 'todos';

export const storageUtils = 
{
  getTodos: (): Todo[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        updatedAt: new Date(todo.updatedAt),
      })) : [];
    } catch {
      return [];
    }
  },

  saveTodos: (todos: Todo[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos:', error);
    }
  },
};