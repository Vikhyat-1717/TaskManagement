import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  CheckCircle as CheckCircleIcon,
  MoreVert as MoreVertIcon,
  Restore as RestoreIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { moveTask, setTasks, addTask, deleteTask, updateTask } from '../store/slices/taskSlice';
import { Task } from '../types/task';
import { formatDistanceToNow, format } from 'date-fns';

const TaskBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    // Initialize with some sample tasks if none exist
    if (tasks.length === 0) {
      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Complete Project Setup',
          description: 'Set up the project structure and dependencies',
          status: 'todo',
          assignedTo: [],
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          createdBy: 'system',
          projectId: 'default',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Implement Authentication',
          description: 'Add user authentication functionality',
          status: 'inProgress',
          assignedTo: [],
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          createdBy: 'system',
          projectId: 'default',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Design UI Components',
          description: 'Create reusable UI components',
          status: 'done',
          assignedTo: [],
          dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          createdBy: 'system',
          projectId: 'default',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      dispatch(setTasks(sampleTasks));
    }
  }, [dispatch, tasks.length]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, task: Task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      dispatch(deleteTask(selectedTask.id));
      handleMenuClose();
    }
  };

  const handleMarkAsComplete = () => {
    if (selectedTask) {
      dispatch(updateTask({
        ...selectedTask,
        status: 'done',
        updatedAt: new Date().toISOString(),
      }));
      handleMenuClose();
    }
  };

  const handleRestoreTask = () => {
    if (selectedTask) {
      dispatch(updateTask({
        ...selectedTask,
        status: 'todo',
        updatedAt: new Date().toISOString(),
      }));
      handleMenuClose();
    }
  };

  const handleCreateTask = () => {
    if (newTask.title && newTask.description) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        status: 'todo',
        assignedTo: [],
        dueDate: newTask.dueDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        createdBy: 'user',
        projectId: 'default',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      dispatch(addTask(task));
      setNewTask({ title: '', description: '', dueDate: '' });
      handleClose();
    }
  };

  const columns = {
    todo: tasks.filter((task) => task.status === 'todo'),
    inProgress: tasks.filter((task) => task.status === 'inProgress'),
    done: tasks.filter((task) => task.status === 'done'),
  };

  const completedTasks = tasks.filter(task => task.status === 'done')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(
      moveTask({
        taskId: draggableId,
        sourceStatus: source.droppableId,
        destinationStatus: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  const getDueDateText = (dueDate: string) => {
    const date = new Date(dueDate);
    const now = new Date();
    if (date < now) {
      return 'Overdue';
    }
    return `Due ${formatDistanceToNow(date, { addSuffix: true })}`;
  };

  const renderTaskCard = (task: Task, showActions: boolean = true) => (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography 
              variant="caption" 
              color={new Date(task.dueDate) < new Date() ? 'error' : 'text.secondary'}
            >
              {getDueDateText(task.dueDate)}
            </Typography>
            <Chip 
              label={format(new Date(task.updatedAt), 'MMM d, yyyy')}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>
        {showActions && (
          <IconButton
            size="small"
            onClick={(e) => handleMenuOpen(e, task)}
            sx={{ ml: 1 }}
          >
            <MoreVertIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Active Tasks" />
          <Tab label="History" />
        </Tabs>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add New Task
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateTask} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {selectedTask?.status !== 'done' ? (
          <MenuItem onClick={handleMarkAsComplete}>
            <ListItemIcon>
              <CheckCircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mark as Complete</ListItemText>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleRestoreTask}>
            <ListItemIcon>
              <RestoreIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Restore Task</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={handleDeleteTask}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Task</ListItemText>
        </MenuItem>
      </Menu>

      {tabValue === 0 ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
            }}
          >
            {Object.entries(columns).map(([columnId, columnTasks]) => (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided) => (
                  <Paper
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ p: 2, minHeight: '500px' }}
                  >
                    <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
                      {columnId.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <List>
                      {columnTasks.map((task: Task, index: number) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <ListItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                mb: 1,
                                p: 2,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                boxShadow: 1,
                              }}
                            >
                              {renderTaskCard(task)}
                            </ListItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </List>
                  </Paper>
                )}
              </Droppable>
            ))}
          </Box>
        </DragDropContext>
      ) : (
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Completed Tasks
          </Typography>
          <List>
            {completedTasks.map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  mb: 1,
                  p: 2,
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  boxShadow: 1,
                }}
              >
                {renderTaskCard(task, false)}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default TaskBoard; 