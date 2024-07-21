import { createTheme } from '@mui/material/styles';
import { Noto_Serif } from 'next/font/google';
import { Roboto_Serif } from 'next/font/google';
//const font = Noto_Serif({ weight: ['300'], subsets: ['latin'] });
const font = Roboto_Serif({ weight: ['300'], subsets: ['latin'] });

import bg from '../../public/img/radio.png';

declare module '@mui/material/styles' {
  interface PaletteColor {
    success?: string;
  }
}

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
  interface Palette {
    darkblue: Palette['primary'];
    customText: Palette['primary'];
  }
  interface PaletteOptions {
    darkblue?: PaletteOptions['primary'];
    customText?: PaletteOptions['primary'];
  }
}
// Update the Button's color options to include an ochre option
/*
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}
  */

const theme = createTheme({
  palette: {
    mode: 'dark',
    success: {
      main: '#31572C',
    },
    primary: {
      main: '#9EB7CC',
    },
    darkblue: {
      main: '#31485E',
    },
    customText: {
      main: '#E5ECF3',
    },
    secondary: {
      main: '#2F5575',
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
          backgroundColor: '#31485E',
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
