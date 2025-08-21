import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Todo, UpdateTodoInput } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: UpdateTodoInput) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  if (todos.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No todos yet. Add one above!
        </Typography>
      </Paper>
    );
  }

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <Box>
      {activeTodos.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Active ({activeTodos.length})
          </Typography>
          {activeTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </Box>
      )}

      {completedTodos.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Completed ({completedTodos.length})
          </Typography>
          {completedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};