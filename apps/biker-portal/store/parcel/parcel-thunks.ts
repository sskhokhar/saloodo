import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { parcelActions } from './parcel.slice';

export const getParcels = createAsyncThunk(
  '[parcel]/getParcels',
  async (query: { [key: string]: any } = {}, { dispatch }) => {
    const response = await axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/parcels?where=${JSON.stringify(
          query
        )}`
      )
      .then((res) => res.data);
    dispatch(parcelActions.removeAll());
    dispatch(parcelActions.addMany(response));
  }
);

export const markParcelStatus = createAsyncThunk(
  '[parcel]/markParcelStatus',
  async (
    data: {
      parcelId: string;
      status: 'Picked' | 'Delivered';
      rider: string;
    },
    { dispatch }
  ) => {
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/parcels/${data.parcelId}/mark-status`,
        {
          status: data.status,
          rider: data.rider,
        }
      )
      .then((res) => res.data);
    dispatch(
      parcelActions.update({
        id: data.parcelId,
        changes: response,
      })
    );
  }
);
