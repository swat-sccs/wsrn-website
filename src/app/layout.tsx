import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from './ThemeRegistry';
import Header from './components/header.js';
import Player from './components/player.js';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WSRN Homepage',
  description: 'Listen to WSRN right here on wsrnfm.com!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          <Header></Header>
          {children}
          <Player></Player>
        </ThemeRegistry>
      </body>
    </html>
  );
}
