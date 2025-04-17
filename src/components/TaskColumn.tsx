import React from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  overflow: 'auto',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  minWidth: '300px',
  position: 'relative',
  zIndex: 1,
}));

interface TaskColumnProps {
  title: string;
  children: React.ReactNode;
  elevation?: number;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, children, elevation = 3 }) => {
  return (
    <StyledPaper elevation={elevation}>
      <Typography variant="h6" sx={{ 
        color: '#ffffff',
        marginBottom: 2,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}>
        {title}
      </Typography>
      {children}
    </StyledPaper>
  );
};

export default TaskColumn; 