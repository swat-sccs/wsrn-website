import type { Metadata } from 'next';
import ThemeRegistry from './ThemeRegistry';
import Header from './components/header.js';
import Player from './components/player-new.js';
import { Container } from '@mui/material';

export const metadata: Metadata = {
  title: 'WSRN | 91.5FM',
  description: 'Listen to WSRN right here on wsrnfm.com!',
  icons: {
    icon: '/icon.png', // /public path
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <link rel="icon" href="favicon.ico" sizes="any" />
      <head />
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          {children}

          <Player></Player>
        </ThemeRegistry>
      </body>
    </html>
  );
}
