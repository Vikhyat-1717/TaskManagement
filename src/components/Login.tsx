import React from 'react';
import {
  Container,
  Paper,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="xs">
      <div style={{
        marginTop: '64px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Paper
          elevation={3}
          style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" style={{ marginBottom: '24px' }}>
            Welcome to Task Manager
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            style={{ marginTop: '16px' }}
          >
            Go to Task Manager
          </Button>
        </Paper>
      </div>
    </Container>
  );
};

export default Login; 