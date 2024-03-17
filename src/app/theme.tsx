import { createTheme } from '@mui/material/styles';
import { Noto_Serif } from 'next/font/google';
const font = Noto_Serif({ weight: ['300'], subsets: ['latin'] });
import bg from '../../public/img/radio.png';

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
          backgroundColor: '#30475E',
          //backgroundImage: `url(${bg.src})`,
          backgroundSize: 'contain',
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
