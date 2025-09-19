
'use client'

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === 'unauthenticated') {
        redirect('/auth/sign-in');
      }
    }, [status]);

    if (status === 'loading') {
      return <div>Loading...</div>; // Or a spinner component
    }

    if (status === 'authenticated') {
      return <Component {...props} />;
    }

    return null;
  };
}
