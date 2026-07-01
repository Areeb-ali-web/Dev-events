import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Event, { IEvent } from '@/models/Event';
import BookingForm from './BookingForm';
import Locationicon from '@/public/icons/pin.svg';
import Calendericon from '@/public/icons/calendar.svg';
import Timeicon from '@/public/icons/clock.svg';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  
  await dbConnect();
  const event = (await Event.findOne({ slug })) as IEvent;
  
  if (!event) {
    notFound();
  }

  return (
    <div id="event">
      {/* Back button */}
      <div className="mb-6">
        <Link href="/" className="text-primary hover:underline text-sm flex items-center gap-2">
          ← Back to Events
        </Link>
      </div>

      <div className="header">
        <span className="pill w-fit uppercase font-semibold tracking-wider">
          {event.location.split(',')[1]?.trim() || 'Pakistan'}
        </span>
        <h1>{event.title}</h1>
        
        <div className="flex flex-row flex-wrap items-center gap-6 mt-4 text-light-200">
          <div className="flex items-center gap-2">
            <Image src={Locationicon} alt="Location" width={16} height={16} />
            <p className="m-0 text-sm font-light">{event.location}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image src={Calendericon} alt="Date" width={16} height={16} />
            <p className="m-0 text-sm font-light">{event.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <Image src={Timeicon} alt="Time" width={16} height={16} />
            <p className="m-0 text-sm font-light">{event.time}</p>
          </div>
        </div>
      </div>

      <div className="details">
        <div className="content">
          <Image
            src={event.image}
            alt={event.title}
            width={800}
            height={450}
            className="banner"
            priority
          />
          
          <div className="flex-col-gap-2 mt-6">
            <h2>About this Event</h2>
            <p>{event.description}</p>
          </div>

          {event.agenda && event.agenda.length > 0 && (
            <div className="agenda mt-8">
              <h2 className="mb-4">Event Agenda</h2>
              <ul className="list-none space-y-3">
                {event.agenda.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="text-primary font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="booking">
          <BookingForm 
            slug={event.slug} 
            initialBookedSeats={event.bookedSeats} 
            capacity={event.capacity} 
          />
        </div>
      </div>
    </div>
  );
}
