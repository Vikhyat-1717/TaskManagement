export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  assignedTo: string[];
  dueDate: string;
  createdBy: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
} 