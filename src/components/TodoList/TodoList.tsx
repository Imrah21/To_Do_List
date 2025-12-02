import React from 'react';

import  Paper from '@mui/material/Paper';
import  Typography from '@mui/material/Typography';
import  Box from '@mui/material/Box';

import type { Todo, UpdateTodoInput } from '../../types/todo';
import { TodoItem } from '../TodoItem/TodoItem';

//Props that TodoList expects to receive
interface TodoListProps {
  todos: Todo[]; // list of todos to display
  onToggle: (id: string) => void; // toggle completion
  onDelete: (id: string) => void; // delete todo
  onUpdate: (id: string, updates: UpdateTodoInput) => void; // update todo
}

//TodoList Component: Displays a list of todos, separated into Active and Completed
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  //If no todos exist, show a placeholder message
  if (todos.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No todos yet. Add one above!
        </Typography>
      </Paper>
    );
  }

  //Filter todos into active (not completed) and completed
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <Box>
      {/* Active Todos Section */}
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

      {/* Completed Todos Section */}
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