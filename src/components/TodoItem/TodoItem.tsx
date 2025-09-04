import React, { useState } from 'react';
import {  Card, CardContent, Checkbox, Typography, IconButton, Box, Chip, TextField, Button } from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';
import type { Todo, UpdateTodoInput } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: UpdateTodoInput) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

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

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card sx={{ mb: 2, opacity: todo.completed ? 0.7 : 1 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            sx={{ mt: -1 }}
          />
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