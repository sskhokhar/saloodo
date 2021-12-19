import { NavBar } from '@saloodo/shared-components';
import { useRouter } from 'next/router';
import React from 'react';
import { selectAuthState, signout } from '../../store/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const navigation = [];
function BikerNavbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuthState);
  const handleSignout = () => {
    dispatch(signout());
    router.push('/login');
  };
  return (
    <NavBar
      navTitle="Biker Portal"
      navItems={navigation}
      onSignout={handleSignout}
      userName={authState?.user?.name}
    />
  );
}

export default BikerNavbar;
