// A custom React Hook that manages all todo tasks in the app.
// Think of it as the "brain" for all tasks: it keeps track of the list,
// handles adding, editing, deleting, and marking tasks complete, and saves them in storage.

import { useState, useEffect, useCallback } from 'react';
import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';
import { storageUtils } from '../utils/storage';

export const useTodos = () => {
  // State to store all todos
  const [todos, setTodos] = useState<Todo[]>([]);

  // Loading state while todos are being loaded
  const [loading, setLoading] = useState(true);

  // Load todos from local storage when the app first runs
  useEffect(() => {
    const loadTodos = () => {
      try {
        const savedTodos = storageUtils.getTodos(); // get todos from local storage
        setTodos(savedTodos);
      } catch (error) {
        console.error('Failed to load todos:', error);
      } finally {
        setLoading(false); // finished loading
      }
    };
    loadTodos();
  }, []);

  // Save todos to storage whenever they change (except during initial load)
  useEffect(() => {
    if (!loading) {
      storageUtils.saveTodos(todos);
    }
  }, [todos, loading]);

  // Add a new todo
  const createTodo = useCallback((input: CreateTodoInput) => {
    const newTodo: Todo = {
      ...input,
      id: crypto.randomUUID(), // unique id for the todo
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos(prev => [...prev, newTodo]); // add new todo to the list
    return newTodo;
  }, []);

  // Update an existing todo
  const updateTodo = useCallback((id: string, updates: UpdateTodoInput) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date() } // merge changes
          : todo
      )
    );
  }, []);

  // Delete a todo
  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Toggle a todo as complete/incomplete
  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  // Return everything the app needs to work with todos
  return {
    todos,       // list of all todos
    loading,     // whether todos are currently loading
    createTodo,  // function to add a todo
    updateTodo,  // function to edit a todo
    deleteTodo,  // function to delete a todo
    toggleTodo,  // function to mark complete/incomplete
  };
};
