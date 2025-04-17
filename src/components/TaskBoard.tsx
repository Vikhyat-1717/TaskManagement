import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Paper, Typography, List, ListItem, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { moveTask, setTasks } from '../store/slices/taskSlice';
import { Task } from '../types/task';

const TaskBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

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
          dueDate: '2024-04-20',
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
          dueDate: '2024-04-22',
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
          dueDate: '2024-04-18',
          createdBy: 'system',
          projectId: 'default',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      dispatch(setTasks(sampleTasks));
    }
  }, [dispatch, tasks.length]);

  const columns = {
    todo: tasks.filter((task) => task.status === 'todo'),
    inProgress: tasks.filter((task) => task.status === 'inProgress'),
    done: tasks.filter((task) => task.status === 'done'),
  };

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

  return (
    <Box sx={{ p: 3 }}>
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
                            <Box sx={{ width: '100%' }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {task.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {task.description}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Due: {new Date(task.dueDate).toLocaleDateString()}
                              </Typography>
                            </Box>
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
    </Box>
  );
};

export default TaskBoard; 