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

export const createParcel = createAsyncThunk(
  '[parcel]/createParcel',
  async (
    data: {
      consigneeName: string;
      from: string;
      to: string;
      createdBy: string;
    },
    { dispatch }
  ) => {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/parcels`, data)
      .then((res) => res.data);
    dispatch(parcelActions.add(response));
  }
);

export const deleteParcel = createAsyncThunk(
  '[parcel]/deleteParcel',
  async (id: string, { dispatch }) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/parcels/${id}`)
      .then((res) => res.data);
    dispatch(parcelActions.remove(id));
  }
);
