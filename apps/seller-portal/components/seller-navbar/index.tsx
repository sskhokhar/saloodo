import { NavBar } from '@saloodo/shared-components';
import { useRouter } from 'next/router';
import React from 'react';
import { selectAuthState, signout } from '../../store/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Parcels', href: '/parcels' },
];
function SellerNavbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuthState);
  const handleSignout = () => {
    dispatch(signout());
    router.push('/login');
  };
  return (
    <NavBar
      navTitle="Seller Portal"
      navItems={navigation}
      onSignout={handleSignout}
      userName={authState?.user?.name}
    />
  );
}

export default SellerNavbar;
