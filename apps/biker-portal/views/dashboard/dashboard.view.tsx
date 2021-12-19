import { ParcelCard } from '@saloodo/shared-components';
import React, { useEffect } from 'react';
import { selectAuthState } from '../../store/auth/auth.slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getParcels, markParcelStatus } from '../../store/parcel/parcel-thunks';
import { selectAllParcel } from '../../store/parcel/parcel.slice';
import UsersDropdown from './users-dropdown';

function DashboardView() {
  const dispatch = useAppDispatch();
  const parcels = useAppSelector(selectAllParcel);
  const authState = useAppSelector(selectAuthState);
  const handleStatusChange = (id: string, status: 'Picked' | 'Delivered') => {
    dispatch(
      markParcelStatus({ parcelId: id, status, rider: authState?.user?._id })
    );
  };
  useEffect(() => {
    dispatch(
      getParcels({
        $or: [{ currentStatus: 'Created' }, { rider: authState?.user?._id }],
      })
    );
  }, []);
  return (
    <div>
      <div className="lg:w-1/2 md:w-1/2 w-full mx-auto px-2 lg:px-0">
        <div className="items-center border-b flex justify-between mt-12 py-2">
          <h1 className="font-extrabold text-3xl text-gray-700">
            Pending Parcels
          </h1>
          {/* <UsersDropdown /> */}
        </div>
        {parcels.map((parcel) => (
          <div key={parcel._id} className="mt-3">
            <div className="flex items-center">
              <ParcelCard
                consigneeName={parcel.consigneeName}
                showDelete={false}
                from={parcel.from}
                to={parcel.to}
                currentStatus={parcel.statuses[parcel.statuses.length - 1].name}
              />
              <div className="flex flex-col justify-between items-center">
                {parcel.currentStatus === 'Created' ? (
                  <button
                    onClick={() => handleStatusChange(parcel._id, 'Picked')}
                    className="bg-blue-600 text-white text-xs rounded-r outline-none focus:outline-none focus:bg-blue-700 hover:bg-blue-500"
                  >
                    Mark as Picked
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(parcel._id, 'Delivered')}
                    className="bg-blue-600 text-white text-xs rounded-r outline-none focus:outline-none focus:bg-blue-700 hover:bg-blue-500"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardView;
