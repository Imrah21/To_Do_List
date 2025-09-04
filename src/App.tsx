import { useState } from 'react';
//MUI Imports
import  Container from '@mui/material/Container';
import  Typography from '@mui/material/Typography';
import  Box from '@mui/material/Box';
import  Paper from '@mui/material/Paper';
import  IconButton from '@mui/material/IconButton';
import  CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import { Fab } from '@mui/material';
//Components
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { useTodos } from './hooks/useTodos';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });
  const { todos, loading, createTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { 
        main: darkMode ? '#90caf9' : '#1976d2' 
      },
      secondary: { 
        main: darkMode ? '#f48fb1' : '#dc004e' 
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff'
      }
    },
    typography: {
      h3: { 
        fontFamily: "Finger Paint", 
        fontWeight: 700,
        background: darkMode 
          ? 'linear-gradient(45deg, #90caf9, #f48fb1)' 
          : 'linear-gradient(45deg, #1976d2, #dc004e)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "Finger Paint", 
            borderRadius: 12,
            textTransform: 'none',
            boxShadow: darkMode 
              ? '0 4px 14px 0 rgba(144, 202, 249, 0.2)'
              : '0 4px 14px 0 rgba(25, 118, 210, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: darkMode 
                ? '0 8px 25px 0 rgba(144, 202, 249, 0.3)'
                : '0 8px 25px 0 rgba(25, 118, 210, 0.3)'
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }
        }
      }
    }
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Toast functions
const showToast = (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'success') => {
  setToast({ open: true, message, severity });
};

const hideToast = () => {
  setToast(prev => ({ ...prev, open: false }));
};

// Toasts for CRUD functions
const handleCreateTodo = async (todoData: any) => {
  try {
    await createTodo(todoData);
    showToast('Task added! 🎉', 'success');
  } catch (error) {
    showToast('Failed to add task', 'error');
  }
};

const handleDeleteTodo = async (id: string) => {
  try {
    await deleteTodo(id);
    showToast('Task deleted! 🗑️', 'warning');
  } catch (error) {
    showToast('Failed to delete task', 'error');
  }
};

const handleToggleTodo = async (id: string) => {
  try {
    await toggleTodo(id);
    showToast('Task updated! ✏️', 'info');
  } catch (error) {
    showToast('Failed to update task', 'error');
  }
};

const handleUpdateTodo = async (id: string, updates: any) => {
  try {
    await updateTodo(id, updates);
    showToast('Task updated successfully! ✏️', 'info');
  } catch (error) {
    showToast('Failed to update task', 'error');
  }
};

  if (loading) 
  {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
         <Container maxWidth="md" sx={{ py: 4
      }}
    >
          <Typography>Loading...</Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4}}>

        {/* Floating Theme Toggle */}
      <Fab 
      color="primary" 
      onClick={toggleTheme}
        sx={{ 
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000
        }}
        >
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </Fab>

        <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom>
              To-Do List
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Making Your Day Easier ✨
            </Typography>
          </Box>

         {/* Two-column layout */}
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            alignItems: 'flex-start',
            flexDirection: { xs: 'column', md: 'row' } // Stack on mobile, side-by-side on desktop
          }}>


            {/* Left column - Form */}
            <Box sx={{ 
              flex: { xs: '1', md: '0 0 40%' }, // Fixed width on desktop, full width on mobile
              minWidth: 0 
            }}>
              <TodoForm onSubmit={handleCreateTodo} />
            </Box>

            {/* Right column - Todo List */}
            <Box sx={{ 
              flex: 1,
              md: '0 0 60%',
              minWidth: 0
            }}>
              <TodoList
                todos={todos}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
              />
            </Box>
          </Box>

           {/* Toast Notification */}
          <Snackbar 
            open={toast.open} 
            autoHideDuration={3000} 
            onClose={hideToast}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            TransitionComponent={Fade}
          >
            <Alert 
              onClose={hideToast} 
              severity={toast.severity} 
              sx={{ width: '100%' }}
              variant="filled"
            >
              {toast.message}
            </Alert>
          </Snackbar>
        </Container>
    </ThemeProvider>
  );
}

export default App;