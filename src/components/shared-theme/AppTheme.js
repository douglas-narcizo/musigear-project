import { createTheme, GlobalStyles } from "@mui/material";

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

export const globalMuiStyleOverride = (
  <GlobalStyles
    styles={{
      '@media (max-width:600px)': {
        html: {
          fontSize: '12px',
        },
        '.MuiContainer-root': {
          paddingLeft: '0.5rem !important',
          paddingRight: '0.5rem !important',
        },
      },
    }}
  />
);

/* --- NOT WORKING ---
  typography: {
    htmlFontSize: 16,
    '@media (max-width:600px)': {
      htmlFontSize: 13,
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@media (max-width:600px)': {
            html: {
              fontSize: '14px',
            },
          },
        },
      },
    },
  },
*/

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