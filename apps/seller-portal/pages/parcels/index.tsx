import React, { useEffect, useState } from 'react';

import WithAuthentication from '../../components/hocs/authentication';
import SellerNavbar from '../../components/seller-navbar';
import ParcelsView from '../../views/parcels/parcels.view';

function Parcels() {
  return (
    <WithAuthentication>
      <SellerNavbar />
      <ParcelsView />
    </WithAuthentication>
  );
}

export default Parcels;
