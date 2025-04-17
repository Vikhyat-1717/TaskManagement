import React from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import { Task } from '../types/task';
import { format } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" component="div">
            {task.title}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(task)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(task.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {task.description}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={task.status}
            color={
              task.status === 'done'
                ? 'success'
                : task.status === 'inProgress'
                ? 'primary'
                : 'default'
            }
            size="small"
          />
          <Chip
            label={`Due: ${format(new Date(task.dueDate), 'MMM dd, yyyy')}`}
            variant="outlined"
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard; 