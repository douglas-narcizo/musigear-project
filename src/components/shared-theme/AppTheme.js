import { createTheme } from "@mui/material";

export const AppTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#a53749',
    },
    secondary: {
      main: '#27886b',
    },
    background: {
      paper: '#f9f6f7',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

/* --- GREEN THEME ---
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
    borderRadius: 8,
  },
});
*/