import { useState, useEffect, useCallback } from 'react';
import type { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';
import { storageUtils } from '../utils/storage';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTodos = () => {
      try 
      {
        const savedTodos = storageUtils.getTodos();
        setTodos(savedTodos);
      } 
      catch (error) 
      {
        console.error('Failed to load todos:', error);
      } 
      finally 
      {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    if (!loading)
    {
      storageUtils.saveTodos(todos);
    }
  }, [todos, loading]);

  const createTodo = useCallback((input: CreateTodoInput) => {
    const newTodo: Todo = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos(prev => [...prev, newTodo]);
    return newTodo;
  }, []);

  const updateTodo = useCallback((id: string, updates: UpdateTodoInput) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id 
          ? { ...todo, ...updates, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      )
    );
  }, []);

  return {
    todos,
    loading,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
};