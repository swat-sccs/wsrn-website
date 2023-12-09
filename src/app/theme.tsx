import { createTheme } from '@mui/material/styles';
import { Urbanist } from 'next/font/google';

const font = Urbanist({ subsets: ['latin'], weight: ['400'] });

declare module '@mui/material/styles' {
  interface PaletteColor {
    success?: string;
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    success: {
      main: '#C2EC7E',
    },
    primary: {
      main: '#F05454',
    },
    secondary: {
      main: '#f46523',
    },
    warning: {
      main: '#F05454',
    },
    error: {
      main: '#86001a',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    allVariants: font.style,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#121212',
          backgroundImage: `linear-gradient(180deg, #121212 30%,  #30475E 100%)`,
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});

export default theme;

//https://colorhunt.co/palette/f5f5f5f0545430475e121212
