import * as mongoose from 'mongoose';

export const ParcelSchema = new mongoose.Schema({
  consigneeName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  statuses: [
    {
      name: { type: String, enum: ['Created', 'Picked', 'Delivered'] },
      date: { type: Date, default: Date.now },
    },
  ],
  currentStatus: { type: String, enum: ['Created', 'Picked', 'Delivered'] },
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
