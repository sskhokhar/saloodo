import React from 'react';
import BikerNavbar from '../../components/biker-navbar';
import WithAuthentication from '../../components/hocs/authentication';
import DashboardView from '../../views/dashboard/dashboard.view';

function Dashboard() {
  return (
    <WithAuthentication>
      <div>
        <BikerNavbar />
      </div>
      <DashboardView />
    </WithAuthentication>
  );
}

export default Dashboard;
