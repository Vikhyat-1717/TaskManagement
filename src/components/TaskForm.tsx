import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
} from '@mui/material';
import { Task } from '../types/task';
import { format } from 'date-fns';

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Partial<Task>;
}

const TaskForm: React.FC<TaskFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo',
    assignedTo: [],
    dueDate: format(new Date(), 'yyyy-MM-dd'),
    projectId: 'default',
    createdBy: 'system',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    field: keyof Task,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev: Partial<Task>) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initialData ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            required
            value={formData.title}
            onChange={(e) => handleChange('title', e)}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange('description', e)}
          />
          <TextField
            margin="dense"
            label="Due Date"
            type="date"
            fullWidth
            required
            value={formData.dueDate}
            onChange={(e) => handleChange('dueDate', e)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Status"
            select
            fullWidth
            required
            value={formData.status}
            onChange={(e) => handleChange('status', e)}
            SelectProps={{
              native: true,
            }}
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </TextField>
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={formData.assignedTo || []}
            onChange={(_, newValue) => {
              setFormData((prev: Partial<Task>) => ({
                ...prev,
                assignedTo: newValue,
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                label="Assigned To"
                fullWidth
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initialData ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm; 