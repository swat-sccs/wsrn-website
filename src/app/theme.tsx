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
      main: '#31572C',
    },
    primary: {
      main: '#7798AB',
    },
    secondary: {
      main: '#649664',
    },
    warning: {
      main: '#EE964B',
    },
    error: {
      main: '#E13F47',
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

//https://coolors.co/31572c-30475e-7798ab-649664-ee964b

//Green:#31572C
//Blue: #30475E
//LightBlue: #7798AB
//LightGreen: #C3DBC5
//Orange:
