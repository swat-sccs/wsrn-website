import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: number;
    role: string;
  }

  interface Session {
    user: User;
  }
}
