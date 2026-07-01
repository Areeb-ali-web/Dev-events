import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Event from '@/models/Event';
import Booking from '@/models/Booking';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Find the event
    const event = await Event.findOne({ slug });
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Check capacity
    if (event.bookedSeats >= event.capacity) {
      return NextResponse.json({ error: 'Event is fully booked' }, { status: 400 });
    }

    // Check if already booked
    const alreadyBooked = await Booking.findOne({ eventId: event._id, email });
    if (alreadyBooked) {
      return NextResponse.json({ error: 'You have already registered for this event' }, { status: 400 });
    }

    // Create booking
    const booking = await Booking.create({
      eventId: event._id,
      name,
      email,
    });

    // Update bookedSeats in Event
    event.bookedSeats += 1;
    await event.save();

    return NextResponse.json({
      message: 'Booking successful!',
      booking,
      event: {
        bookedSeats: event.bookedSeats,
        capacity: event.capacity,
      }
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
