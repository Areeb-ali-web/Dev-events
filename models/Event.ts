import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  image: string;
  description: string;
  agenda: string[];
  capacity: number;
  bookedSeats: number;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  agenda: { type: [String], default: [] },
  capacity: { type: Number, default: 100 },
  bookedSeats: { type: Number, default: 0 },
}, {
  timestamps: true
});

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
