import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WSRN Radio',
    short_name: 'WSRN',
    description: 'Worldwide Swarthmore Radio Network',
    start_url: '/',
    display: 'standalone',
    background_color: 'rgb(18,	18,	18	)',
    theme_color: 'rgb(18,	18,	18	)',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
