import React, { useState } from 'react';
import { Button, TextField, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Logo from '../logo.png';


const Root = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#5BA397',
  fontFamily: 'Arial, sans-serif',  // Cambia la fuente
});

const Form = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.85)',  // Fondo semitransparente
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',  // Sombra más pronunciada
  backdropFilter: 'blur(10px)',  // Efecto de desenfoque
});

const TextFieldStyled = styled(TextField)({
  marginBottom: '1rem',
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '4px',
});

const ButtonStyled = styled(Button)({
  width: '100%',
  marginTop: '1rem',
  backgroundColor: '#5BA397',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4A8678',
  },
});

const AdminLink = styled('a')({
  marginTop: '1rem',
  color: '#808080',
  textDecoration: 'none',
  fontSize: '0.875rem',
  '&:hover': {
    color: '#404040',  // Color más oscuro en hover
  },
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();  // Hook de navegación

  const handleLogin = () => {
    if (username === 'matias' && password === '123') {
      navigate('/dashboard');  // Redirigir al Dashboard
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setError(false);
  };

  return (
    <Root>
      <Form>
        <img src={Logo} alt="Logo" style={{ marginBottom: '1rem' }} /> {/* Reemplaza "logo.png" con la ruta de tu logo */}
        <TextFieldStyled
          label="Usuario"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextFieldStyled
          label="Contraseña"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonStyled
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </ButtonStyled>
        <AdminLink href="#">Contactar a un administrador</AdminLink>
      </Form>
      <Dialog open={error} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Contraseña incorrecta.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Root>
  );
};

export default Login;
