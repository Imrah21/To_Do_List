// Import the structure of a todo
import type { Todo } from '../types/todo';

// Key used to store todos in localStorage
const STORAGE_KEY = 'todos';

// Utility functions to interact with localStorage
export const storageUtils = 
{
  // getTodos: Loads todos from localStorage
  getTodos: (): Todo[] => {
    try {
      // Try to read the saved todos
      const stored = localStorage.getItem(STORAGE_KEY);

      // If found, parse the data back into objects
      // Convert createdAt/updatedAt strings back into Date objects
      return stored 
        ? JSON.parse(stored).map((todo: any) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            updatedAt: new Date(todo.updatedAt),
          })) 
        : [];

    } catch {
      // If something goes wrong, return an empty list instead of crashing
      return [];
    }
  },

  // saveTodos: Saves todos into localStorage
  saveTodos: (todos: Todo[]): void => {
    try {
      // Turn todos into JSON text and store them
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      // If saving fails, show an error in the console
      console.error('Failed to save todos:', error);
    }
  },
};