import { createTheme } from "@mui/material";

export const AppTheme = createTheme({
  palette: {
    primary: {
      main: '#37a58a',
    },
    secondary: {
      main: '#e4740c',
    },
    background: {
      default: '#fff',
      paper: '#f0f4f3',
    },
    divider: '#000',
  },
  shape: {
    borderRadius: '8px',
  },
});