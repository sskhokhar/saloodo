import { useRouter } from 'next/router';
import React from 'react';
import { selectAuthState } from '../../../store/auth/auth.slice';
import { useAppSelector } from '../../../store/hooks';

interface Props {
  children: any;
  redirect?: string;
}

function WithAuthentication({ children, redirect = '/login' }: Props) {
  const authState = useAppSelector(selectAuthState);
  const router = useRouter();
  if (authState.user) {
    return children;
  }
  if (redirect) {
    router.push(redirect);
  }
  return null;
}

export default WithAuthentication;
