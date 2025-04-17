import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Fab, Tooltip, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { RootState } from '../store';
import { setTasks, addTask, deleteTask, updateTask } from '../store/slices/taskSlice';
import TaskColumn from './TaskColumn';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const StyledFab = styled(Fab)(({ theme }) => ({
  backgroundColor: '#000000',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#333333',
  },
  zIndex: 1000,
}));

const TaskCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  position: 'relative',
  zIndex: 1,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  }
}));

const StarryBackground = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
  overflow: 'hidden',
  zIndex: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 2px)',
    backgroundSize: '100px 100px',
    animation: 'moveStars 50s linear infinite',
  },
  '@keyframes moveStars': {
    '0%': {
      transform: 'translateY(0)',
    },
    '100%': {
      transform: 'translateY(-100px)',
    },
  },
});

const TaskBoard: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    status: 'todo' as 'todo' | 'inProgress' | 'done',
  });

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(setTasks([
        {
          id: '1',
          title: 'Complete Project Setup',
          description: 'Set up the project structure and dependencies',
          status: 'todo',
          assignedTo: ['user1'],
          dueDate: '2024-03-01',
          createdBy: 'admin',
          projectId: 'project1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Implement Authentication',
          description: 'Add user authentication and authorization',
          status: 'inProgress',
          assignedTo: ['user2'],
          dueDate: '2024-03-15',
          createdBy: 'admin',
          projectId: 'project1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Design UI Components',
          description: 'Create reusable UI components',
          status: 'done',
          assignedTo: ['user3'],
          dueDate: '2024-03-30',
          createdBy: 'admin',
          projectId: 'project1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]));
    }
  }, [tasks.length, dispatch]);

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setEditForm({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setIsEditing(false);
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
    setSelectedTask(null);
  };

  const handleUpdateTask = () => {
    if (selectedTask) {
      dispatch(updateTask({
        ...selectedTask,
        title: editForm.title,
        description: editForm.description,
        status: editForm.status,
        updatedAt: new Date().toISOString(),
      }));
      setIsEditing(false);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditForm({
      title: '',
      description: '',
      status: 'todo'
    });
  };

  const handleAddTask = () => {
    if (!editForm.title.trim()) {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      status: editForm.status,
      assignedTo: [],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: 'user',
      projectId: 'default',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addTask(newTask));
    setIsAdding(false);
    setEditForm({ title: '', description: '', status: 'todo' });
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;
    const newStatus = destination.droppableId;

    const task = tasks.find(t => t.id === draggableId);
    if (task && task.status !== newStatus) {
      dispatch(updateTask({
        ...task,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      }));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return '#ffffff';
      case 'inProgress':
        return '#ffffff';
      case 'done':
        return '#ffffff';
      default:
        return '#ffffff';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'todo':
        return '📝';
      case 'inProgress':
        return '🚀';
      case 'done':
        return '✅';
      default:
        return '📌';
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <StarryBackground />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '20px',
        }}
      >
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h4" style={{ 
              marginBottom: 16, 
              fontWeight: 'bold', 
              color: 'white',
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}>
              Task Manager
            </Typography>
          </motion.div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: 'flex', gap: '16px', height: 'calc(100vh - 100px)' }}>
              {['todo', 'inProgress', 'done'].map((status, index) => (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ flex: 1, minWidth: '300px' }}
                >
                  <TaskColumn 
                    elevation={0}
                    title={status.charAt(0).toUpperCase() + status.slice(1)}
                  >
                    <Typography variant="h6" style={{ 
                      color: getStatusColor(status), 
                      marginBottom: 16,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      {getStatusEmoji(status)} {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Typography>
                    <Droppable droppableId={status}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          style={{ height: '100%' }}
                        >
                          <AnimatePresence>
                            {tasks
                              .filter((task) => task.status === status)
                              .map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        whileHover={{ scale: 1.02 }}
                                      >
                                        <TaskCard onClick={() => handleTaskClick(task)}>
                                          <Typography variant="h6" style={{ color: 'white' }}>
                                            {task.title}
                                          </Typography>
                                          <Typography variant="body2" style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: 1 }}>
                                            {task.description}
                                          </Typography>
                                          <Typography variant="caption" style={{ color: 'rgba(255, 255, 255, 0.5)', display: 'block', marginTop: 1 }}>
                                            Due: {new Date(task.dueDate).toLocaleDateString()}
                                          </Typography>
                                        </TaskCard>
                                      </motion.div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                          </AnimatePresence>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </TaskColumn>
                </motion.div>
              ))}
            </div>
          </DragDropContext>
        </Container>
      </motion.div>

      <Tooltip title="Add New Task" placement="left">
        <StyledFab
          color="primary"
          onClick={handleAddClick}
          aria-label="add task"
          sx={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            }
          }}
        >
          <AddIcon />
        </StyledFab>
      </Tooltip>

      <Dialog
        open={!!selectedTask || isAdding}
        onClose={() => {
          setSelectedTask(null);
          setIsAdding(false);
          setIsEditing(false);
          setEditForm({ title: '', description: '', status: 'todo' });
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            zIndex: 1001,
          },
        }}
      >
        <DialogTitle style={{ color: 'white' }}>
          {isAdding ? 'Add New Task' : isEditing ? 'Edit Task' : 'Task Details'}
        </DialogTitle>
        <DialogContent>
          <div style={{ marginTop: 16 }}>
            <TextField
              fullWidth
              label="Title"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              margin="normal"
              variant="outlined"
              required
              error={isAdding && !editForm.title.trim()}
              helperText={isAdding && !editForm.title.trim() ? 'Title is required' : ''}
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'rgba(255, 255, 255, 0.7)' },
              }}
            />
            <TextField
              fullWidth
              label="Description"
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'rgba(255, 255, 255, 0.7)' },
              }}
            />
            <TextField
              fullWidth
              select
              label="Status"
              value={editForm.status}
              onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'todo' | 'inProgress' | 'done' })}
              margin="normal"
              variant="outlined"
              InputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'rgba(255, 255, 255, 0.7)' },
              }}
              SelectProps={{
                native: true,
              }}
            >
              <option value="todo">To Do</option>
              <option value="inProgress">In Progress</option>
              <option value="done">Done</option>
            </TextField>
          </div>
        </DialogContent>
        <DialogActions style={{ padding: '16px 24px' }}>
          <Button 
            onClick={() => {
              setSelectedTask(null);
              setIsAdding(false);
              setIsEditing(false);
              setEditForm({ title: '', description: '', status: 'todo' });
            }} 
            style={{ color: 'white' }}
            startIcon={<DeleteIcon />}
          >
            Cancel
          </Button>
          {isAdding ? (
            <Button 
              onClick={handleAddTask} 
              color="primary" 
              variant="contained"
              disabled={!editForm.title.trim()}
              startIcon={<AddIcon />}
            >
              Add Task
            </Button>
          ) : isEditing ? (
            <Button 
              onClick={handleUpdateTask} 
              color="primary" 
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Save Changes
            </Button>
          ) : (
            <Button 
              onClick={() => setIsEditing(true)} 
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          )}
          {!isAdding && (
            <Button 
              onClick={() => handleDeleteTask(selectedTask!.id)} 
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskBoard; 
