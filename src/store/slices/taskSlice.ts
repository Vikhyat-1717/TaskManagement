import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types/task';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

interface MoveTaskPayload {
  taskId: string;
  sourceStatus: string;
  destinationStatus: string;
  sourceIndex: number;
  destinationIndex: number;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    moveTask: (state, action: PayloadAction<MoveTaskPayload>) => {
      const { taskId, destinationStatus } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          status: destinationStatus as Task['status'],
        };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  setLoading,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer; 