import React from 'react';
import {
  Container,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Welcome to Task Manager
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{ mt: 2 }}
          >
            Go to Task Manager
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 