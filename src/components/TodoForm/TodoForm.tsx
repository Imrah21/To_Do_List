import React, { useState } from 'react';

import  Paper from '@mui/material/Paper';
import  Typography from '@mui/material/Typography';
import  Box from '@mui/material/Box';
import {TextField, Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Types: Defines the shape of a "todo" item
import type { CreateTodoInput } from '../../types/todo';

// Props: Function passed down from App to handle what happens when a new task is submitted
interface TodoFormProps {
  onSubmit: (todo: CreateTodoInput) => void;
}

// TodoForm component: Handles creating and submitting a new task
export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit }) => {
    // Local state for form inputs (title, description, priority)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
    if (!title.trim()) return; // Don’t allow empty titles

    // Pass new task data back up to the App
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      priority,
    });

    // Reset form fields after submit
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  // UI for the form
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>

       {/* Form heading */}
      <Typography variant="h6" gutterBottom>
        Add New Todo
      </Typography>

      {/* Form body */}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* Title input (required) */}
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />

        {/* Description input (optional, multiline) */}
        <TextField
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={2}
          fullWidth
        />

        {/* Priority dropdown (Low, Medium, High) */}
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            label="Priority"
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

        {/* Submit button */}
        <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-start' }}>
          Add Todo
        </Button>
      </Box>
    </Paper>
  );
};