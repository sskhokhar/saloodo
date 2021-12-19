import { LoginForm, NavBar } from '@saloodo/shared-components';
import { useRouter } from 'next/router';

import React, { useEffect } from 'react';
import { login } from '../../store/auth/auth-thunks';
import { selectAuthState } from '../../store/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuthState);

  const handleLogin = (data) => {
    dispatch(login(data));
  };
  useEffect(() => {
    if (authState?.user) {
      router.push('/');
    }
  }, [authState?.user, router]);

  return (
    <div>
      <LoginForm title="Sign in to Biker Portal" onLogin={handleLogin} />
    </div>
  );
}

export default Login;
