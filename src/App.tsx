/*
The brain - controls the everything i.e., the overall layout, behaviour, and theming of the app.

  - Switching between "Add Task" and "View Tasks" tabs
  - Theme switching (light/dark mode)
  - Toast messages for success/errors
  - Manages all to-do tasks, passing tasks to the form and list
*/

import { useState, useEffect } from 'react';

//Styling - MUI UI components for layout and icons
import  Container from '@mui/material/Container';
import  Typography from '@mui/material/Typography';
import  Box from '@mui/material/Box';
import  Add from '@mui/icons-material/Add';
import  ViewList from '@mui/icons-material/ViewList';
import  CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import { Fab } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//Styling - Custom CSS 
import './styling/ClipboardDesign.css';
import './App.css';
//Reusable app components i.e. lego blocks that describe certain functionality of the website. They're reuseable, and can be combined together
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';
import { useTodos } from './hooks/useTodos'; // custom logic for managing tasks

function App() {
  //App State
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'add' | 'view'>('add');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' });

    // Task functions from custom hook
  const { todos, loading, createTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  
  //Custom theme settings
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

  // Effect to apply theme class to <body> element for background gradient
  useEffect(() => {
  if (darkMode) {
    document.body.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-mode');
  } else {
    document.body.removeAttribute('data-theme');
    document.body.classList.remove('dark-mode');
  }

  // Cleanup function to remove classes when component unmounts 
  return () => {
    document.body.removeAttribute('data-theme');
    document.body.classList.remove('dark-mode');
  };
}, [darkMode]);

  // Toggle dark/light theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Toast notification functions
const showToast = (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'success') => {
  setToast({ open: true, message, severity });
};

const hideToast = () => {
  setToast(prev => ({ ...prev, open: false }));
};

// Toasts for CRUD functions
const handleCreateTodo = async (todoData: any) => {
  try {
    createTodo(todoData);
    showToast('Task added! 🎉', 'success');
  } catch (error) {
    showToast('Failed to add task', 'error');
  }
};

const handleDeleteTodo = async (id: string) => {
  try {
    deleteTodo(id);
    showToast('Task deleted! 🗑️', 'warning');
  } catch (error) {
    showToast('Failed to delete task', 'error');
  }
};

const handleToggleTodo = async (id: string) => {
  try {
    toggleTodo(id);
    showToast('Task updated! ✏️', 'info');
  } catch (error) {
    showToast('Failed to update task', 'error');
  }
};

const handleUpdateTodo = async (id: string, updates: any) => {
  try {
    updateTodo(id, updates);
    showToast('Task updated successfully! ✏️', 'info');
  } catch (error) {
    showToast('Failed to update task', 'error');
  }
};

// Show loading state (no idea if works)
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

   // Main App UI
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
       {/* Clipboard Background */} 
        <div className={`clipboard-background ${darkMode ? 'dark-mode' : ''}`} data-theme={darkMode ? 'dark' : 'light'}>
          {/* Clipboard Clip */}
          <div className="clipboard-clip"/>

          {/* Navigation Tabs */}
          <Box className={`clipboard-nav ${darkMode ? 'dark-mode' : ''}`} data-theme={darkMode ? 'dark' : 'light'}>
           <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} textColor="primary" indicatorColor="primary" variant="fullWidth" sx={{ width: '100%', maxWidth: 600 }} centered >
              <Tab 
                label="Add Task" 
                icon={<Add />} 
                iconPosition="start" 
                value="add" 
              />
              <Tab 
                label={`View Tasks (${todos.length})`} 
                icon={<ViewList />} 
                iconPosition="start" 
                value="view" 
                sx={{ fontFamily: 'Finger Paint' }}
              />
            </Tabs>
          </Box>

          {/* Main Content */}
          <div className="clipboard-content">
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h3" component="h1" gutterBottom>
                To-Do List
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Making Your Day Easier ✨
              </Typography>
            </Box>

            {/* Tab Content */}
            <Box sx={{ minHeight: '400px' }}>

              {/* Add Task View */}
              {activeTab === 'add' ? (
                <Box sx={{ maxWidth: '500px', margin: '0 auto' }}>
                  <TodoForm onSubmit={handleCreateTodo} />
                  
                  {/* Preview recent tasks */}
                  {todos.length > 0 && (
                    <Box sx={{ mt: 3, p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Recent Tasks:
                      </Typography>
                      {todos.slice(0, 3).map((todo) => (
                        <Typography key={todo.id} variant="body2" sx={{ opacity: 0.7, fontSize: '0.875rem' }}>
                          • {todo.title}
                        </Typography>
                      ))}
                      {todos.length > 3 && (
                        <Typography variant="body2" sx={{ opacity: 0.5, fontStyle: 'italic' }}>
                          +{todos.length - 3} more tasks...
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              ) : (
                // 'View Tasks' View
                <Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
                  <TodoList
                    todos={todos}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onUpdate={handleUpdateTodo}
                  />
                </Box>
              )}
            </Box>
          </div>
        </div>

        {/* Floating Action Button to toggle theme */}
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
      </ThemeProvider>
  );
}

export default App;