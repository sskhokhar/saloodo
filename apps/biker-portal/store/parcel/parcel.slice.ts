import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ParcelEntity, ParcelState } from './parcel-slice.interface';

export const parcelAdapter = createEntityAdapter<ParcelEntity>({
  selectId: (entity) => entity._id,
});

export const initialParcelState: ParcelState = parcelAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const ParcelSlice = createSlice({
  name: '[parcel]',
  initialState: initialParcelState,
  reducers: {
    addMany: parcelAdapter.addMany,
    update: parcelAdapter.updateOne,
    removeAll: parcelAdapter.removeAll,
  },
});

export const parcelActions = ParcelSlice.actions;

const { selectAll, selectEntities } = parcelAdapter.getSelectors();

export const getParcelState = (rootState: RootState): ParcelState =>
  rootState.parcel;

export const selectAllParcel = createSelector(getParcelState, selectAll);

export const selectParcelEntities = createSelector(
  getParcelState,
  selectEntities
);
export default ParcelSlice.reducer;
