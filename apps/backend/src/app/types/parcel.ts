import { Document } from 'mongoose';
import { User } from './user';
export interface Parcel extends Document {
  consigneeName: string;
  from: string;
  to: string;
  statuses: { name: string; date: Date }[];
  rider: User | string;
  createdBy: User | string;
  currentStatus: string;
}
