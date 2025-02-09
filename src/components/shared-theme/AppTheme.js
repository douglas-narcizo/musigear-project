import { createTheme, GlobalStyles } from "@mui/material";

export const AppTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#a6355e',
    },
    secondary: {
      main: '#27886b',
    },
    background: {
      paper: '#f9f6f7',
    },
  },
/*  typography: {
    fontFamily: 'Lato',
  }, */
  shape: {
    borderRadius: 8,
  },
});

export const globalMuiStyleOverride = (
  <GlobalStyles
    styles={{
      '@media (max-width:599px)': {
        html: {
          fontSize: '12px',
        },
      },
    }}
  />
);

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