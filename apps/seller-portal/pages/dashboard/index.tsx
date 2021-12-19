import { NavBar } from '@saloodo/shared-components';
import SellerNavbar from '../../components/seller-navbar';

import React from 'react';
import WithAuthentication from '../../components/hocs/authentication';

function Dashboard() {
  return (
    <WithAuthentication>
      <div>
        <SellerNavbar />
      </div>
    </WithAuthentication>
  );
}

export default Dashboard;
