import React, { useState } from 'react';

// MUI Imports: Prebuilt UI components 
import {  Card, CardContent, Checkbox, Typography, IconButton, Box, Chip, TextField, Button } from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';

// Types: Defines the shape of a todo and what can be updated
import type { Todo, UpdateTodoInput } from '../../types/todo';

// Props: Functions and data passed in from TodoList
interface TodoItemProps {
  todo: Todo; // The actual todo item data
  onToggle: (id: string) => void;  // Mark task complete/incomplete
  onDelete: (id: string) => void; // Delete a task
  onUpdate: (id: string, updates: UpdateTodoInput) => void;  // Edit a task
}

// TodoItem component: Displays a single task with options to update or delete it
export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  // Local state: controls whether the item is being edited or just displayed
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  // Save edits and send updates back to parent
  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        updatedAt: new Date(),
      });
      setIsEditing(false);
    }
  };

   // Cancel edits and reset values
  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

    // Priority chip color helper (low=green, medium=yellow, high=red)
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

   // UI for a single todo item
  return (
    <Card sx={{ mb: 2, opacity: todo.completed ? 0.7 : 1 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>

          {/* Checkbox to mark complete/incomplete */}
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            sx={{ mt: -1 }}
          />

          {/* Task details (edit mode vs view mode) */}
          <Box sx={{ flexGrow: 1 }}>
            {isEditing ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  size="small"
                  fullWidth
                />
                <TextField
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  size="small"
                  multiline
                  rows={2}
                  fullWidth
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" startIcon={<Save />} onClick={handleSave}>
                    Save
                  </Button>
                  <Button size="small" startIcon={<Cancel />} onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            ) : (
              // View mode: shows title, description, priority, and created date
              <>
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    mb: 1,
                  }}
                >
                  {todo.title}
                </Typography>
                {todo.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      mb: 1,
                    }}
                  >
                    {todo.description}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Chip
                    label={todo.priority}
                    size="small"
                    color={getPriorityColor(todo.priority) as any}
                    variant="outlined"
                  />
                  <Typography variant="caption" color="text.secondary">
                    Created: {todo.createdAt.toLocaleDateString()}
                  </Typography>
                </Box>
              </>
            )}
          </Box>

            {/* Action buttons (only visible in view mode) */}
          {!isEditing && (
            <Box>
              <IconButton onClick={() => setIsEditing(true)} size="small">
                <Edit />
              </IconButton>
              <IconButton onClick={() => onDelete(todo.id)} size="small" color="error">
                <Delete />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};