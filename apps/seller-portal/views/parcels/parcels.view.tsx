import React, { useEffect, useState } from 'react';

import { PlusIcon } from '@heroicons/react/solid';
import { ParcelCard } from '@saloodo/shared-components';
import AddParcel from '../../components/add-parcel';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAuthState } from '../../store/auth/auth.slice';
import {
  createParcel,
  deleteParcel,
  getParcels,
} from '../../store/parcel/parcel-thunks';
import { selectAllParcel } from '../../store/parcel/parcel.slice';

function ParcelsView() {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuthState);
  const parcels = useAppSelector(selectAllParcel);
  const handleParcelCreate = (data: {
    consigneeName: string;
    from: string;
    to: string;
  }) => {
    dispatch(createParcel({ ...data, createdBy: authState.user._id }));
    setModalOpen(false);
  };
  const handleParcelDelete = (id: string) => {
    dispatch(deleteParcel(id));
  };
  useEffect(() => {
    dispatch(getParcels({ createdBy: authState?.user?._id }));
  }, []);

  return (
    <div>
      <AddParcel
        open={modalOpen}
        setOpen={setModalOpen}
        onParcelCreate={handleParcelCreate}
      />
      <div className="lg:w-1/2 md:w-1/2 w-full mx-auto">
        <div className="align-middle border-b flex justify-between mt-12 py-2">
          <h1 className="font-extrabold text-3xl text-gray-700">Parcels</h1>
          <button
            className="bg-indigo-600 p-4 rounded-full shadow outline-none focus:outline-none hover:bg-indigo-500 focus:bg-indigo-700"
            onClick={() => setModalOpen(true)}
          >
            <PlusIcon className="h-5 w-5 text-white group-hover:text-teal-400" />
          </button>
        </div>
        {[...parcels].reverse().map((parcel) => (
          <div key={parcel._id} className="mt-3">
            <ParcelCard
              consigneeName={parcel.consigneeName}
              showDelete={parcel.createdBy === authState?.user?._id}
              showStatusTable
              from={parcel.from}
              to={parcel.to}
              currentStatus={parcel.currentStatus}
              statuses={parcel.statuses}
              onDelete={() => handleParcelDelete(parcel._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParcelsView;
