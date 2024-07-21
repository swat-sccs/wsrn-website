import { redirect } from 'next/navigation';
import { config } from '@/app/lib/auth';
import { getServerSession } from 'next-auth/next';

export default async function SideBar({ children }: { children: React.ReactNode }) {
  //const { data: session, status } = useSession();
  //const handler = NextAuth(config);
  const session: any = await getServerSession(config);

  if (session) {
    return <section>{children}</section>;
  }
  redirect('/login');
}
