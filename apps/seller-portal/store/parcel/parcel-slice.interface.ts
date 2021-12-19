import { EntityState } from '@reduxjs/toolkit';
import { User } from '../auth/auth-slice.interface';

export interface ParcelEntity {
  _id: string;
  consigneeName: string;
  from: string;
  to: string;
  createdBy: string | User;
  statuses: { name: string; date: string }[];
  currentStatus: string;
}

export interface ParcelState extends EntityState<ParcelEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}
