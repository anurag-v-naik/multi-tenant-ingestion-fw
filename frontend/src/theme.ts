import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // A sophisticated green
    },
    secondary: {
      main: '#ef6c00', // A warm orange
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    h1: { fontSize: '2rem' },
  },
});

export default theme;
