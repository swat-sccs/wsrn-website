'use client';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CookieIcon from '@mui/icons-material/Cookie';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const pages = [
  { name: 'POS', link: '/point_of_sale' },
  { name: 'Menu', link: '/admin/menu' },
  { name: 'Analytics', link: '/admin/analytics' },
  { name: 'Calendar', link: '/admin/calendar' },
  { name: 'Orders', link: '/kitchen_display' },
];
const settings: any = [];

function ResponsiveAppBar(props: any) {
  const [windowSize, setWindowSize]: any[] = React.useState([]);

  const { data: session, status } = useSession();

  let authenticated: any;
  let loginLink;
  let nameButton;
  let managerStatus;

  if (props.hasOwnProperty('login')) {
    loginLink = null;
    nameButton = null;
    managerStatus = null;
  } else {
    if (status === 'authenticated') {
      authenticated = true;
      loginLink = (
        <Button
          variant="outlined"
          style={{ backgroundColor: 'transparent' }}
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <Typography textAlign="center">Log out</Typography>
        </Button>
      );
      nameButton = session.user?.name;
      managerStatus = session.user?.role;
    } else {
      authenticated = false;
      loginLink = <div></div>;
      nameButton = 'Log In';
    }
  }

  const pathname = usePathname();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);

  return (
    <>
      <Button variant="contained" onClick={() => signIn('keycloak', { callbackUrl: '/manage' })}>
        <Typography variant="body1" color="black">
          {nameButton}
        </Typography>
      </Button>
      {loginLink}
    </>
  );
}
export default ResponsiveAppBar;
