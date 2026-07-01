import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  bookedAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  bookedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
